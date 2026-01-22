/* eslint-disable no-unused-vars */
import axios, { AxiosResponse } from 'axios';
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useEffect,
  useState
} from 'react';

import * as authHelper from '../_helpers';
import { type AuthModel, type UserModel } from '@/auth';
import * as authService from '@/services/auth/auth.service';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5138';
export const LOGIN_URL = `${API_URL}/api/auth/login`;
export const REGISTER_URL = `${API_URL}/api/auth/register`;
export const FORGOT_PASSWORD_URL = `${API_URL}/api/auth/forgot-password`;
export const RESET_PASSWORD_URL = `${API_URL}/api/auth/reset-password`;
export const GET_USER_URL = `${API_URL}/api/auth/user`;

interface AuthContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle?: () => Promise<void>;
  loginWithFacebook?: () => Promise<void>;
  loginWithGithub?: () => Promise<void>;
  register: (email: string, password: string, password_confirmation: string) => Promise<void>;
  requestPasswordResetLink: (email: string) => Promise<void>;
  changePassword: (
    email: string,
    token: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  getUser: () => Promise<AxiosResponse<any>>;
  logout: () => void;
  verify: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();

  useEffect(() => {
    const initAuth = async () => {
      if (auth) {
        await verify();
      }
      setLoading(false);
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verify = async () => {
    if (auth) {
      try {
        // const { data: user } = await getUser();
        // setCurrentUser(user);
        // Por ahora dejamos el usuario como está, está en el contexto
      } catch {
        saveAuth(undefined);
        setCurrentUser(undefined);
      }
    }
  };

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await authService.login(email, password);

      const tokenPayload = authService.decodeJWT(loginResponse.accessToken);

      const auth: AuthModel = {
        access_token: loginResponse.accessToken,
        api_token: loginResponse.accessToken, // Usamos el mismo token
        refreshToken: loginResponse.refreshToken,
        nombreUsuario: loginResponse.nombreUsuario,
        rol: loginResponse.rol,
        usuarioId: tokenPayload?.sub || '',
        cambioClaveSolicitado: loginResponse.cambioClaveSolicitado
      };

      const user: UserModel = {
        id: tokenPayload?.sub || '',
        username: loginResponse.nombreUsuario,
        email: tokenPayload?.email || email,
        first_name: loginResponse.nombreUsuario.split(' ')[0],
        last_name: loginResponse.nombreUsuario.split(' ').slice(1).join(' '),
        password: '',
        roles: [loginResponse.rol],
        nombreUsuario: loginResponse.nombreUsuario,
        rol: loginResponse.rol,
        usuarioId: tokenPayload?.sub || '',
        cambioClaveSolicitado: loginResponse.cambioClaveSolicitado
      };

      saveAuth(auth);
      setCurrentUser(user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.accessToken}`;
    } catch (error: any) {
      saveAuth(undefined);
      setCurrentUser(undefined);
      throw error;
    }
  };

  const register = async (email: string, password: string, password_confirmation: string) => {
    try {
      const { data: auth } = await axios.post(REGISTER_URL, {
        email,
        password,
        password_confirmation
      });
      saveAuth(auth);
      const { data: user } = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw new Error(`Error ${error}`);
    }
  };

  const requestPasswordResetLink = async (email: string) => {
    await axios.post(FORGOT_PASSWORD_URL, {
      email
    });
  };

  const changePassword = async (
    email: string,
    token: string,
    password: string,
    password_confirmation: string
  ) => {
    await axios.post(RESET_PASSWORD_URL, {
      email,
      token,
      password,
      password_confirmation
    });
  };

  const getUser = async () => {
    return await axios.get<UserModel>(GET_USER_URL);
  };

  const logout = async () => {
    const currentAuth = auth;

    // Limpiar inmediatamente el estado local y los headers
    saveAuth(undefined);
    setCurrentUser(undefined);
    delete axios.defaults.headers.common['Authorization'];

    try {
      if (currentAuth?.access_token) {
        // Llamar al endpoint de logout con el token que teníamos
        await authService.logout(currentAuth.access_token, currentAuth.refreshToken);
      }
    } catch (error) {
      // Error silencioso durante logout, ya limpiamos el estado
      console.error('Error al hacer logout en el servidor:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        auth,
        saveAuth,
        currentUser,
        setCurrentUser,
        login,
        register,
        requestPasswordResetLink,
        changePassword,
        getUser,
        logout,
        verify
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

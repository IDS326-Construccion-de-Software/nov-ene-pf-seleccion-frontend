import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface LoginRequest {
  correoInstitucional: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  nombreUsuario: string;
  rol: string;
  cambioClaveSolicitado: boolean;
}

export interface AuthTokenPayload {
  sub: string; // usuarioId
  email: string;
  role: string;
  jti: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

export interface UserMeResponse {
  usuarioId: string;
  correoInstitucional: string;
  nombreUsuario: string;
  rol: string;
  idUsuario: number;
  nombre: string;
  apellido: string;
  nombreProgramaAcademico: string;
  trimestreActual?: number;
  [key: string]: any;
}

export const decodeJWT = (token: string): AuthTokenPayload | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const decoded = JSON.parse(atob(parts[1]));
    return decoded as AuthTokenPayload;
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
};

/**
 * Login del usuario con correo institucional y contraseña
 */
export const login = async (
  correoInstitucional: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post<LoginResponse>(
      `${API_URL}/auth/login`,
      {
        correoInstitucional,
        password
      },
      {
        headers: {
          // Asegurar que no se envíe el header de Authorization
          Authorization: undefined
        }
      }
    );
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Error al iniciar sesión';
    throw new Error(message);
  }
};

/**
 * Refresca el token usando el refreshToken
 */
export const refreshToken = async (refreshToken: string): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post<LoginResponse>(`${API_URL}/auth/refresh`, {
      refreshToken
    });
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Error al refrescar token';
    throw new Error(message);
  }
};

/**
 * Logout del usuario
 */
export const logout = async (token: string, refreshToken?: string): Promise<void> => {
  try {
    await axios.post(
      `${API_URL}/auth/logout`,
      {
        token,
        refreshToken
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (error: any) {
    console.error('Error al hacer logout:', error);
  }
};

/**
 * Obtiene la información del usuario logueado
 */
export const getMe = async (token: string): Promise<UserMeResponse> => {
  try {
    const { data } = await axios.get<UserMeResponse>(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Error al obtener información del usuario';
    throw new Error(message);
  }
};

export default {
  login,
  refreshToken,
  logout,
  getMe,
  decodeJWT
};

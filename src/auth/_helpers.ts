import { User as Auth0UserModel } from '@auth0/auth0-spa-js';

import { getData, setData } from '@/utils';
import { type AuthModel } from './_models';

const AUTH_LOCAL_STORAGE_KEY = `${import.meta.env.VITE_APP_NAME}-auth-v${
  import.meta.env.VITE_APP_VERSION
}`;

const getAuth = (): AuthModel | undefined => {
  try {
    const auth = getData(AUTH_LOCAL_STORAGE_KEY) as AuthModel | undefined;

    if (auth) {
      return auth;
    } else {
      return undefined;
    }
  } catch (error) {
    // Error al parsear auth
  }
};

const setAuth = (auth: AuthModel | Auth0UserModel) => {
  setData(AUTH_LOCAL_STORAGE_KEY, auth);
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    // Error al remover auth
  }
};

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json';

  // Interceptor de request para agregar el token
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string }; url?: string }) => {
      const auth = getAuth();

      // No agregar Authorization en login, register, refresh, etc.
      const isAuthEndpoint =
        config.url?.includes('/auth/login') ||
        config.url?.includes('/auth/register') ||
        config.url?.includes('/auth/refresh');

      if (auth?.access_token && !isAuthEndpoint) {
        config.headers.Authorization = `Bearer ${auth.access_token}`;
      }

      return config;
    },
    async (err: any) => await Promise.reject(err)
  );

  // Interceptor de response para manejar 401 y refrescar token
  axios.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const auth = getAuth();

          if (auth?.refreshToken) {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
              refreshToken: auth.refreshToken
            });

            const newAuth: AuthModel = {
              ...auth,
              access_token: data.accessToken,
              refreshToken: data.refreshToken
            };

            setAuth(newAuth);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

            processQueue(null, data.accessToken);
            isRefreshing = false;

            return axios(originalRequest);
          }
        } catch (err) {
          processQueue(err, null);
          isRefreshing = false;
          removeAuth();
          window.location.href = '/auth/login';
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
}

export { AUTH_LOCAL_STORAGE_KEY, getAuth, removeAuth, setAuth };

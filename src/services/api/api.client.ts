import axios, { AxiosRequestConfig } from 'axios';
import * as authHelper from '@/auth/_helpers';
const API_URL = import.meta.env.VITE_API_URL;
/**
 * Crea un config de axios con el token de autorización
 */
const getAuthConfig = (): AxiosRequestConfig => {
  const auth = authHelper.getAuth();

  return {
    headers: {
      Authorization: auth?.access_token ? `Bearer ${auth.access_token}` : ''
    }
  };
};

/**
 * GET con autorización
 * @example
 * const { data } = await apiGet('/Selection/oferta/1077546');
 */
export const apiGet = async <T = any>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axios.get<T>(`${API_URL}${endpoint}`, {
    ...getAuthConfig(),
    ...config
  });
  return response.data;
};

/**
 * POST con autorización
 * @example
 * const { data } = await apiPost('/Selection/guardar', payload);
 */
export const apiPost = async <T = any>(
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axios.post<T>(`${API_URL}${endpoint}`, data, {
    ...getAuthConfig(),
    ...config
  });
  return response.data;
};

/**
 * PUT con autorización
 * @example
 * const { data } = await apiPut('/Selection/actualizar/1077546', payload);
 */
export const apiPut = async <T = any>(
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axios.put<T>(`${API_URL}${endpoint}`, data, {
    ...getAuthConfig(),
    ...config
  });
  return response.data;
};

/**
 * DELETE con autorización
 * @example
 * const { data } = await apiDelete('/Selection/eliminar/1077546/123');
 */
export const apiDelete = async <T = any>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axios.delete<T>(`${API_URL}${endpoint}`, {
    ...getAuthConfig(),
    ...config
  });
  return response.data;
};

export default {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  getAuthConfig
};

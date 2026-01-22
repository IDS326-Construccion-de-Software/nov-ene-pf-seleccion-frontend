import { useQuery } from 'react-query';
import { getMe } from '@/services/auth/auth.service';
import { useAuthContext } from '@/auth';

export interface UserDataResponse {
  idUsuario: number;
  nombre: string;
  apellido: string;
  nombreProgramaAcademico: string;
  correoInstitucional?: string;
  correoPersonal?: string;
  trimestreActual?: number;
  [key: string]: any;
}

/**
 * Hook para obtener los datos del usuario autenticado desde el endpoint /auth/me
 */
export const useUserData = () => {
  const { auth } = useAuthContext();
  const token = auth?.access_token;

  return useQuery<UserDataResponse>(
    ['user-data'],
    async () => {
      const data = await getMe(token!);
      return data as UserDataResponse;
    },
    {
      enabled: !!token,
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 10, // 10 minutos
      retry: 1
    }
  );
};

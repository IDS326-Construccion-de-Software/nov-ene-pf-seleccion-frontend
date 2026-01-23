import { useQuery } from 'react-query';
import { getActivePeriodo, PeriodoConfigResponse } from '@/services/periodoconfig/peridoconfig.service';

/**
 * Hook para obtener el periodo académico activo
 */
export const usePeriodoActivo = () => {
  return useQuery<PeriodoConfigResponse>(
    ['periodo-activo'],
    () => getActivePeriodo(),
    {
      staleTime: 1000 * 60 * 30, // 30 minutos
      cacheTime: 1000 * 60 * 60, // 1 hora
      retry: 1
    }
  );
};

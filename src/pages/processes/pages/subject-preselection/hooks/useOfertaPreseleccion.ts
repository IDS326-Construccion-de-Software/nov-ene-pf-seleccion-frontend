import { useQuery } from 'react-query';
import {
  getOfertaPreseleccion,
  getResumenPreseleccion
} from '@/services/preselection/preselection.service';
import { getCanModify } from '@/services/periodoconfig/peridoconfig.service';

interface FilterParams {
  searchTerm?: string;
  tipoAsignatura?: number;
  soloDisponibles?: boolean;
  modalidad?: number;
  periodo?: number;
  page?: number;
  itemsPerPage?: number;
}

export const useOfertaPreseleccion = (usuarioId: string, filters?: FilterParams) => {
  return useQuery(
    ['oferta-preseleccion', usuarioId, filters],
    () => getOfertaPreseleccion(usuarioId, filters),
    {
      enabled: !!usuarioId,
      staleTime: 0,
      cacheTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );
};

export const useResumenPreseleccion = (usuarioId: string) => {
  return useQuery(['resumen-preseleccion', usuarioId], () => getResumenPreseleccion(usuarioId), {
    enabled: !!usuarioId,
    staleTime: 0,
    cacheTime: 1000 * 60 * 5
  });
};

export const useCanModifyPreseleccion = () => {
  return useQuery(['can-modify-preseleccion'], () => getCanModify(), {
    staleTime: 1000 * 60 * 30
  });
};

import { useQuery } from 'react-query';
import { getOfertaSeleccion, getResumenSeleccion } from '@/services/selection/selection.service';
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

export const useOfertaSeleccion = (usuarioId: string, filters?: FilterParams) => {
  return useQuery(
    ['oferta-seleccion', usuarioId, filters],
    () => getOfertaSeleccion(usuarioId, filters),
    {
      enabled: !!usuarioId,
      staleTime: 0,
      cacheTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );
};

export const useResumenSeleccion = (usuarioId: string) => {
  return useQuery(['resumen-seleccion', usuarioId], () => getResumenSeleccion(usuarioId), {
    enabled: !!usuarioId,
    staleTime: 0,
    cacheTime: 1000 * 60 * 5
  });
};

export const useCanModifySeleccion = () => {
  return useQuery(['can-modify-seleccion'], () => getCanModify(), {
    staleTime: 1000 * 60 * 30 // 30 minutes, this doesn't change often
  });
};

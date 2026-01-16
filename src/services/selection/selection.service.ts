import axios from 'axios';
import { SelectionOfertaResponse, ResumenSeleccionResponse } from '@/interfaces/selection/selection.interfaces';

const API_URL = import.meta.env.VITE_API_URL;

export const getOfertaSeleccion = async (
  usuarioId: string,
  params?: {
    searchTerm?: string;
    tipoAsignatura?: number;
    soloDisponibles?: boolean;
    modalidad?: number;
    periodo?: number;
    page?: number;
    itemsPerPage?: number;
  }
): Promise<SelectionOfertaResponse> => {
  const { data } = await axios.get<SelectionOfertaResponse>(
    `${API_URL}/Selection/oferta/${usuarioId}`,
    { params }
  );
  return data;
};

export const getResumenSeleccion = async (usuarioId: string): Promise<ResumenSeleccionResponse> => {
  const { data } = await axios.get<ResumenSeleccionResponse>(
    `${API_URL}/Selection/resumen/${usuarioId}`
  );
  return data;
};

export const saveSelection = async (payload: {
  usuarioId: string;
  seccionId: number;
}): Promise<{ message: string; success: boolean }> => {
  const { data } = await axios.post(`${API_URL}/Selection/seleccionar`, payload);
  return data;
};

export const cancelSelection = async (
  seleccionId: number,
  usuarioId: string
): Promise<{ message: string; success: boolean }> => {
  const { data } = await axios.delete(
    `${API_URL}/Selection/cancelar/${seleccionId}/${usuarioId}`
  );
  return data;
};

export const finalizarSeleccion = async (
  usuarioId: string
): Promise<{ message: string; success: boolean }> => {
  const { data } = await axios.post(`${API_URL}/Selection/finalizar/${usuarioId}`);
  return data;
};

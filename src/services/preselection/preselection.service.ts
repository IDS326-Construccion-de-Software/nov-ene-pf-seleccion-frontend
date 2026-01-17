import axios from 'axios';
import {
  PreselectionOfertaResponse,
  ResumenPreseleccionResponse
} from '../../interfaces/preselection/preselection.interfaces';

const API_URL = import.meta.env.VITE_API_URL;

export const getOfertaPreseleccion = async (
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
): Promise<PreselectionOfertaResponse> => {
  const { data } = await axios.get<PreselectionOfertaResponse>(
    `${API_URL}/Preselection/oferta/${usuarioId}`,
    { params }
  );
  return data;
};

export const getResumenPreseleccion = async (
  usuarioId: string
): Promise<ResumenPreseleccionResponse> => {
  const { data } = await axios.get<ResumenPreseleccionResponse>(
    `${API_URL}/Preselection/resumen/${usuarioId}`
  );
  return data;
};

export const savePreselection = async (payload: {
  usuarioId: string;
  seccionId: number;
}): Promise<{ message: string; success: boolean }> => {
  const { data } = await axios.post(`${API_URL}/Preselection/guardar`, payload);
  return data;
};

export const cancelPreselection = async (
  preseleccionId: number,
  usuarioId: string
): Promise<{ message: string; success: boolean }> => {
  const { data } = await axios.delete(
    `${API_URL}/Preselection/cancelar/${preseleccionId}/${usuarioId}`
  );
  return data;
};

export const finalizarPreseleccion = async (
  usuarioId: string
): Promise<{ message: string; success: boolean }> => {
  const { data } = await axios.post(`${API_URL}/Preselection/finalizar/${usuarioId}`);
  return data;
};

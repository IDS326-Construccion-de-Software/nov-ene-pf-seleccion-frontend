import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface CanModifyResponse {
  canModify: boolean;
}

export interface PeriodoConfigResponse {
  id: number;
  codigo: string;
  nombre: string;
  preseleccionInicio: string;
  preseleccionFin: string;
  seleccionInicio: string;
  seleccionFin: string;
  permitirModificarEnSeleccion: boolean;
}

export interface FaseResponse {
  fase: string;
}

export const getCanModify = async (): Promise<CanModifyResponse> => {
  const { data } = await axios.get<CanModifyResponse>(`${API_URL}/PeriodoConfig/can-modify`);
  return data;
};

export const getActivePeriodo = async (): Promise<PeriodoConfigResponse> => {
  const { data } = await axios.get<PeriodoConfigResponse>(`${API_URL}/PeriodoConfig/active`);
  return data;
};

export const getFase = async (): Promise<FaseResponse> => {
  const { data } = await axios.get<FaseResponse>(`${API_URL}/PeriodoConfig/fase`);
  return data;
};


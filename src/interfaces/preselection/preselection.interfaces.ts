export interface ResumenCarga {
  creditosSeleccionados: number;
  creditosMaximos: number;
  totalAsignaturas: number;
  puedeAgregarMas: boolean;
  mensajeEstado: string;
}

export interface ResumenPreseleccionResponse {
  resumenCarga: ResumenCarga;
  resumen: AsignaturaOferta[];
}

export interface Horario {
  dia: string;
  horaInicio: string;
  horaFin: string;
  aula: string;
  edificio: string;
}

export interface EstatusValidacion {
  puedeInscribir: boolean;
  motivo: string | null;
  detalleAsignatura: string | null;
  dia: string | null;
  horaInicio: string | null;
  horaFin: string | null;
}

export interface SeccionOferta {
  seccionId: number;
  codigoSeccion: string;
  profesor: string;
  cupoTotal: number;
  cupoDisponible: number;
  modalidad: number;
  seleccionada: boolean;
  estatusValidacion: EstatusValidacion;
  horarios: Horario[];
}

export interface AsignaturaOferta {
  preseleccionId: number | null;
  asignaturaId: string;
  asignatura: string;
  creditos: number;
  tipoAsignatura: string;
  periodoTrimestre: number;
  puedePreseleccionar: boolean;
  motivoBloqueo: string | null;
  totalSeccionesAsignatura: number;
  procesada?: boolean;
  secciones: SeccionOferta[];
}

export interface PreselectionOfertaResponse {
  resumenCarga: ResumenCarga;
  oferta: AsignaturaOferta[];
  page: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

// Tipos para la integración con el backend

export interface StudentInfo {
  id: string;
  name: string;
  program: string;
  trimester: string;
  previousCredits?: number;
  previousPoints?: number;
  previousGPA?: number;
}

export interface GradeData {
  clave: string;
  seccion: string;
  asignatura: string;
  calificacion: string;
  creditos: number;
  puntos: number;
}

export interface MidtermGradeData {
  codigo: string;
  asignatura: string;
  creditos: number;
  seccion: string;
  parcial1: number;
  parcial2: number;
  promedio: number;
  literal: string;
}

export interface ScheduleData {
  seccion: string;
  asignatura: string;
  creditos: number;
  profesor: string;
  aula: string;
  lunes?: string;
  martes?: string;
  miercoles?: string;
  jueves?: string;
  viernes?: string;
  sabado?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Parámetros para las llamadas al API
export interface GradesParams {
  trimester: string;
  year: string;
  type: 'medioTermino' | 'final';
  studentId: string;
}

export interface ScheduleParams {
  trimester: string;
  year: string;
  studentId: string;
}
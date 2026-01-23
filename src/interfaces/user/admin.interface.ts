export interface AdminData {
  idUsuario: number;
  nombre: string;
  apellido: string;
  nacionalidad: string;
  direccion: string;
  correoPersonal: string;
  fechaIngreso: string;
  idRol: number;
  role: string;
  correoInstitucional: string;
  idProgramaAcademico: number;
  nombreProgramaAcademico: string;
  fechaInscripcion: string;
  estatus: string;
  permanencia: number;
  trimestreActual: number;
  idAreaAcademica: string;
  nombreAreaAcademica: string;
  gradoAcademico: string | null;
  especialidad: string | null;
  fechaContratacion: string | null;
  bio: string | null;
}

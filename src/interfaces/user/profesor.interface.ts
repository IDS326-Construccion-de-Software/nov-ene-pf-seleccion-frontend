export interface ProfesorData {
  idUsuario: number;
  nombre: string;
  apellido: string;
  nacionalidad: string;
  direccion: string;
  correoPersonal: string;
  idRol: number;
  role: string;
  correoInstitucional: string;
  estatus: string;
  idAreaAcademica: string;
  nombreAreaAcademica: string;
  gradoAcademico: string | null;
  especialidad: string | null;
  fechaContratacion: string | null;
  bio: string | null;
}

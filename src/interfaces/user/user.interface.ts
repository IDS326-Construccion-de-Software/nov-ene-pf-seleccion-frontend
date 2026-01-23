export interface UserData {
  nombreUsuario?: string;
  nombre?: string;
  apellido?: string;
  correoInstitucional?: string;
  correoPersonal?: string;
  role?: string;
  estatus?: string;
  usuarioId?: string | number;
  idUsuario?: string | number;
  [key: string]: any;
}

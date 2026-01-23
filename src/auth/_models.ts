import { type TLanguageCode } from '@/i18n';

export interface AuthModel {
  access_token: string;
  refreshToken?: string;
  api_token: string;
  // Campos adicionales del endpoint INTEC
  nombreUsuario?: string;
  rol?: string;
  usuarioId?: string; // Sub del JWT
  cambioClaveSolicitado?: boolean;
}

export interface UserModel {
  id: number | string;
  username: string;
  password: string | undefined;
  email: string;
  first_name: string;
  last_name: string;
  fullname?: string;
  occupation?: string;
  companyName?: string;
  phone?: string;
  roles?: number[] | string[];
  // Campos adicionales del endpoint INTEC
  nombreUsuario?: string;
  rol?: string;
  usuarioId?: string;
  cambioClaveSolicitado?: boolean;
  pic?: string;
  language?: TLanguageCode;
  auth?: AuthModel;
}

export interface studne {
  idUsuario: number;
  nombre: string;
  apellido: string;
  nombreProgramaAcademico: string;
}

import { useAuthContext } from '@/auth';

/**
 * Hook para obtener el usuarioId del usuario autenticado
 * Retorna el usuarioId o undefined si no hay usuario autenticado
 *
 * @example
 * const usuarioId = useUsuarioId();
 * // Usar en API calls
 * const { data } = await axios.get(`/api/Selection/oferta/${usuarioId}`);
 */
export const useUsuarioId = (): string | undefined => {
  const { currentUser, auth } = useAuthContext();

  // Intentar obtener desde currentUser primero (más confiable)
  if (currentUser?.usuarioId) {
    return currentUser.usuarioId;
  }

  // Fallback a auth
  if (auth?.usuarioId) {
    return auth.usuarioId;
  }

  // Fallback al ID si es número
  if (currentUser?.id) {
    return String(currentUser.id);
  }

  return undefined;
};

/**
 * Hook para obtener el token de autorización actual
 *
 * @example
 * const token = useAuthToken();
 * // Usar en headers customizados
 * const headers = { Authorization: `Bearer ${token}` };
 */
export const useAuthToken = (): string | undefined => {
  const { auth } = useAuthContext();
  return auth?.access_token;
};

/**
 * Hook para obtener información del usuario autenticado
 *
 * @example
 * const { nombreUsuario, rol, usuarioId } = useCurrentUserInfo();
 */
export const useCurrentUserInfo = () => {
  const { currentUser, auth } = useAuthContext();

  return {
    nombreUsuario: currentUser?.nombreUsuario || auth?.nombreUsuario,
    rol: currentUser?.rol || auth?.rol,
    usuarioId: currentUser?.usuarioId || auth?.usuarioId,
    email: currentUser?.email,
    cambioClaveSolicitado: currentUser?.cambioClaveSolicitado || auth?.cambioClaveSolicitado
  };
};

export default {
  useUsuarioId,
  useAuthToken,
  useCurrentUserInfo
};

/**
 * Ejemplo de Componente con Integración de Autenticación
 *
 * Este archivo muestra cómo usar los hooks y servicios de autenticación
 * integrados con el endpoint de INTEC.
 */

import { useEffect, useState } from 'react';
import { useUsuarioId, useCurrentUserInfo } from '@/auth/hooks/useAuthInfo';
import { apiGet, apiPost } from '@/services/api/api.client';
import { useAuthContext } from '@/auth';

interface OfertaAsignatura {
  id: string;
  nombre: string;
  creditos: number;
  seccion: string;
}

interface ResumenSeleccion {
  creditosTomados: number;
  asignaturasSeleccionadas: number;
  estado: string;
}

/**
 * Ejemplo 1: Obtener ID del usuario
 */
export const EjemploObtenerUsuarioId = () => {
  const usuarioId = useUsuarioId();

  return (
    <div>
      <h3>ID del Usuario Autenticado</h3>
      <p>Usuario ID: {usuarioId || 'Cargando...'}</p>
    </div>
  );
};

/**
 * Ejemplo 2: Obtener información del usuario
 */
export const EjemploInfoUsuario = () => {
  const { nombreUsuario, rol, usuarioId, email, cambioClaveSolicitado } = useCurrentUserInfo();

  return (
    <div>
      <h3>Información del Usuario</h3>
      <p><strong>Nombre:</strong> {nombreUsuario}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Rol:</strong> {rol}</p>
      <p><strong>ID:</strong> {usuarioId}</p>
      {cambioClaveSolicitado && (
        <p style={{ color: 'red' }}>⚠️ Se requiere cambio de contraseña</p>
      )}
    </div>
  );
};

/**
 * Ejemplo 3: Realizar llamada API autenticada
 */
export const EjemploCargarOferta = () => {
  const usuarioId = useUsuarioId();
  const [oferta, setOferta] = useState<OfertaAsignatura[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioId) return;

    const cargarOferta = async () => {
      setLoading(true);
      setError(null);

      try {
        // El token se inyecta automáticamente por setupAxios
        const data = await apiGet<OfertaAsignatura[]>(
          `/Selection/oferta/${usuarioId}`
        );
        setOferta(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar la oferta');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarOferta();
  }, [usuarioId]);

  return (
    <div>
      <h3>Oferta de Asignaturas</h3>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {oferta.length === 0 && !loading && <p>No hay asignaturas disponibles</p>}
      <ul>
        {oferta.map(asignatura => (
          <li key={asignatura.id}>
            <strong>{asignatura.nombre}</strong> ({asignatura.creditos} cr) - Sección {asignatura.seccion}
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Ejemplo 4: POST con autorización (Guardar selección)
 */
export const EjemploGuardarSeleccion = () => {
  const usuarioId = useUsuarioId();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleGuardarSeleccion = async () => {
    if (!usuarioId) {
      setMessage('Usuario no autenticado');
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const resultado = await apiPost('/Selection/guardar', {
        usuarioId,
        asignaturasSeleccionadas: [
          'ADM315-01',
          'ICS320-02',
          'IDS339-02'
        ]
      });

      setMessage('✅ Selección guardada correctamente');
      console.log('Resultado:', resultado);
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
      console.error('Error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h3>Guardar Selección de Asignaturas</h3>
      <button 
        onClick={handleGuardarSeleccion} 
        disabled={saving || !usuarioId}
      >
        {saving ? 'Guardando...' : 'Guardar Selección'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

/**
 * Ejemplo 5: Logout
 */
export const EjemploLogout = () => {
  const { logout } = useAuthContext();
  const { nombreUsuario } = useCurrentUserInfo();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      // La redirección se maneja en RequireAuth o en el componente principal
    } catch (err) {
      console.error('Error en logout:', err);
      setLoggingOut(false);
    }
  };

  return (
    <div>
      <h3>Cuenta: {nombreUsuario}</h3>
      <button onClick={handleLogout} disabled={loggingOut}>
        {loggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
      </button>
    </div>
  );
};

/**
 * Ejemplo 6: Componente completo con múltiples operaciones
 */
export const EjemploCompleto = () => {
  const usuarioId = useUsuarioId();
  const { nombreUsuario, rol } = useCurrentUserInfo();
  const [resumen, setResumen] = useState<ResumenSeleccion | null>(null);

  useEffect(() => {
    if (!usuarioId) return;

    const cargarResumen = async () => {
      try {
        const data = await apiGet<ResumenSeleccion>(
          `/Selection/resumen/${usuarioId}`
        );
        setResumen(data);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    cargarResumen();
  }, [usuarioId]);

  return (
    <div>
      <h2>Bienvenido, {nombreUsuario}</h2>
      <p>Rol: {rol}</p>
      {resumen && (
        <div>
          <h3>Resumen de Selección</h3>
          <p>Créditos tomados: {resumen.creditosTomados}</p>
          <p>Asignaturas seleccionadas: {resumen.asignaturasSeleccionadas}</p>
          <p>Estado: {resumen.estado}</p>
        </div>
      )}
    </div>
  );
};

export default {
  EjemploObtenerUsuarioId,
  EjemploInfoUsuario,
  EjemploCargarOferta,
  EjemploGuardarSeleccion,
  EjemploLogout,
  EjemploCompleto
};

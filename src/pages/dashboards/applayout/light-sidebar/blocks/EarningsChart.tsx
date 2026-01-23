import { useEffect, useState } from 'react';
import { useAuthContext } from '@/auth';
import * as authService from '@/services/auth/auth.service';
import { KeenIcon } from '@/components';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserData {
  nombreUsuario: string;
  usuarioId: string;
  correoInstitucional?: string;
  programa?: string;
  areaAcademica?: string;
  trimestreActual?: number;
  indicePermanencia?: number;
  direccion?: string;
  fechaIngreso?: string;
  nacionalidad?: string;
  estatus?: string;
}

const PersonalInfo = () => {
  const { auth } = useAuthContext();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth?.access_token) {
          const user = await authService.getMe(auth.access_token);
          setUserData(user as unknown as UserData);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth?.access_token]);

  if (loading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="animate-pulse text-gray-400">Cargando...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardContent className="p-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <div className="size-14 rounded-full bg-primary-light flex items-center justify-center">
              <KeenIcon icon="user" className="text-primary text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {userData?.nombreUsuario || 'Usuario'}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-primary border-primary">
                  # ID: {userData?.usuarioId || 'N/A'}
                </Badge>
                <Badge variant="secondary" className="bg-gray-100">
                  {userData?.nacionalidad || 'Dominicana'}
                </Badge>
              </div>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <KeenIcon icon="check-circle" className="mr-1" />
            {userData?.estatus || 'Activo'}
          </Badge>
        </div>

        {/* Information Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Academic Information */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <KeenIcon icon="teacher" className="text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Información Académica
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-3">
                <KeenIcon icon="book" className="text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Programa</p>
                  <p className="text-base font-semibold text-primary">
                    {userData?.programa || 'Ingeniería de Software'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <KeenIcon icon="abstract-26" className="text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Área Académica</p>
                  <p className="text-base font-medium text-gray-900">
                    {userData?.areaAcademica || 'Ingeniería'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <KeenIcon icon="time" className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Trimestre Actual</p>
                    <p className="text-base font-medium text-gray-900">
                      {userData?.trimestreActual || '1'}º
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <KeenIcon icon="check-circle" className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Índice Permanencia</p>
                    <p className="text-base font-medium text-gray-900">
                      {userData?.indicePermanencia || '25'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <KeenIcon icon="address-book" className="text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Detalles de Contacto
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-3">
                <KeenIcon icon="sms" className="text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Correo Institucional</p>
                  <p className="text-sm font-mono text-gray-900">{userData?.correoInstitucional}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <KeenIcon icon="geolocation" className="text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Dirección</p>
                  <p className="text-base font-medium text-gray-900">{userData?.direccion}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <KeenIcon icon="calendar" className="text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fecha de Ingreso</p>
                  <p className="text-base font-medium text-gray-900">
                    {userData?.fechaIngreso || '10 de enero de 2024'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { PersonalInfo };

import { useEffect, useState } from 'react';
import { useAuthContext } from '@/auth';
import * as authService from '@/services/auth/auth.service';
import { KeenIcon } from '@/components';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StudentData } from '@/interfaces/user';

const PersonalInfo = () => {
  const { auth } = useAuthContext();
  const [userStudentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth?.access_token) {
          const user = await authService.getMe(auth.access_token);
          setStudentData(user as unknown as StudentData);
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
          <div className="flex items-center gap-2">
            <div className="size-14 rounded-full bg-primary-light flex items-center justify-center border-red-600 border-2">
              <KeenIcon icon="user" className="text-primary text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {`${userStudentData?.nombre || ''} ${userStudentData?.apellido || ''}`.trim() ||
                  'Usuario'}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-primary border-primary">
                  # ID: {userStudentData?.idUsuario || 'N/A'}
                </Badge>
                <Badge className="bg-green-100 text-green-500 hover:bg-green-100 border-2 border-green-200 text-center">
                  <KeenIcon icon="check-circle" className="mr-1" />
                  {userStudentData?.estatus || 'N/A'}
                </Badge>
                <Badge variant="secondary" className="bg-slate-600">
                  {userStudentData?.nacionalidad || 'Dominicana'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <Badge className="bg-slate-100 text-gray-500 hover:bg-green-100 border-2 border-gray-300">
              <KeenIcon icon="info" className="mr-1" />
              {userStudentData?.role || 'N/A'}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Información Académica
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <KeenIcon icon="book" className="text-primary" />
                </div>
                <div>
                  <span className="text-sm text-gray-500 mb-1">Programa</span>
                  <p className="text-base font-semibold text-primary">
                    {userStudentData?.nombreProgramaAcademico || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <KeenIcon icon="abstract-26" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Área Académica</p>
                  <p className="text-base font-medium text-gray-900">
                    {userStudentData?.nombreAreaAcademica || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <KeenIcon icon="calendar" className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Trimestre Actual</p>
                    <p className="text-base font-medium text-gray-900">
                      {userStudentData?.trimestreActual || 'N/A'}º
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Detalles de Contacto
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <KeenIcon icon="sms" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Correo Institucional</p>
                  <p className="text-base font-normal text-gray-900">
                    {userStudentData?.correoInstitucional}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <KeenIcon icon="geolocation" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dirección</p>
                  <p className="text-base font-medium text-gray-900">
                    {userStudentData?.direccion || 'Av. Winston Churchill'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <KeenIcon icon="calendar" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha de Ingreso</p>
                  <p className="text-base font-medium text-gray-900">
                    {formatDate(userStudentData?.fechaIngreso) || 'N/A'}
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

import { useEffect, useState } from 'react';
import { KeenIcon } from '@/components';
import * as authService from '@/services/auth/auth.service';
import { useAuthContext } from '@/auth';
import { StudentData, UserData } from '@/interfaces/user';

const InfoStudent = () => {
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
    const fetchStudentData = async () => {
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

    fetchStudentData();
  }, [auth?.access_token]);

  if (loading) {
    return (
      <div className="card min-w-full">
        <div className="card-header">
          <h3 className="card-title">Personal Info</h3>
        </div>
        <div className="card-table scrollable-x-auto pb-3">
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600">
              <KeenIcon icon="loader" className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card min-w-full">
      <div className="card-table scrollable-x-auto pb-3">
        <table className="table align-middle text-sm text-gray-500">
          <tbody>
            <tr>
              <td className="py-2 text-gray-600 font-normal">Área académica</td>
              <td className="py-2 text-gray-800 font-normal text-sm">
                {userStudentData?.nombreAreaAcademica || 'N/A'}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">Programa académico</td>
              <td className="py-2 text-gray-800 font-normal text-sm">
                {userStudentData?.nombreProgramaAcademico}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
            <tr>
              <td className="py-3 text-gray-600 font-normal">Estado</td>
              <td className="py-3 text-gray-800 font-normal">
                <span
                  className={`badge badge-sm badge-outline ${
                    userStudentData?.estatus === 'Activo' ? 'badge-success' : 'badge-danger'
                  }`}
                >
                  {userStudentData?.estatus || 'Desconocido'}
                </span>
              </td>
              <td className="py-3 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">Trimestre Actual</td>
              <td className="py-2 text-gray-800 font-normal text-sm">
                {userStudentData?.trimestreActual}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">Correo Institucional</td>
              <td className="py-2 text-gray-800 font-normal text-sm">
                {userStudentData?.correoInstitucional}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">Total permanencia</td>
              <td className="py-2 text-gray-800 font-normal text-sm">
                {userStudentData?.permanencia}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">Fecha de inscripción</td>
              <td className="py-2 text-gray-800 font-normal text-sm">
                {formatDate(userStudentData?.fechaInscripcion)}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">Nacionalidad</td>
              <td className="py-2 text-gray-800 font-normal text-sm">
                {userStudentData?.nacionalidad}
              </td>
              <td className="py-2 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { InfoStudent };

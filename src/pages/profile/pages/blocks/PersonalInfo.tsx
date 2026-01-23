import { useEffect, useState } from 'react';
import { KeenIcon } from '@/components';
import { CrudAvatarUpload } from '@/partials/crud';
import * as authService from '@/services/auth/auth.service';
import { useAuthContext } from '@/auth';
import { StudentData, UserData } from '@/interfaces/user';

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
              <td className="py-2 min-w-28 text-gray-600 font-normal">Imagen de perfil</td>
              <td className="py-2 text-gray700 font-normal min-w-32 text-2sm">
                150x150px JPEG, PNG
              </td>
              <td className="py-2 text-center">
                <div className="flex justify-center items-center">
                  <CrudAvatarUpload />
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">Nombre/s</td>
              <td className="py-2 text-gray-800 font-normaltext-sm">{userStudentData?.nombre}</td>
              <td className="py-2 text-center">
                <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                  <KeenIcon icon="notepad-edit" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="py-2 text-gray-600 font-normal">Apellido/s</td>
              <td className="py-2 text-gray-800 font-normaltext-sm">{userStudentData?.apellido}</td>
              <td className="py-2 text-center">
                <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                  <KeenIcon icon="notepad-edit" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="py-3 text-gray-600 font-normal">Correo Personal</td>
              <td className="py-3 text-gray-800 font-normal">{userStudentData?.correoPersonal}</td>
              <td className="py-3 text-center">
                <a href="#" className="btn btn-sm btn-icon btn-clear btn-primary">
                  <KeenIcon icon="notepad-edit" />
                </a>
              </td>
            </tr>
            <tr>
              <td className="py-3 text-gray-600 font-normal">Rol</td>
              <td className="py-3 text-gray-700 text-sm font-normal">
                {userStudentData?.role || 'No especificado'}
              </td>
              <td className="py-3 text-center"></td>
            </tr>
            <tr>
              <td className="py-3 text-gray-600 font-normal">Fecha de ingreso</td>
              <td className="py-3 text-gray-700 text-sm font-normal">
                {formatDate(userStudentData?.fechaIngreso)}
              </td>
              <td className="py-3 text-center"></td>
            </tr>
            <tr>
              <td className="py-3">Address</td>
              <td className="py-3 text-gray-700 text-2sm font-normal">
                {userStudentData?.direccion || 'No especificada'}
              </td>
              <td className="py-3 text-center">
                <a href="#" className="btn btn-link btn-sm">
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { PersonalInfo };

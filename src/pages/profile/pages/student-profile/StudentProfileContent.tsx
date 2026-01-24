import { StudentProfileHero } from './components';
import { GeneralData, AcademicProgress } from './blocks';
import { KeenIcon } from '@/components';
import { useAuthContext } from '@/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface AcademicIndices {
  indicePeriodo: number;
  indiceAcumulado: number;
  ultimoPeriodo: string;
}

const StudentProfileContent = () => {
  const { currentUser, auth } = useAuthContext();
  const [academicData, setAcademicData] = useState<AcademicIndices | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcademicData = async () => {
      if (currentUser?.usuarioId && auth?.access_token) {
        try {
          const response = await axios.get<AcademicIndices>(
            `${import.meta.env.VITE_API_URL}/api/students/${currentUser.usuarioId}/academic-progress/indices`,
            {
              headers: {
                Authorization: `Bearer ${auth.access_token}`
              }
            }
          );
          setAcademicData(response.data);
        } catch (error) {
          console.error('Error fetching academic data:', error);
        }
      }
      setLoading(false);
    };

    fetchAcademicData();
  }, [currentUser?.usuarioId, auth?.access_token]);

  // Datos del usuario logueado
  const userName = currentUser?.nombreUsuario || currentUser?.username || 'Usuario';
  const studentId = currentUser?.usuarioId || currentUser?.id?.toString() || '';
  const userEmail = currentUser?.email || `${studentId}@est.intec.edu.do`;
  const userRole = currentUser?.rol || 'Estudiante';

  return (
    <div className="container-fluid space-y-6">
      {/* Hero Section with Profile Banner */}
      <StudentProfileHero 
        name={userName}
        studentId={studentId}
        email={userEmail}
        location="Santo Domingo, Rep. Dom."
      />

      {/* Profile Information Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Perfil de usuario
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Información de estudiante
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 flex items-center gap-2">
            <KeenIcon icon="calendar" className="text-base" />
            Nov 06, 2025 - Ene 31, 2026
          </span>
          <button className="btn btn-primary">
            <span className="flex items-center gap-2">
              <KeenIcon icon="medal-star" className="text-base" />
              Solicitar graduación
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Data - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <GeneralData 
            studentId={studentId}
            program="IDS - Ingeniería de software"
            academicStatus="Normal"
            trimesterIndex={academicData?.indicePeriodo || 3.7}
            generalIndex={`${academicData?.indiceAcumulado?.toFixed(2) || '3.43'} de 4`}
            currentTrimester={12}
            approvedSubjects="51 de 65"
            entryTerm="Enero 2022 - Octubre 2022"
            lastCondition={academicData?.ultimoPeriodo || 'Agosto 2025 - Octubre 2025'}
          />
        </div>

        {/* Academic Progress - Takes 1 column on large screens */}
        <div className="lg:col-span-1">
          <AcademicProgress 
            completedTrimesters={12}
            totalTrimesters={19}
          />
        </div>
      </div>
    </div>
  );
};

export { StudentProfileContent };

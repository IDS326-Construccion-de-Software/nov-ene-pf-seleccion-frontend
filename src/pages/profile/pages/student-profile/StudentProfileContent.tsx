import { StudentProfileHero } from './components';
import { GeneralData, AcademicProgress } from './blocks';
import { KeenIcon } from '@/components';

const StudentProfileContent = () => {
  return (
    <div className="container-fluid space-y-6">
      {/* Hero Section with Profile Banner */}
      <StudentProfileHero />

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
          <GeneralData />
        </div>

        {/* Academic Progress - Takes 1 column on large screens */}
        <div className="lg:col-span-1">
          <AcademicProgress />
        </div>
      </div>
    </div>
  );
};

export { StudentProfileContent };

import { KeenIcon } from '@/components';

interface GeneralDataProps {
  studentId?: string;
  program?: string;
  academicStatus?: string;
  entryTerm?: string;
  lastCondition?: string;
  trimesterIndex?: number;
  entryTermRight?: string;
  currentTrimester?: number;
  generalIndex?: string;
  approvedSubjects?: string;
}

const GeneralData = ({
  studentId = '1077546',
  program = 'IDS - Ingeniería de software',
  academicStatus = 'Normal',
  entryTerm = 'Enero 2022 - Octubre 2022',
  lastCondition = 'Agosto 2025 - Octubre 2025',
  trimesterIndex = 3.7,
  entryTermRight = 'Enero 2022 - Octubre 2022',
  currentTrimester = 12,
  generalIndex = '3.43 de 4',
  approvedSubjects = '51 de 65'
}: GeneralDataProps) => {
  return (
    <div className="card h-full">
      <div className="card-header py-5">
        <h3 className="card-title flex items-center gap-3 text-lg">
          <KeenIcon icon="profile-user" className="text-2xl text-primary" />
          Datos generales
        </h3>
      </div>
      
      <div className="card-body py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {/* Left Column */}
          <div className="space-y-5">
            {/* ID */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Id:</span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {studentId}
              </span>
            </div>

            {/* Program */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Programa:</span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {program}
              </span>
            </div>

            {/* Academic Status */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Condición académica:
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {academicStatus}
              </span>
            </div>

            {/* Entry Term */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Trimestre de ingreso:
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {entryTerm}
              </span>
            </div>

            {/* Last Condition */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Última condición:
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {lastCondition}
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Trimester Index */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Índice trimestral:
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {trimesterIndex}
              </span>
            </div>

            {/* Entry Term (right side) */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Trimestre de ingreso:
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {entryTermRight}
              </span>
            </div>

            {/* Current Trimester */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Trimestre actual:
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {currentTrimester}
              </span>
            </div>

            {/* General Index */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Índice general:
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {generalIndex}
              </span>
            </div>

            {/* Approved Subjects */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Asignaturas aprobadas:
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {approvedSubjects}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { GeneralData };

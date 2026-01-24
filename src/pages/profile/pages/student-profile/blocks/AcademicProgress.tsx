import { KeenIcon } from '@/components';

interface AcademicProgressProps {
  completedTrimesters?: number;
  totalTrimesters?: number;
}

const AcademicProgress = ({
  completedTrimesters = 12,
  totalTrimesters = 19
}: AcademicProgressProps) => {
  const availableTrimesters = totalTrimesters - completedTrimesters;
  const completedPercentage = (completedTrimesters / totalTrimesters) * 100;

  return (
    <div className="card h-full">
      <div className="card-header flex items-center justify-between">
        <h3 className="card-title">
          Trimestres cursados
        </h3>
        <button className="btn btn-sm btn-icon btn-light">
          <KeenIcon icon="dots-vertical" className="text-lg" />
        </button>
      </div>

      <div className="card-body">
        {/* Total Label */}
        <div className="text-center mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
        </div>

        {/* Progress Summary - Main numbers */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Completed */}
          <div className="text-center">
            <div className="text-5xl font-bold text-danger">
              {completedTrimesters}
            </div>
          </div>

          {/* Separator */}
          <div className="text-4xl font-light text-gray-300 dark:text-gray-600">|</div>

          {/* Total */}
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-400 dark:text-gray-500">
              {totalTrimesters}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex h-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {/* Completed portion */}
            <div
              className="bg-danger transition-all duration-300"
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-danger inline-block"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Cursados</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 inline-block"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Disponibles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AcademicProgress };

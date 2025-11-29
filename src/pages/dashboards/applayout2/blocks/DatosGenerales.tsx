import { KeenIcon } from '@/components';
import clsx from 'clsx';

interface IDatosGeneralesProps {
  className?: string;
}

interface IDatoEstudiante {
  id: string;
  programa: string;
  condicionAcademica: string;
  trimestreIngreso: string;
  ultimaCondicion: string;
  indiceTrimestral: string;
  trimestreIngresoFecha: string;
  trimestreActual: number;
}

// Datos de ejemplo - estos vendrían de una API
const datosEstudiante: IDatoEstudiante = {
  id: '1077546',
  programa: 'IDS - Ingeniería de software',
  condicionAcademica: 'Normal',
  trimestreIngreso: 'Enero 2022 - Octubre 2022',
  ultimaCondicion: 'Agosto 2025 - Octubre 2025',
  indiceTrimestral: '3.7',
  trimestreIngresoFecha: 'Enero 2022 - Octubre 2022',
  trimestreActual: 12
};

const DatosGenerales = ({ className }: IDatosGeneralesProps) => {
  return (
    <div className={clsx('card', className)}>
      <div className="card-header">
        <div className="flex items-center gap-2">
          <KeenIcon icon="profile-circle" className="text-gray-600 text-xl" />
          <h3 className="card-title">Datos generales</h3>
        </div>
      </div>
      <div className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {/* Columna izquierda */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm min-w-32">Id:</span>
              <span className="text-gray-900 font-medium text-sm">{datosEstudiante.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm min-w-32">Programa:</span>
              <span className="text-gray-900 font-medium text-sm">{datosEstudiante.programa}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm min-w-32">Condición académica:</span>
              <span className="text-gray-900 font-medium text-sm">{datosEstudiante.condicionAcademica}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm min-w-32">Trimestre de ingreso:</span>
              <span className="text-gray-900 font-medium text-sm">{datosEstudiante.trimestreIngreso}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm min-w-32">Última condición:</span>
              <span className="text-gray-900 font-medium text-sm">{datosEstudiante.ultimaCondicion}</span>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm min-w-32">Índice trimestral:</span>
              <span className="text-gray-900 font-medium text-sm">{datosEstudiante.indiceTrimestral}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm min-w-32">Trimestre de ingreso:</span>
              <span className="text-gray-900 font-medium text-sm">{datosEstudiante.trimestreIngresoFecha}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm min-w-32">Trimestre actual:</span>
              <span className="text-gray-900 font-medium text-sm">{datosEstudiante.trimestreActual}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DatosGenerales, type IDatosGeneralesProps };


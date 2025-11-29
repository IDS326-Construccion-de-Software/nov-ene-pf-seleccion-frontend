import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { useLanguage } from '@/i18n';
import { DropdownCard2 } from '@/partials/dropdowns/general';
import clsx from 'clsx';

interface ICreditosAprobadosProps {
  className?: string;
  creditosCursados?: number;
  creditosTotales?: number;
  trimestre?: string;
}

const CreditosAprobados = ({ 
  className,
  creditosCursados = 257,
  creditosTotales = 267,
  trimestre = 'Noviembre 2025 - Enero 2026'
}: ICreditosAprobadosProps) => {
  const { isRTL } = useLanguage();
  const creditosPendientes = creditosTotales - creditosCursados;
  const porcentaje = (creditosCursados / creditosTotales) * 100;

  return (
    <div className={clsx('card', className)}>
      <div className="card-header">
        <div className="flex items-center gap-2">
          <KeenIcon icon="book" className="text-gray-600 text-xl" />
          <h3 className="card-title">Créditos aprobados</h3>
        </div>

        <Menu className="items-stretch">
          <MenuItem
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: isRTL() ? 'bottom-start' : 'bottom-end',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: isRTL() ? [0, -10] : [0, 10]
                  }
                }
              ]
            }}
          >
            <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
              <KeenIcon icon="dots-vertical" />
            </MenuToggle>
            {DropdownCard2()}
          </MenuItem>
        </Menu>
      </div>
      <div className="card-body flex flex-col items-center justify-center py-6">
        <span className="text-gray-500 text-sm mb-2">Total</span>
        
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-bold text-danger">{creditosCursados}</span>
          <span className="text-4xl font-light text-gray-500">|</span>
          <span className="text-4xl font-bold text-gray-500">{creditosTotales}</span>
        </div>

        {/* Barra de progreso */}
        <div className="w-full max-w-56 h-2 rounded-full overflow-hidden flex mb-4">
          <div 
            className="h-full bg-danger" 
            style={{ width: `${porcentaje}%` }}
          />
          <div 
            className="h-full bg-gray-400" 
            style={{ width: `${100 - porcentaje}%` }}
          />
        </div>

        {/* Leyenda */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-danger" />
            <span className="text-xs text-gray-600">Créditos cursados</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            <span className="text-xs text-gray-600">Pendientes</span>
          </div>
        </div>

        {/* Trimestre */}
        <div className="text-center">
          <span className="text-gray-600 text-sm">Trimestre</span>
          <p className="text-gray-900 font-medium text-sm">{trimestre}</p>
        </div>
      </div>
    </div>
  );
};

export { CreditosAprobados, type ICreditosAprobadosProps };

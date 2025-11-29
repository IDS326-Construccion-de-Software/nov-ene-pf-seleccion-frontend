import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { useLanguage } from '@/i18n';
import { DropdownCard2 } from '@/partials/dropdowns/general';
import { ApexOptions } from 'apexcharts';
import clsx from 'clsx';
import ApexChart from 'react-apexcharts';

interface IAsignaturasAprobadasProps {
  className?: string;
  aprobadas?: number;
  pendientes?: number;
}

const AsignaturasAprobadas = ({ 
  className,
  aprobadas = 51,
  pendientes = 14
}: IAsignaturasAprobadasProps) => {
  const { isRTL } = useLanguage();
  const total = aprobadas + pendientes;

  const options: ApexOptions = {
    series: [pendientes, aprobadas],
    chart: {
      type: 'donut',
      height: 200,
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '62%',
          labels: {
            show: true,
            name: {
              show: false
            },
            value: {
              show: true,
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--tw-gray-900)',
              offsetY: 8,
              formatter: () => aprobadas.toString()
            },
            total: {
              show: true,
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--tw-gray-900)',
              formatter: () => aprobadas.toString()
            }
          }
        }
      }
    },
    colors: ['#dc3545', '#9ca3af'],
    labels: ['Pendientes', 'Aprobadas'],
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      colors: ['#fff']
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      style: {
        fontSize: '12px',
        fontFamily: 'inherit'
      },
      y: {
        formatter: (val: number) => `${val}`
      },
      marker: {
        show: true
      },
      cssClass: 'apexcharts-tooltip-dark'
    }
  };

  return (
    <div className={clsx('card', className)}>
      <div className="card-header">
        <div className="flex items-center gap-2">
          <KeenIcon icon="notepad" className="text-danger text-xl" />
          <h3 className="card-title">Asignaturas aprobadas</h3>
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
      <div className="card-body flex flex-col items-center justify-center py-4">
        <div className="flex items-center gap-6">
          <ApexChart
            options={options}
            series={options.series}
            type="donut"
            width={140}
            height={140}
          />
          
          {/* Leyenda */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-danger" />
              <span className="text-xs text-gray-600">Aprobadas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-xs text-gray-600">Pendientes</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <span className="text-gray-900 font-semibold text-sm">{pendientes}</span>
          <span className="text-gray-600 text-sm"> de </span>
          <span className="text-gray-900 font-semibold text-sm">{total}</span>
          <span className="text-gray-600 text-sm"> pendientes</span>
        </div>
      </div>
    </div>
  );
};

export { AsignaturasAprobadas, type IAsignaturasAprobadasProps };


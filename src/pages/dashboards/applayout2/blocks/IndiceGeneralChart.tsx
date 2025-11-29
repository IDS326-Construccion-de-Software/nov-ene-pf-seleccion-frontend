import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { useLanguage } from '@/i18n';
import { DropdownCard2 } from '@/partials/dropdowns/general';
import { ApexOptions } from 'apexcharts';
import clsx from 'clsx';
import ApexChart from 'react-apexcharts';

interface IIndiceGeneralChartProps {
  className?: string;
  indice?: number;
  maxIndice?: number;
  condicion?: string;
}

const IndiceGeneralChart = ({
  className,
  indice = 3.43,
  maxIndice = 4,
  condicion = 'Bueno'
}: IIndiceGeneralChartProps) => {
  const { isRTL } = useLanguage();
  const porcentaje = (indice / maxIndice) * 100;
  const restante = 100 - porcentaje;

  const options: ApexOptions = {
    series: [porcentaje, restante],
    chart: {
      type: 'donut',
      height: 200
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: false
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 700,
              color: '#1e293b',
              offsetY: 8,
              formatter: () => indice.toFixed(2)
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: '24px',
              fontWeight: 700,
              color: '#1e293b',
              formatter: () => indice.toFixed(2)
            }
          }
        }
      }
    },
    colors: ['#dc3545', '#d1d5db'],
    labels: ['Índice', 'Restante'],
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 0
    },
    tooltip: {
      enabled: false
    }
  };

  return (
    <div className={clsx('card', className)}>
      <div className="card-header">
        <div className="flex items-center gap-2">
          <KeenIcon icon="chart-pie-simple" className="text-danger text-xl" />
          <h3 className="card-title">Índice general</h3>
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
        <div className="flex items-center gap-4">
          <ApexChart
            options={options}
            series={options.series}
            type="donut"
            width={140}
            height={140}
          />
          
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Índice general</span>
            <span className="text-gray-800 font-medium text-sm">{indice.toFixed(2)} de {maxIndice}</span>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <span className="text-gray-600 text-sm">Condición - </span>
          <span className="text-gray-900 font-medium text-sm">{condicion}</span>
        </div>
      </div>
    </div>
  );
};

export { IndiceGeneralChart, type IIndiceGeneralChartProps };


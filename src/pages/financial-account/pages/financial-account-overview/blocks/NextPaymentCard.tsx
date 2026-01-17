import { KeenIcon } from '@/components';
import { type UpcomingPayment } from '../mocks/financial-account.mock';

interface NextPaymentCardProps {
  data: UpcomingPayment;
}

export const NextPaymentCard = ({ data }: NextPaymentCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(value);
  };

  return (
    <div className="card border border-gray-100 shadow-sm bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/70 via-white to-white pointer-events-none"></div>
      <div className="card-body flex flex-col gap-4 relative">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-amber-600 uppercase">
              Próxima cuota
            </span>
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">{data.titulo}</h3>
            <p className="text-sm text-gray-600">{data.cuotaLabel}</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center border border-red-100 shadow-sm">
            <KeenIcon iconName="calendar" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex flex-col items-center justify-center text-gray-900 font-bold text-lg shadow-sm">
              {String(data.restanteHoras).padStart(2, '0')}
            </div>
            <span className="text-[11px] font-semibold text-gray-600">DÍAS</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex flex-col items-center justify-center text-gray-900 font-bold text-lg shadow-sm">
              {String(data.restanteMinutos).padStart(2, '0')}
            </div>
            <span className="text-[11px] font-semibold text-gray-600">HRS</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Vence el {data.venceEl}</span>
        </div>

        <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm mt-1">
          <div>
            <p className="text-xs text-gray-600">Pendiente</p>
            <p className="text-base font-semibold text-gray-900">
              {formatCurrency(data.montoPendiente)}
            </p>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center shadow">
            <KeenIcon iconName="arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

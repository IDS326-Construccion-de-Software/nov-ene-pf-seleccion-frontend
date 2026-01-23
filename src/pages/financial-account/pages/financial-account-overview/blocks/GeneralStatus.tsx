import { KeenIcon } from '@/components';
import { type FinancialAccountOverview } from '../mocks/financial-account.mock';

interface GeneralStatusProps {
  data: FinancialAccountOverview;
}

export const GeneralStatus = ({ data }: GeneralStatusProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(value);
  };

  return (
    <div className="card border border-gray-100 shadow-sm">
      <div className="card-body pt-6 pb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Estado General</h3>
            <p className="text-sm text-gray-600">
              Vas por buen camino. Te falta poco para liquidar el trimestre.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
            <KeenIcon iconName="wallet" className="text-emerald-600" />
            <div className="text-right">
              <p className="text-[11px] uppercase text-gray-500 font-semibold">Total a pagar</p>
              <p className="text-base font-bold text-gray-900">
                {formatCurrency(data.saldo_total)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-6 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="62" fill="none" stroke="#E8EDF2" strokeWidth="10" />
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  fill="none"
                  stroke="#20BF6B"
                  strokeWidth="10"
                  strokeDasharray={`${(data.porcentaje_pagado / 100) * 389.6} 389.6`}
                  strokeLinecap="round"
                  transform="rotate(-90 70 70)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
                <span className="text-3xl font-bold text-gray-900">{data.porcentaje_pagado}%</span>
                <span className="text-[10px] font-semibold text-gray-600 tracking-wide">
                  COMPLETADO
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#20BF6B]"></span>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">Pagado</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(data.saldo_pagado)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F86F82]"></span>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">Pendiente</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(data.saldo_pendiente)}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full bg-red-400 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-[#20BF6B]"
                style={{ width: `${data.porcentaje_pagado}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#20BF6B]"></span>
              <span className="font-semibold text-gray-700">Pagado</span>
              <span className="w-2 h-2 rounded-full bg-[#FADADD]"></span>
              <span className="font-semibold text-gray-700">Pendiente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ResumenCarga } from '@/interfaces/selection/selection.interfaces';
import { KeenIcon } from '@/components';
import { useEffect, useState } from 'react';
import {
  getActivePeriodo,
  PeriodoConfigResponse
} from '@/services/periodoconfig/peridoconfig.service';

interface StatusProps {
  resumen: ResumenCarga;
  canModify?: boolean;
}

const SubjectSelectionStatus = ({ resumen, canModify = true }: StatusProps) => {
  const [periodoActivo, setPeriodoActivo] = useState<PeriodoConfigResponse | null>(null);
  const [enPeriodoSeleccion, setEnPeriodoSeleccion] = useState(false);

  useEffect(() => {
    const fetchPeriodo = async () => {
      try {
        const data = await getActivePeriodo();
        setPeriodoActivo(data);

        // Verificar si estamos en el período de selección
        const ahora = new Date();
        const inicio = new Date(data.seleccionInicio);
        const fin = new Date(data.seleccionFin);
        setEnPeriodoSeleccion(ahora >= inicio && ahora <= fin);
      } catch (error) {
        console.error('Error al obtener el período activo:', error);
      }
    };

    fetchPeriodo();
  }, []);

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    const opciones: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };

    const fechaFormateada = date.toLocaleDateString('es-DO', opciones);
    return fechaFormateada.replace(/^\w/, (c) => c.toUpperCase());
  };

  const formatearHora = (fecha: string) => {
    const date = new Date(fecha);
    const opciones: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    const horaFormateada = date.toLocaleTimeString('es-DO', opciones);
    return horaFormateada
      .replace(' de la mañana', ' A.M.')
      .replace(' de la tarde', ' P.M.')
      .replace(' de la noche', ' P.M.')
      .replace('a. m.', 'A.M.')
      .replace('p. m.', 'P.M.');
  };

  return (
    <Card className="bg-white/50 border-gray-200">
      <CardContent className="p-4">
        {!canModify && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3">
            <KeenIcon icon="information-2" className="text-amber-600 size-5" />
            <p className="text-sm text-amber-900">
              El periodo de modificación de selección ha finalizado o no está activo.
            </p>
          </div>
        )}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-8 justify-between w-full">
            <div className="flex items-center gap-2">
              <Badge
                className={`${
                  resumen.totalAsignaturas === 0
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                    : resumen.puedeAgregarMas
                      ? 'bg-green-100 text-green-700 hover:bg-green-100'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                } border-none px-3 py-1 font-bold shrink-0`}
              >
                {resumen.totalAsignaturas === 0
                  ? 'En Espera'
                  : resumen.puedeAgregarMas
                    ? 'Estado OK'
                    : 'Límite alcanzado (Sobrecredito)'}
              </Badge>
              <span
                className={`${
                  resumen.totalAsignaturas === 0
                    ? 'text-gray-500 font-normal'
                    : resumen.puedeAgregarMas
                      ? 'text-green-600 font-medium text-nowrap'
                      : 'text-red-600 font-medium'
                } text-sm`}
              >
                {resumen.totalAsignaturas === 0 ? 'Sin Seleccionar' : resumen.mensajeEstado}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {periodoActivo ? (
                <>
                  {enPeriodoSeleccion ? (
                    <div className="flex items-center gap-8">
                      <div className="hidden sm:block ms-3 h-8 w-[1px] bg-gray-300" />

                      <div className="flex items-center gap-4">
                        <KeenIcon icon="calendar" className="text-gray-500 text-[20px]" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                            {periodoActivo.codigo}
                          </span>
                          <span className="text-xs text-gray-900 text-nowrap uppercase font-bold tracking-wider">
                            {periodoActivo.nombre}
                          </span>
                        </div>
                      </div>
                      <div className="hidden sm:block h-8 w-[1px] bg-gray-300" />
                      <div className="flex flex-row items-center justify-center gap-4">
                        <KeenIcon icon="time" className="text-gray-500 text-[20px]" />
                        <div className="flex gap-4">
                          <div className="flex flex-col text-xs text-gray-600 font-medium">
                            <span className="font-bold uppercase text-gray-900 ">Fecha desde</span>
                            <span className="text-nowrap">
                              {formatearFecha(periodoActivo.seleccionInicio)}{' '}
                              {formatearHora(periodoActivo.seleccionInicio)}
                            </span>
                          </div>
                          <div className="flex flex-col text-xs text-gray-600 font-medium">
                            <span className="font-bold uppercase text-gray-900 ">Fecha hasta</span>
                            <span className="text-nowrap">
                              {formatearFecha(periodoActivo.seleccionFin)}{' '}
                              {formatearHora(periodoActivo.seleccionFin)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block h-8 w-[1px] bg-gray-300" />
                    </div>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:flex sm:items-center items-end gap-4 md:gap-8">
              <div className="flex flex-col justify-center">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Asignaturas
                </span>
                <div className="flex items-baseline gap-1 justify-center">
                  <span className="font-bold text-gray-900 text-xl lg:text-2xl">
                    {resumen.totalAsignaturas}
                  </span>
                </div>
              </div>
              <div className="hidden sm:block h-8 w-[1px] bg-gray-300" />

              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Créditos
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-gray-900 text-xl lg:text-2xl">
                    {resumen.creditosSeleccionados}
                  </span>
                  <span className="text-gray-500 text-nowrap">/ {resumen.creditosMaximos} Max</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { SubjectSelectionStatus };

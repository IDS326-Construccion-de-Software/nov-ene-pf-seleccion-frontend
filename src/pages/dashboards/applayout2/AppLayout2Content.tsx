import {
  AsignaturasAprobadas,
  CreditosAprobados,
  DatosGenerales,
  IndiceGeneralChart,
  TrimestresCard
} from './blocks';

const AppLayout2Content = () => {
  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Fila 1: Datos generales + Trimestres cursados */}
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-2">
          <DatosGenerales className="h-full" />
        </div>
        <div className="lg:col-span-1">
          <TrimestresCard className="h-full" />
        </div>
      </div>

      {/* Fila 2: Índice general + Créditos aprobados + Asignaturas aprobadas */}
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <IndiceGeneralChart className="h-full" />
        </div>
        <div className="lg:col-span-1">
          <CreditosAprobados className="h-full" />
        </div>
        <div className="lg:col-span-1">
          <AsignaturasAprobadas className="h-full" />
        </div>
      </div>
    </div>
  );
};

export { AppLayout2Content };


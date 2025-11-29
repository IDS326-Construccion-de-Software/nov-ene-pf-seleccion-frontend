import clsx from 'clsx';

interface ITrimestresCardProps {
  className?: string;
  cursados?: number;
  disponibles?: number;
}

const TrimestresCard = ({ 
  className, 
  cursados = 12, 
  disponibles = 19 
}: ITrimestresCardProps) => {
  const porcentajeCursados = (cursados / disponibles) * 100;
  const porcentajeDisponibles = 100 - porcentajeCursados;

  return (
    <div className={clsx('card', className)}>
      <div className="card-header">
        <h3 className="card-title">Trimestres cursados</h3>
      </div>
      <div className="card-body flex flex-col items-center justify-center py-6">
        <span className="text-gray-500 text-sm mb-2">Total</span>
        
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-bold text-primary">{cursados}</span>
          <span className="text-4xl font-light text-gray-500">|</span>
          <span className="text-4xl font-bold text-gray-500">{disponibles}</span>
        </div>

        {/* Barra de progreso */}
        <div className="w-full max-w-48 h-2 rounded-full overflow-hidden flex">
          <div 
            className="h-full bg-danger rounded-l-full" 
            style={{ width: `${porcentajeCursados}%` }}
          />
          <div 
            className="h-full bg-gray-400 rounded-r-full" 
            style={{ width: `${porcentajeDisponibles}%` }}
          />
        </div>

        {/* Leyenda */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-danger" />
            <span className="text-xs text-gray-600">Cursados</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            <span className="text-xs text-gray-600">Disponibles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TrimestresCard, type ITrimestresCardProps };

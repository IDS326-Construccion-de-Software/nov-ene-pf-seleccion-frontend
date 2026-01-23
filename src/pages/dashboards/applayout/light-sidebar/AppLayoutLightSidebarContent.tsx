import { useEffect, useState } from 'react';
import { PersonalInfo, Highlights } from './blocks';
import { SubjectPreselectionSchedule } from './blocks/SubjectPreselectionSchedule';
import { SubjectSelectionSchedule } from './blocks/SubjectSelectionSchedule';
import { getFase } from '@/services/periodoconfig/peridoconfig.service';
import { useResumenPreseleccion } from '@/pages/processes/pages/subject-preselection/hooks/useOfertaPreseleccion';
import { useResumenSeleccion } from '@/pages/processes/pages/subject-selection/hooks/useOfertaSeleccion';
import { useAuthContext } from '@/auth';

const AppLayoutLightSidebarContent = () => {
  const { auth } = useAuthContext();
  const usuarioId = String(auth?.usuarioId);
  const [faseActual, setFaseActual] = useState<string>('');

  // Obtener datos de preselección
  const { data: resumenPreseleccion } = useResumenPreseleccion(usuarioId);

  // Obtener datos de selección
  const { data: resumenSeleccion } = useResumenSeleccion(usuarioId);

  useEffect(() => {
    const obtenerFase = async () => {
      try {
        const { fase } = await getFase();
        setFaseActual(fase);
      } catch (error) {
        console.error('Error al obtener la fase:', error);
        setFaseActual('Seleccion');
      }
    };

    obtenerFase();
  }, []);

  const ofertaPreseleccion = (resumenPreseleccion?.resumen || []).filter(
    (asig) => asig.procesada === true
  );

  const ofertaSeleccion = (resumenSeleccion?.resumen || []).filter(
    (asig) => asig.definitiva === true
  );

  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-1">
          <Highlights limit={3} />
        </div>

        <div className="lg:col-span-2">
          <PersonalInfo />
        </div>
      </div>
      <div className="w-full">
        {faseActual === 'Preseleccion' ? (
          <SubjectPreselectionSchedule oferta={ofertaPreseleccion} />
        ) : (
          <SubjectSelectionSchedule oferta={ofertaSeleccion} />
        )}
      </div>
    </div>
  );
};

export { AppLayoutLightSidebarContent };

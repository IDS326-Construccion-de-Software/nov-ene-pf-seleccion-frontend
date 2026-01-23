import { useState, useEffect } from 'react';
import { Container, KeenIcon } from '@/components';
import { Toolbar, ToolbarHeading, ToolbarActions } from '@/layouts/applayout/toolbar';
import { Button } from '@/components/ui/button';
import { PDFViewer } from '@react-pdf/renderer';
import AcademicSchedulePDF from '@/components/pdf/AcademicSchedulePDF';
import { AcademicSchedulePreselection, AcademicScheduleSelection } from './blocks';
import { useResumenPreseleccion } from '@/pages/processes/pages/subject-preselection/hooks/useOfertaPreseleccion';
import { useResumenSeleccion } from '@/pages/processes/pages/subject-selection/hooks/useOfertaSeleccion';
import { getFase } from '@/services/periodoconfig/peridoconfig.service';
import { useAuthContext } from '@/auth';
import { formatTime } from '@/utils/timeFormat';
import { useUserData, usePeriodoActivo } from '@/hooks';
import { StudentData } from '@/interfaces/user';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Transformar datos de oferta al formato que espera el PDF
const transformScheduleData = (oferta: any[]) => {
  return oferta.flatMap((subj) =>
    subj.secciones.map((sec: any) => {
      const dias = {
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: ''
      };

      sec.horarios.forEach((horario: any) => {
        const timeRange = `${formatTime(horario.horaInicio)}-${formatTime(horario.horaFin)}`;
        const dia = horario.dia.toLowerCase();
        if (dia === 'lunes') dias.lunes = timeRange;
        else if (dia === 'martes') dias.martes = timeRange;
        else if (dia === 'miercoles') dias.miercoles = timeRange;
        else if (dia === 'jueves') dias.jueves = timeRange;
        else if (dia === 'viernes') dias.viernes = timeRange;
        else if (dia === 'sabado') dias.sabado = timeRange;
      });

      return {
        seccion: subj.asignaturaId,
        asignatura: subj.asignatura.toUpperCase(),
        creditos: subj.creditos ?? 0,
        profesor: sec.profesor.toUpperCase(),
        aula: sec.horarios[0]?.aula || 'N/A',
        ...dias
      };
    })
  );
};

const AcademicSchedulePage = () => {
  const { auth } = useAuthContext();
  const usuarioId = String(auth?.usuarioId);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [faseActual, setFaseActual] = useState<string>('');
  const [pdfData, setPdfData] = useState<{
    studentData: Partial<StudentData>;
    scheduleData: any[];
    scheduleType: 'Preseleccion' | 'Seleccion';
    trimester: string;
  } | null>(null);

  // Obtener datos del usuario
  const { data: userData } = useUserData();

  // Obtener periodo activo
  const { data: periodoActivo } = usePeriodoActivo();

  // Obtener datos de preselección
  const { data: resumenPreseleccion } = useResumenPreseleccion(usuarioId);

  // Obtener datos de selección
  const { data: resumenSeleccion } = useResumenSeleccion(usuarioId);

  // Obtener la fase actual al montar el componente
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
  // Filtrar solo las asignaturas definitivas en selección
  const ofertaSeleccion = (resumenSeleccion?.resumen || []).filter(
    (asig) => asig.definitiva === true
  );

  const currentOferta = faseActual === 'Preseleccion' ? ofertaPreseleccion : ofertaSeleccion;
  const hasScheduleData = currentOferta.length > 0;

  const handleOpenMap = () => {
    setShowMapModal(true);
  };

  const handleCloseMap = () => {
    setShowMapModal(false);
  };

  const handlePreviewPDF = () => {
    const currentOferta = faseActual === 'Preseleccion' ? ofertaPreseleccion : ofertaSeleccion;
    const scheduleData = transformScheduleData(currentOferta);

    const studentData = {
      idUsuario: userData?.idUsuario || Number(auth?.usuarioId) || 0,
      nombre: userData?.nombre || auth?.nombreUsuario?.split(' ')[0] || 'ESTUDIANTE',
      apellido: userData?.apellido || auth?.nombreUsuario?.split(' ').slice(1).join(' ') || '',
      nombreProgramaAcademico: userData?.nombreProgramaAcademico || 'PROGRAMA NO DISPONIBLE'
    };

    setPdfData({
      studentData,
      scheduleData,
      scheduleType: faseActual === 'Preseleccion' ? 'Preseleccion' : 'Seleccion',
      trimester: periodoActivo
        ? `${periodoActivo.codigo || ''} ${periodoActivo.nombre || ''}`.trim()
        : 'Periodo no disponible'
    });
    setShowPDFPreview(true);
  };

  return (
    <Container width="fluid">
      <Toolbar>
        <ToolbarHeading
          title="Horario asignaturas"
          description="Aqui puedes visualizar tu horario académico de preselección o selección"
        />
        <ToolbarActions>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 flex items-center gap-2 flex-1">
            <KeenIcon icon="information-1" className="text-yellow-400 text-lg shrink-0" />
            <span className="text-sm text-yellow-800 flex-1">
              <span className="font-medium">¿No encuentra su edificio?</span> Consulte el mapa del
              campus y oriéntese fácilmente.
            </span>
            <Button
              variant="outline"
              size="sm"
              className="text-yellow-700 border-yellow-300 hover:bg-yellow-100 hover:text-yellow-700 text-sm px-2 py-1 shrink-0"
              onClick={handleOpenMap}
            >
              <KeenIcon icon="geolocation" className="text-yellow-700 text-sm mr-1" />
              Ver mapa del campus
            </Button>
          </div>

          <Button
            title="Botón para ver preview del PDF"
            variant="outline"
            onClick={handlePreviewPDF}
            disabled={!hasScheduleData}
            className="shrink-0"
          >
            <KeenIcon icon="exit-up" />
            Exportar
          </Button>
        </ToolbarActions>
      </Toolbar>

      <div className="grid gap-5 lg:gap-7.5">
        {faseActual === 'Preseleccion' && (
          <AcademicSchedulePreselection oferta={ofertaPreseleccion} />
        )}
        {faseActual !== 'Preseleccion' && faseActual !== '' && (
          <AcademicScheduleSelection oferta={ofertaSeleccion} />
        )}
      </div>

      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 p-4" onClick={handleCloseMap}>
          <div
            className="relative max-w-6xl w-full h-full mx-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <button
                onClick={handleCloseMap}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all shadow-lg"
              >
                <KeenIcon icon="cross" className="text-gray-700 text-xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-2xl">
              <img
                src="/onsightlens/intec/media/images/600x400/intec-campus-map.jpg"
                alt="Mapa del Campus INTEC"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de preview del PDF */}
      <Dialog open={showPDFPreview} onOpenChange={setShowPDFPreview}>
        <DialogContent className="max-w-[50vw] max-h-[95vh] h-[95vh] p-0" hideClose>
          <div className="flex-1 bg-white overflow-hidden h-full">
            <div className="px-6 py-1 border-b bg-gray-800"></div>
            {pdfData && (
              <PDFViewer width="100%" height="100%" showToolbar={true}>
                <AcademicSchedulePDF
                  studentData={pdfData.studentData as StudentData}
                  scheduleData={pdfData.scheduleData}
                  scheduleType={pdfData.scheduleType}
                  trimester={pdfData.trimester}
                />
              </PDFViewer>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export { AcademicSchedulePage };

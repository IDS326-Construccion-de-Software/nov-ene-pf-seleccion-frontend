import {useState} from 'react';
import { Container, KeenIcon } from '@/components';
import { Toolbar, ToolbarHeading, ToolbarActions } from '@/layouts/applayout/toolbar';
import {Button} from '@/components/ui/button';
import { pdf } from '@react-pdf/renderer';
import AcademicSchedulePDF from '@/components/pdf/AcademicSchedulePDF';

const AcademicSchedulePage = () => {
  const [showSchedule, setShowSchedule] = useState(true);
  const [showMapModal, setShowMapModal] = useState(false);

  const handleOpenMap = () => {
    setShowMapModal(true);
  };

  const handleCloseMap = () => {
    setShowMapModal(false);
  };

  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(<AcademicSchedulePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Horario_Academico_INTEC.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generando el PDF:', error);
    }
  };

  return (
    <Container>
      <Toolbar>
        <ToolbarActions>
          {/* Banner de notificación en la izquierda */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 flex items-center gap-2 max-w-5xl">
            <KeenIcon icon="information-1" className="text-yellow-400 text-lg" />
            <span className="text-sm text-yellow-800">
              <span className="font-medium">¿No encuentra su edificio?</span>
              <span className="font-normal"> Consulte el mapa del campus y oriéntese fácilmente.</span>
            </span>
            <Button variant="outline" size="sm" className="text-yellow-700 border-yellow-300 hover:bg-yellow-100 hover:text-yellow-700 ml-1 text-sm px-2 py-1" onClick={handleOpenMap}>
              <KeenIcon icon="geolocation" className="text-yellow-700 text-sm mr-1" />
              Ver mapa del campus
            </Button>
          </div>
        </ToolbarActions>
        
        <ToolbarActions>
          {/* Botón para descargar como PDF */}
          <Button variant="outline" onClick={handleDownloadPDF}>
            <KeenIcon icon="file-down" />
            Descargar como PDF
          </Button>
        </ToolbarActions>
      </Toolbar>

      {/* Tabla de horario */}
      {showSchedule && (
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header de la tabla */}
            <div className="grid grid-cols-[120px_200px_55px_200px_95px_82px_80px_98px_82px_85px_80px] bg-gray-50 border-b border-gray-200">
              <div className="px-4 py-3 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Sección</div>
              <div className="px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">Asignatura</div>
              <div className="px-4 py-3 text-sm font-medium text-gray-700 text-center border-r border-gray-200">CR</div>
              <div className="px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">Profesor</div>
              <div className="px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">Aula</div>
              <div className="px-4 py-3 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Lunes</div>
              <div className="px-4 py-3 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Martes</div>
              <div className="px-4 py-3 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Miércoles</div>
              <div className="px-4 py-3 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Jueves</div>
              <div className="px-4 py-3 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Viernes</div>
              <div className="px-4 py-3 text-sm font-medium text-gray-700 text-center">Sábado</div>
            </div>
            
            {/* Filas de datos */}
            <div className="divide-y divide-gray-200">
              <div className="grid grid-cols-[120px_200px_55px_200px_95px_82px_80px_98px_82px_85px_80px] hover:bg-gray-25 transition-colors">
                <div className="px-4 py-3 text-sm text-gray-600 text-center font-medium border-r border-gray-200">ADM315-01</div>
                <div className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Administración y Gestión Empresarial</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">4</div>
                <div className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Marcos Sánchez Martínez</div>
                <div className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">GC314</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">9/11</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">9/11</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center"></div>
              </div>
              
              <div className="grid grid-cols-[120px_200px_55px_200px_95px_82px_80px_98px_82px_85px_80px] hover:bg-gray-25 transition-colors">
                <div className="px-4 py-3 text-sm text-gray-600 text-center font-medium border-r border-gray-200">ICS320-02</div>
                <div className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Fundamentos de Ciberseguridad</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">2</div>
                <div className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Buenaventura Matos Vega</div>
                <div className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">AJ404</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">14/16</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center"></div>
              </div>
              
              <div className="grid grid-cols-[120px_200px_55px_200px_95px_82px_80px_98px_82px_85px_80px] hover:bg-gray-25 transition-colors">
                <div className="px-4 py-3 text-sm text-gray-600 text-center font-medium border-r border-gray-200">IDS339-02</div>
                <div className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Devops y Devsecops</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">3</div>
                <div className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Mateo Lluberes Valdez</div>
                <div className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">FD411</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">11/13</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">11/12</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center"></div>
              </div>
              
              <div className="grid grid-cols-[120px_200px_55px_200px_95px_82px_80px_98px_82px_85px_80px] hover:bg-gray-25 transition-colors">
                <div className="px-4 py-3 text-sm text-gray-600 text-center font-medium border-r border-gray-200">IDS352-01</div>
                <div className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Anteproyecto de Grado</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">4</div>
                <div className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">Francia de los Santos Rosario</div>
                <div className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">EL304</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">9/13</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center"></div>
              </div>
              
              <div className="grid grid-cols-[120px_200px_55px_200px_95px_82px_80px_98px_82px_85px_80px] hover:bg-gray-25 transition-colors">
                <div className="px-4 py-3 text-sm text-gray-600 text-center font-medium border-r border-gray-200">IDS353-01</div>
                <div className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Pasantía Profesional I</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">2</div>
                <div className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">María Elena Portilla Venegas</div>
                <div className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">FD405</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">18/20</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center"></div>
              </div>
              
              <div className="grid grid-cols-[120px_200px_55px_200px_95px_82px_80px_98px_82px_85px_80px] hover:bg-gray-25 transition-colors">
                <div className="px-4 py-3 text-sm text-gray-600 text-center font-medium border-r border-gray-200">IDS354-01</div>
                <div className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">Gestión de la Ingeniería de Software</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200">3</div>
                <div className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">José Antonio Márquez Valente</div>
                <div className="px-4 py-3 text-sm text-gray-600 border-r border-gray-200">VIRTU</div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center border-r border-gray-200"></div>
                <div className="px-4 py-3 text-sm text-gray-600 text-center">8/11</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal del mapa del campus */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 p-4" onClick={handleCloseMap}>
          <div className="relative max-w-6xl w-full h-full mx-auto flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header con botón de cerrar */}
            <div className="flex justify-end mb-2">
              <button
                onClick={handleCloseMap}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all shadow-lg"
              >
                <KeenIcon icon="cross" className="text-gray-700 text-xl" />
              </button>
            </div>
            
            {/* Container de la imagen con scroll */}
            <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-2xl">
              <img 
                src="/onsightlens/intec/media/images/600x400/intec-campus-map.jpeg"
                alt="Mapa del Campus INTEC"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export { AcademicSchedulePage };

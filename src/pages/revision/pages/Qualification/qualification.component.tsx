import {useState} from 'react';
import { Container, KeenIcon } from '@/components';
import { Toolbar, ToolbarHeading, ToolbarActions } from '@/layouts/applayout/toolbar';
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import { pdf } from '@react-pdf/renderer';
import MidtermGradesPDF from '@/components/pdf/MidtermGradesPDF';
import FinalGradesPDF from '@/components/pdf/FinalGradesPDF';

interface GPACardProps {
  value: number;
  title: string;
  condition: string;
}

const QualificationPage = () => {
  const currentYear = new Date().getFullYear();
  const [selectedTrimester, setSelectedTrimester] = useState("agostoOctubre");
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedType, setSelectedType] = useState("medioTermino");
  const [showQualifications, setShowQualifications] = useState(false);
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [revisionReason, setRevisionReason] = useState("");

  // Datos de calificaciones finales - estos son los que se muestran en pantalla Y en el PDF
  const finalGradesData = [
    {
      clave: "ECO322",
      seccion: "01",
      asignatura: "Economía de Empresa",
      calificacion: "A", 
      creditos: 4,
      puntos: 16.0
    },
    {
      clave: "IDS328",
      seccion: "01", 
      asignatura: "Administración de Configuración",
      calificacion: "A",
      creditos: 4,
      puntos: 16.0
    },
    {
      clave: "IDS328L",
      seccion: "01",
      asignatura: "Laboratorio de Administración de Configuración", 
      calificacion: "A",
      creditos: 1,
      puntos: 4.0
    },
    {
      clave: "IDS330",
      seccion: "01",
      asignatura: "Inteligencia Artificial",
      calificacion: "A",
      creditos: 3,
      puntos: 12.0
    },
    {
      clave: "IDS330L",
      seccion: "01",
      asignatura: "Laboratorio de Inteligencia Artificial",
      calificacion: "B", 
      creditos: 1,
      puntos: 3.0
    },
    {
      clave: "IDS350",
      seccion: "01",
      asignatura: "Consejería Profesional Ingeniería de Software II",
      calificacion: "A",
      creditos: 0,
      puntos: 0.0
    },
    {
      clave: "IDS351",
      seccion: "01", 
      asignatura: "Pruebas de Software",
      calificacion: "A",
      creditos: 2,
      puntos: 8.0
    },
    {
      clave: "IDS373",
      seccion: "01",
      asignatura: "Sistemas Operativos",
      calificacion: "A",
      creditos: 4,
      puntos: 16.0
    },
    {
      clave: "IDS373L",
      seccion: "01",
      asignatura: "Laboratorio Sistemas Operativos",
      calificacion: "A",
      creditos: 1,
      puntos: 4.0
    }
  ];

  // Datos de calificaciones de medio término
  const midtermGradesData = [
    {
      clave: "ECO322",
      asignatura: "Economía de Empresa",
      creditos: 4,
      calificacion: 81.5,
      base: "B+"
    },
    {
      clave: "IDS328",
      asignatura: "Administración de Configuración", 
      creditos: 4,
      calificacion: 90.0,
      base: "A"
    },
    {
      clave: "IDS328L",
      asignatura: "Laboratorio de Administración de Configuración",
      creditos: 1,
      calificacion: 92.5,
      base: "A"
    },
    {
      clave: "IDS330",
      asignatura: "Inteligencia Artificial",
      creditos: 3,
      calificacion: 86.5,
      base: "B+"
    },
    {
      clave: "IDS330L",
      asignatura: "Laboratorio de Inteligencia Artificial",
      creditos: 1,
      calificacion: 77.5,
      base: "C+"
    },
    {
      clave: "IDS350",
      asignatura: "Consejería Profesional Ingeniería de Software II",
      creditos: 0,
      calificacion: 87.5,
      base: "B+"
    },
    {
      clave: "IDS351",
      asignatura: "Pruebas de Software",
      creditos: 2,
      calificacion: 89.0,
      base: "B+"
    },
    {
      clave: "IDS373",
      asignatura: "Sistemas Operativos", 
      creditos: 4,
      calificacion: 93.5,
      base: "A"
    },
    {
      clave: "IDS373L",
      asignatura: "Laboratorio Sistemas Operativos",
      creditos: 1,
      calificacion: 87.5,
      base: "B+"
    }
  ];

  // Esto es para poder manejar el cambio de tipo de calificación
  const handleTypeChange = (newType: string) => {
    setSelectedType(newType);
    setShowQualifications(false); // Va a resetear el reporte al cambiar el tipo de calificación
  };

  // Generar el reporte
  const handleGenerateReport = () => {
    setShowQualifications(true);
  };

  // Manejar solicitud de revisión
  const handleRevisionRequest = () => {
    setShowRevisionModal(true);
  };

  const handleSubmitRevision = () => {
    console.log('Materia:', selectedSubject, 'Motivo:', revisionReason);
    setShowRevisionModal(false);
    setSelectedSubject("");
    setRevisionReason("");
  };

  // Función para generar el texto del trimestre basado en la selección
  const generateTrimesterText = () => {
    const trimesterMap: { [key: string]: string } = {
      "febreroAbril": "Febrero - Abril",
      "mayoJulio": "Mayo - Julio", 
      "agostoOctubre": "Agosto - Octubre",
      "noviembreEnero": "Noviembre - Enero"
    };
    
    if (selectedTrimester === "noviembreEnero") {
      return `Noviembre ${selectedYear} - Enero ${parseInt(selectedYear) + 1}`;
    }
    
    return `${trimesterMap[selectedTrimester]} ${selectedYear}`;
  };

  // Manejar descarga de PDF
  const handleDownloadPDF = async () => {
    // REGLA 1: No hacer nada si no se ha generado un reporte
    if (!showQualifications) {
      console.log('No hay reporte generado para descargar');
      return;
    }

    try {
      let pdfComponent;
      let fileName;

      // REGLA 2: PDFs diferentes según el tipo de calificación
      if (selectedType === 'medioTermino') {
        pdfComponent = (
          <MidtermGradesPDF 
            studentData={{
              id: "1077546",
              name: "ISMAEL MARTÍNEZ", 
              program: "(IDS 2020) INGENIERÍA DE SOFTWARE (IDS)",
              trimester: generateTrimesterText()
            }}
            gradesData={midtermGradesData}
          />
        );
        fileName = 'Calificaciones_Medio_Termino_INTEC.pdf';
      } else {
        pdfComponent = (
          <FinalGradesPDF 
            studentData={{
              id: "1077546",
              name: "ISMAEL MARTÍNEZ",
              program: "(IDS 2020) INGENIERÍA DE SOFTWARE (IDS)", 
              trimester: generateTrimesterText(),
              previousCredits: 114,
              previousPoints: 427.5,
              previousGPA: 3.75
            }}
            gradesData={finalGradesData}
            academicCycles={{
              propeudeutico: 46,
              formativo: 49,
              profesional: 38
            }}
          />
        );
        fileName = 'Calificaciones_Finales_INTEC.pdf';
      }

      const blob = await pdf(pdfComponent).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generando el PDF:', error);
    }
  };

  //Esto me genera un array con los últimos 7 años, o sea el año actual 
  // y los 6 anteriores porque la permanencia máxima en INTEC es de
  // unos 6 años (25 trimestres)
  const years = Array.from({ length: 7 }, (_, i) => currentYear - i);

  // Función para renderizar la tarjeta de GPA con círculo de progreso
  const gpaCard = ({ value, title, condition }: GPACardProps) => {
  const percentage = (value / 4.0) * 100;
  const strokeDasharray = 2 * Math.PI * 30; // Radio de 30
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 w-60">
      <h3 className="text-sm font-medium mb-1 text-center flex items-center justify-center gap-1">
        <KeenIcon icon="chart-pie-simple" className="text-red-500 text-sm" />
        {title}
      </h3>
      <div className="relative w-20 h-20 mx-auto">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40" cy="40" r="30"
            stroke="#e5e7eb" strokeWidth="6"
            fill="transparent"
            
          />
          <circle
            cx="40" cy="40" r="30"
            stroke="#e74c3c" strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-bold text-gray-900">{value.toFixed(2)}</span>
        </div>
      </div>
      {condition && (
        <div className="text-center mt-1">
          <span className="text-xs font-medium">Condición - </span>
          <span className="text-xs text-gray-600">{condition}</span>
        </div>
      )}
    </div>
  );
};

  //Lógica para mostrar la tabla de calificaciones de medio término
  const renderMedioTerminoTable = () => {
    return (
    <div className="mt-5">
          {/* La tabla con el diseño de mi prototipado en Figma */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header de la tabla */}
            <div className="grid grid-cols-[100px_1fr_100px_120px_100px] bg-gray-50 border-b border-gray-200">
              <div className="px-6 py-4 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Clave</div>
              <div className="px-6 py-4 text-sm font-medium text-gray-700 border-r border-gray-200">Asignatura</div>
              <div className="px-6 py-4 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Créditos</div>
              <div className="px-6 py-4 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Calificación</div>
              <div className="px-6 py-4 text-sm font-medium text-gray-700 text-center">Base</div>
            </div>
            
            {/* Filas de datos - ahora dinámicas */}
            <div className="divide-y divide-gray-200">
              {midtermGradesData.map((grade, index) => (
                <div key={index} className="grid grid-cols-[100px_1fr_100px_120px_100px] hover:bg-gray-25 transition-colors">
                  <div className="px-6 py-4 text-sm text-gray-600 text-center font-medium border-r border-gray-200">{grade.clave}</div>
                  <div className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{grade.asignatura}</div>
                  <div className="px-6 py-4 text-sm text-gray-600 text-center border-r border-gray-200">{grade.creditos}</div>
                  <div className="px-6 py-4 text-sm text-gray-900 text-center font-semibold border-r border-gray-200">{grade.calificacion.toFixed(1)}</div>
                  <div className="px-6 py-4 text-sm text-gray-600 text-center">{grade.base}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Botón limpiar reporte */}
          <div className="flex justify-end mt-4">
            <Button variant="ghost" size="sm" onClick={() => setShowQualifications(false)}>
              Limpiar Reporte
            </Button>
          </div>
        </div>
    );
  };

  const renderFinalesTable = () => {
    return (
    <div className="flex items-start gap-10">
      <div className="w-fit">
          {/* La tabla con el diseño de mi prototipado en Figma */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header de la tabla */}
            <div className="grid grid-cols-[100px_400px_100px_120px_80px] bg-gray-50 border-b border-gray-200">
              <div className="px-6 py-4 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Clave</div>
              <div className="px-6 py-4 text-sm font-medium text-gray-700 border-r border-gray-200">Asignatura</div>
              <div className="px-6 py-4 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Créditos</div>
              <div className="px-6 py-4 text-sm font-medium text-gray-700 text-center border-r border-gray-200">Calificación</div>
              <div className="px-6 py-4 text-sm font-medium text-gray-700 text-center">Puntuación</div>
            </div>
            
            {/* Filas de datos - ahora dinámicas */}
            <div className="divide-y divide-gray-200">
              {finalGradesData.map((grade, index) => (
                <div key={index} className="grid grid-cols-[100px_400px_100px_120px_120px] hover:bg-gray-25 transition-colors">
                  <div className="px-6 py-4 text-sm text-gray-600 text-center font-medium border-r border-gray-200">{grade.clave}</div>
                  <div className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">{grade.asignatura}</div>
                  <div className="px-6 py-4 text-sm text-gray-600 text-center border-r border-gray-200">{grade.creditos}</div>
                  <div className="px-6 py-4 text-sm text-gray-900 text-center font-semibold border-r border-gray-200">{grade.calificacion}</div>
                  <div className="px-6 py-4 text-sm text-gray-600 text-center">{grade.puntos.toFixed(1)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className='flex flex-col space-y-5'>   

          <div className="card card-custom card-flush bg-yellow-50 border-yellow-200 w-65 mx-auto">
          <div className="card-body text-yellow-800 p-4 leading-tight text-sm">
          <h3 className="font-bold text-yellow-800 mb-1 flex items-center gap-2 text-sm">
            <KeenIcon icon="information-1" className="text-yellow-400 text-xl" />
            Recordatorio | Fecha Límite
          </h3>
           Usted puede solicitar la revisión de su calificación final hasta tres días después de su publicación.
          </div>
          </div>

          <Button variant="default" size="sm" onClick={handleRevisionRequest}>
              <KeenIcon icon="message-add" />
              Solicitar Revisión
          </Button>

          {/*Widgets de índices académicos*/}
          <div className="flex flex-col items-center space-y-4"> 
            {gpaCard({
              value: 3.43, 
              title: "Índice Trimestral", 
              condition: "Bueno" 
            })}
            {gpaCard({
              value: 3.21, 
              title: "Índice General", 
              condition: "Bueno" 
            })}
          </div>

          {/* Botón limpiar reporte */}
          <div className="flex justify-end mt-4">
            <Button variant="ghost" size="sm" onClick={() => setShowQualifications(false)}>
              Limpiar Reporte
            </Button>
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <Container>
      <Toolbar>
        <ToolbarActions>
      {/*IZQUIERDA*/}
      {/*Dropdown de filtros por trimestre*/}
      <Select value={selectedTrimester} onValueChange={setSelectedTrimester}>
        <SelectTrigger className="w-[170px] text-sm">
          <SelectValue placeholder="Seleccionar trimestre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="febreroAbril">Febrero - Abril</SelectItem>
          <SelectItem value="mayoJulio">Mayo - Julio</SelectItem>
          <SelectItem value="agostoOctubre">Agosto - Octubre</SelectItem>
          <SelectItem value="noviembreEnero">Noviembre - Enero</SelectItem>
        </SelectContent>
      </Select>
            
      {/* Dropdown de filtro por año*/}
      <Select value={selectedYear} onValueChange={setSelectedYear}>
        <SelectTrigger className="w-[80px] text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Botón de generar reporte */}
      <Button variant="default" onClick={handleGenerateReport}>
        <KeenIcon icon="document" /*className="me-2"*//>
        Generar Reporte
      </Button>
        </ToolbarActions>

        <ToolbarActions>
      {/*DERECHA*/}
      {/*Dropdown de filtro por tipo de calificación*/}
      <Select value={selectedType} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[150px] text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="medioTermino">Medio Término</SelectItem>
          <SelectItem value="finales">Finales</SelectItem>
        </SelectContent>
      </Select>

      {/* Botón para descargar como PDF */}
      <Button variant="outline" onClick={handleDownloadPDF}>
        <KeenIcon icon="file-down" /*className="me-2"*//>
        Descargar como PDF
      </Button>    
        </ToolbarActions>
      </Toolbar>

      {/* Contenido condicional */}
      {!showQualifications ? (
        // Estado inicial - No se ha hecho clic en el botón para generar el reporte
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-600">No se ha generado ningún reporte.</p>
          </div>
        </div>
      ) : selectedType === "finales" ? (
        // Estado con calificaciones finales generadas
        renderFinalesTable()
      ) : (
        // Estado con calificaciones de Medio Término generadas
        renderMedioTerminoTable()
      )}  

      {/* Modal de solicitud de revisión */}
      {showRevisionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 max-w-md mx-4 relative">
            {/* Botón cerrar */}
            <button 
              onClick={() => setShowRevisionModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <KeenIcon icon="cross" className="text-xl" />
            </button>
            
            {/* Título */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Solicitar Revisión</h2>
            
            {/* Formulario */}
            <div className="space-y-4">
              {/* Dropdown de materia */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Materia
                </label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar materia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ECO322">ECO322 - Economía de Empresa</SelectItem>
                    <SelectItem value="IDS328">IDS328 - Administración de Configuración</SelectItem>
                    <SelectItem value="IDS330">IDS330 - Inteligencia Artificial</SelectItem>
                    <SelectItem value="IDS351">IDS351 - Pruebas de Software</SelectItem>
                    <SelectItem value="IDS373">IDS373 - Sistemas Operativos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Textbox de motivo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivo de la revisión
                </label>
                <textarea
                  value={revisionReason}
                  onChange={(e) => setRevisionReason(e.target.value)}
                  placeholder="Describe el motivo de tu solicitud de revisión..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              {/* Botón enviar */}
              <div className="flex justify-end pt-2">
                <Button 
                  onClick={handleSubmitRevision}
                  disabled={!selectedSubject || !revisionReason.trim()}
                  className="px-6"
                >
                  <KeenIcon icon="send" className="mr-2" />
                  Enviar Solicitud
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </Container>
  );
};

export { QualificationPage };

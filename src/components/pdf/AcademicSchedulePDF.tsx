import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Datos de muestra del horario académico
const scheduleData = [
  {
    seccion: "ADM315-01",
    asignatura: "ADMINISTRACIÓN Y GESTIÓN EMPRESARIAL",
    creditos: 4,
    profesor: "MARCOS SÁNCHEZ MARTÍNEZ", 
    aula: "GC314",         
    lunes: "9/11",
    martes: "",
    miercoles: "9/11",
    jueves: "",
    viernes: "",
    sabado: "" 
  },
  {
    seccion: "ICS320-02",
    asignatura: "FUNDAMENTOS DE CIBERSEGURIDAD",
    creditos: 2,
    profesor: "BUENAVENTURA MATOS VEGA",
    aula: "AJ404",      
    lunes: "",
    martes: "14/16",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "" 
  },
  {
    seccion: "IDS339-02",
    asignatura: "DEVOPS Y DEVSECOPS",
    creditos: 3,
    profesor: "MATEO LLUBERES VALDEZ",
    aula: "FD411",      
    lunes: "",
    martes: "",
    miercoles: "11/13",
    jueves: "",
    viernes: "11/12",
    sabado: "",
  },
  {
    seccion: "IDS352-01",
    asignatura: "ANTEPROYECTO DE GRADO",
    creditos: 4,
    profesor: "FRANCIA DE LOS SANTOS ROSARIO",
    aula: "FD411",      
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "9/13",
    viernes: "",
    sabado: "",
  },
  {
    seccion: "IDS353-01",
    asignatura: "PASANTÍA PROFESIONAL I",
    creditos: 2,
    profesor: "MARÍA ELENA PORTILLA VENEGAS",
    aula: "FD405",      
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "18/20",
    sabado: "",
  },
  {
    seccion: "IDS354-01",
    asignatura: "GESTIÓN DE LA INGENIERÍA DE SOFTWARE",
    creditos: 3,
    profesor: "JOSÉ ANTONIO MÁRQUEZ VALENTE",
    aula: "VIRTU",      
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "8/11",
  }
];

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid black',
    paddingBottom: 10,
  },
  institutionName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  headerTextBold: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  studentInfo: {
    marginBottom: 15,
    borderBottom: '1 solid black',
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  label: {
    fontWeight: 'bold',
    width: 80,
  },
  value: {
    flex: 1,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderTop: '1 solid black',
    borderLeft: '1 solid black',
    borderRight: '1 solid black',
    borderBottom: '1 solid black',
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  tableRow: {
    flexDirection: 'row',
    //borderLeft: '1 solid black',
    //borderRight: '1 solid black',
    //borderBottom: '1 solid black',
    paddingVertical: 8,
    paddingHorizontal: 2,
    minHeight: 35,
    alignItems: 'center',
  },
  col1: { width: '10%', paddingRight: 6, paddingLeft: 6 }, // Sección
  col2: { width: '23%', paddingRight: 4, paddingLeft: 6 }, // Asignatura
  col3: { width: '4%',  paddingRight: 8, paddingLeft: 6 }, // CR
  col4: { width: '20%', paddingRight: 6, paddingLeft: 8 }, // Profesor
  col5: { width: '8%', paddingRight: 6, paddingLeft: 4 }, // Aula  
  col6: { width: '6%',  paddingRight: 6, paddingLeft: 6 }, // Lunes
  col7: { width: '6%',  paddingRight: 6, paddingLeft: 6 }, // Martes
  col8: { width: '6%',  paddingRight: 6, paddingLeft: 6 }, // Miércoles
  col9: { width: '6%',  paddingRight: 6, paddingLeft: 6 }, // Jueves
  col10: { width: '5%', paddingRight: 6, paddingLeft: 6 }, // Viernes
  col11: { width: '4%', paddingRight: 6, paddingLeft: 6 }, // Sábado
  
  headerText: {
    fontWeight: 'bold',
    fontSize: 9,
    textAlign: 'left',
  },
  cellText: {
    fontSize: 8,
    textAlign: 'center',
    lineHeight: 1.2,
  },
  cellTextLeft: {
    fontSize: 8,
    textAlign: 'left',
    lineHeight: 1.2,
  },
  /*cellTextSmall: {
    fontSize: 7,
    textAlign: 'left',
    lineHeight: 1.1,
  },*/
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerSection: {
    flex: 1,
  },
  footerLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  observations: {
    marginTop: 50,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
  },
  observationsTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 5,
  },
  observationsText: {
    fontSize: 9,
    lineHeight: 1.3,
    textAlign: 'justify',
  }
});

interface ScheduleData {
  seccion: string;
  asignatura: string;
  creditos: number; 
  profesor: string; 
  aula: string;  
  lunes: string;
  martes: string;
  miercoles: string;
  jueves: string;
  viernes: string;
  sabado: string;
}

interface AcademicSchedulePDFProps {
  studentData?: {
    id: string;
    name: string;
    program: string;
    trimester: string;
  };
  scheduleData?: ScheduleData[];
}

const AcademicSchedulePDF: React.FC<AcademicSchedulePDFProps> = ({ 
  studentData = {
    id: "1077546",
    name: "ISMAEL MARTÍNEZ",
    program: "(IDS 2020) INGENIERÍA DE SOFTWARE (IDS)",
    trimester: "Noviembre 2025 - Enero 2026"
  }, 
  scheduleData: propScheduleData = scheduleData 
}) => {    
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit'
  });

  const currentTime = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const totalCredits = propScheduleData.reduce((sum, course) => sum + course.creditos, 0);
  const theorySubjects = propScheduleData.filter(course => !course.asignatura.toLowerCase().includes('laboratorio')).length;
  const labSubjects = propScheduleData.filter(course => course.asignatura.toLowerCase().includes('laboratorio')).length;

  return (
    <Document>
      <Page size="A4" orientation="portrait" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.institutionName}>Instituto Tecnológico de Santo Domingo</Text>
          <View style={styles.headerInfo}>
            <Text>Dirección de Registro</Text>
            <Text>
              <Text style={styles.headerTextBold}>Fecha de Impresión: </Text>
              <Text>{currentDate} {currentTime}</Text>
            </Text>
          </View>
          <View style={styles.headerInfo}>
            <Text>Volante de selección</Text>
            <Text>
              <Text style={styles.headerTextBold}>Página: </Text>
              <Text>1 de 1</Text>
            </Text>
          </View>
          <Text>
            <Text>Trimestre: </Text>
            <Text style={styles.headerTextBold}>{studentData.trimester}</Text>
          </Text>
        </View>

        {/* Student Information */}
        <View style={styles.studentInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Estudiante</Text>
            <Text style={styles.value}>: ({studentData.id}) {studentData.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Programa</Text>
            <Text style={styles.value}>: {studentData.program}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.col1}><Text style={styles.headerText}>Sección</Text></View>
            <View style={styles.col2}><Text style={styles.headerText}>Asignatura</Text></View>
            <View style={styles.col3}><Text style={styles.headerText}>CR</Text></View>
            <View style={styles.col4}><Text style={styles.headerText}>Profesor</Text></View>   
            <View style={styles.col5}><Text style={styles.headerText}>Aula</Text></View>         
            <View style={styles.col6}><Text style={styles.headerText}>Lun</Text></View>
            <View style={styles.col7}><Text style={styles.headerText}>Mar</Text></View>
            <View style={styles.col8}><Text style={styles.headerText}>Mie</Text></View>
            <View style={styles.col9}><Text style={styles.headerText}>Jue</Text></View>
            <View style={styles.col10}><Text style={styles.headerText}>Vie</Text></View>
            <View style={styles.col11}><Text style={styles.headerText}>Sab</Text></View>            
          </View>

          {/* Table Rows */}
          {propScheduleData.map((course, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.col1}><Text style={styles.cellTextLeft}>{course.seccion}</Text></View>
              <View style={styles.col2}><Text style={styles.cellTextLeft}>{course.asignatura}</Text></View>
              <View style={styles.col3}><Text style={styles.cellText}>{course.creditos}</Text></View>
              <View style={styles.col4}><Text style={styles.cellTextLeft}>{course.profesor}</Text></View>              
              <View style={styles.col5}><Text style={styles.cellTextLeft}>{course.aula}</Text></View>
              <View style={styles.col6}><Text style={styles.cellTextLeft}>{course.lunes}</Text></View>
              <View style={styles.col7}><Text style={styles.cellTextLeft}>{course.martes}</Text></View>
              <View style={styles.col8}><Text style={styles.cellTextLeft}>{course.miercoles}</Text></View>
              <View style={styles.col9}><Text style={styles.cellTextLeft}>{course.jueves}</Text></View>
              <View style={styles.col10}><Text style={styles.cellTextLeft}>{course.viernes}</Text></View>
              <View style={styles.col11}><Text style={styles.cellTextLeft}>{course.sabado}</Text></View>              
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerSection}>
            <Text style={styles.footerLabel}>Asignaturas de Teoría: {theorySubjects}</Text>
            <Text style={styles.footerLabel}>Asignaturas de Laboratorio: {labSubjects}</Text>
            <Text style={styles.footerLabel}>Total de Asignaturas: {propScheduleData.length}</Text>
          </View>
          <View style={styles.footerSection}>
            <Text style={styles.footerLabel}>Total de Créditos: {totalCredits}</Text>
          </View>
        </View>

        {/* Observations */}
        <View style={styles.observations}>
          <Text style={styles.observationsTitle}>Observaciones:</Text>
          <Text style={styles.observationsText}>
            Ud. esta inscrito en las asignaturas y secciones que aparecen detalladas. Si no coinciden con su selección original, repórtelo inmediatamente a la Dirección de Registro. De lo contrario, usted solo aparecerá en las listas de estas asignaturas y secciones.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default AcademicSchedulePDF;
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { toAbsoluteUrl } from '@/utils/Assets';
import { StudentData } from '@/interfaces/user';
import { ColumnWidths, ScheduleData } from '@/interfaces/documents';

const LOGO_SUPERIOR = toAbsoluteUrl('/media/print-document/logo-superior.png');
const LOGO_PIE_PAGINA = toAbsoluteUrl('/media/print-document/Logo-Inferior.png');
const IMAGEN_FORJANDO_FUTURO = toAbsoluteUrl(
  '/media/print-document/imagen-forjando-futuro-hoy.png'
);

const defaultColumnWidths: ColumnWidths = {
  seccion: '9%',
  asignatura: '23%',
  creditos: '5%',
  profesor: '18%',
  aula: '10%',
  lunes: '8%',
  martes: '8%',
  miercoles: '8%',
  jueves: '8%',
  viernes: '8%',
  sabado: '8%'
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    position: 'relative'
  },
  redBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: '#C41E3A'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    fontSize: 9,
    color: '#666666'
  },
  metaColumn: {
    flexDirection: 'column',
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 0
  },
  logo: {
    width: 75,
    height: 48
  },
  intecBadge: {
    width: 160,
    height: 48
  },
  headerSection: {
    marginBottom: 20,
    borderBottom: '3 solid #E5E7EB',
    paddingBottom: 15
  },
  headerLabel: {
    fontSize: 11,
    color: '#6B7280',
    letterSpacing: 1,
    marginBottom: 5,
    textTransform: 'uppercase'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827'
  },
  headerTitleRed: {
    color: '#C41E3A'
  },
  trimesterBadge: {
    backgroundColor: '#374151',
    color: '#FFFFFF',
    padding: 8,
    borderRadius: 4,
    fontSize: 10,
    alignSelf: 'flex-start'
  },
  studentSection: {
    backgroundColor: '#FFFFFF',
    borderLeft: '2 solid #C41E3A',
    padding: 4
  },
  studentRow: {
    flexDirection: 'row'
  },
  studentLabel: {
    fontSize: 10,
    color: '#6B7280',
    width: 70,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  studentValue: {
    fontSize: 11,
    color: '#111827',
    fontWeight: 'bold',
    flex: 1
  },
  table: {
    marginTop: 10,
    marginBottom: 20,
    borderTop: '1 solid #000000',
    borderLeft: '1 solid #000000'
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    borderBottom: '1 solid #000000',
    borderRight: '1 solid #000000',
    alignItems: 'center'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #000000',
    borderRight: '1 solid #000000',
    minHeight: 25
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 7,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderRight: '1 solid #000000',
    paddingVertical: 6,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  cellText: {
    fontSize: 8,
    color: '#374151',
    borderRight: '1 solid #000000',
    paddingVertical: 10,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  cellTime: {
    fontSize: 7,
    color: '#C41E3A',
    fontWeight: 'bold',
    borderRight: '1 solid #000000',
    paddingVertical: 6,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  cellTextLast: {
    fontSize: 8,
    color: '#374151',
    paddingVertical: 6,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  cellTimeLast: {
    fontSize: 7,
    color: '#C41E3A',
    fontWeight: 'bold',
    paddingVertical: 6,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  textBold: {
    fontFamily: 'Helvetica-Bold'
  },
  summaryContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20
  },
  summaryBox: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 8,
    border: '1 solid #E5E7EB'
  },
  summaryLeft: {
    flex: 1
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  summaryLabel: {
    fontSize: 10,
    color: '#6B7280'
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827'
  },
  summaryValueRed: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C41E3A'
  },
  summaryRight: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  cargaLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  cargaValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center'
  },
  cargaValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#C41E3A',
    lineHeight: 1
  },
  cargaUnit: {
    fontSize: 16,
    color: '#9CA3AF',
    marginLeft: 4
  },
  observationsSection: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    paddingTop: 20,
    borderTop: '2 solid #F3F4F6'
  },
  observationsIcon: {
    width: 60,
    height: 60,
    marginRight: 15
  },
  observationsContent: {
    flex: 1
  },
  observationsTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#C41E3A',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8
  },
  observationsText: {
    fontSize: 9,
    color: '#4B5563',
    textAlign: 'justify',
    lineHeight: 1.5
  },
  sectionSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

interface AcademicSchedulePDFProps {
  studentData?: StudentData;
  scheduleData?: ScheduleData[];
  scheduleType?: 'Preseleccion' | 'Seleccion';
  trimester?: string;
  customWidths?: Partial<ColumnWidths>;
}

const AcademicSchedulePDF: React.FC<AcademicSchedulePDFProps> = ({
  studentData,
  scheduleData: propScheduleData = [],
  scheduleType = 'Preseleccion',
  trimester = 'Periodo no disponible',
  customWidths = {}
}) => {
  const widths = { ...defaultColumnWidths, ...customWidths };

  const currentDate = new Date().toLocaleDateString('es-DO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('es-DO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const totalCredits = propScheduleData.reduce((sum, course) => sum + course.creditos, 0);
  const theorySubjects = propScheduleData.filter(
    (course) => !course.asignatura.toLowerCase().includes('laboratorio')
  ).length;
  const labSubjects = propScheduleData.filter((course) =>
    course.asignatura.toLowerCase().includes('laboratorio')
  ).length;

  return (
    <Document>
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.redBar} />

        <View style={styles.headerContainer}>
          <View style={styles.logoSection}>
            <Image src={LOGO_SUPERIOR} style={styles.logo} />
            <Image src={IMAGEN_FORJANDO_FUTURO} style={styles.intecBadge} />
          </View>
          <View style={styles.metaInfo}>
            <View style={styles.metaColumn}>
              <Text>Fecha de Impresión:</Text>
              <Text>
                {currentDate} {currentTime}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.headerSection}>
          <Text style={styles.headerLabel}>DIRECCIÓN DE REGISTRO</Text>
          <View style={styles.sectionSchedule}>
            <Text style={styles.headerTitle}>
              <Text style={styles.headerTitleRed}>Horario</Text>
              <Text> - {scheduleType === 'Preseleccion' ? 'Preselección' : 'Selección'}</Text>
            </Text>
            <View style={styles.trimesterBadge}>
              <Text>{trimester}</Text>
            </View>
          </View>
        </View>

        <View style={styles.studentSection}>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>ESTUDIANTE</Text>
            <Text style={styles.studentValue}>
              ({studentData?.idUsuario || 'N/A'}) {studentData?.nombre || ''}{' '}
              {studentData?.apellido || ''}
            </Text>
          </View>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>PROGRAMA</Text>
            <Text style={styles.studentValue}>{studentData?.nombreProgramaAcademico || 'N/A'}</Text>
          </View>
        </View>

        {/* Tabla con anchos dinámicos */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { width: widths.seccion }]}>Sección</Text>
            <Text style={[styles.headerCell, { width: widths.asignatura }]}>Asignatura</Text>
            <Text style={[styles.headerCell, { width: widths.creditos }]}>Cr</Text>
            <Text style={[styles.headerCell, { width: widths.profesor }]}>Profesor</Text>
            <Text style={[styles.headerCell, { width: widths.aula }]}>Aula</Text>
            <Text style={[styles.headerCell, { width: widths.lunes }]}>Lun</Text>
            <Text style={[styles.headerCell, { width: widths.martes }]}>Mar</Text>
            <Text style={[styles.headerCell, { width: widths.miercoles }]}>Mie</Text>
            <Text style={[styles.headerCell, { width: widths.jueves }]}>Jue</Text>
            <Text style={[styles.headerCell, { width: widths.viernes }]}>Vie</Text>
            <Text style={[styles.headerCell, { width: widths.sabado }]}>Sab</Text>
          </View>
          {propScheduleData.map((course, index) => (
            <View key={index} style={styles.tableRow}>
              <Text
                style={[
                  styles.cellText,
                  { width: widths.seccion },
                  { fontWeight: 'bold', color: '#C41E3A' }
                ]}
              >
                {course.seccion}
              </Text>
              <Text style={[styles.cellText, { width: widths.asignatura }]}>
                {course.asignatura}
              </Text>
              <Text style={[styles.cellText, { width: widths.creditos, fontWeight: 'bold' }]}>
                {course.creditos}
              </Text>
              <Text style={[styles.cellText, { width: widths.profesor }]}>{course.profesor}</Text>
              <Text style={[styles.cellText, { width: widths.aula }]}>{course.aula}</Text>
              <Text
                style={[{ width: widths.lunes }, course.lunes ? styles.cellTime : styles.cellText]}
              >
                {course.lunes}
              </Text>
              <Text
                style={[
                  { width: widths.martes },
                  course.martes ? styles.cellTime : styles.cellText
                ]}
              >
                {course.martes}
              </Text>
              <Text
                style={[
                  { width: widths.miercoles },
                  course.miercoles ? styles.cellTime : styles.cellText
                ]}
              >
                {course.miercoles}
              </Text>
              <Text
                style={[
                  { width: widths.jueves },
                  course.jueves ? styles.cellTime : styles.cellText
                ]}
              >
                {course.jueves}
              </Text>
              <Text
                style={[
                  { width: widths.viernes },
                  course.viernes ? styles.cellTime : styles.cellText
                ]}
              >
                {course.viernes}
              </Text>
              <Text
                style={[
                  { width: widths.sabado },
                  course.sabado ? styles.cellTimeLast : styles.cellTextLast
                ]}
              >
                {course.sabado}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.summaryContainer}>
          <View style={[styles.summaryBox, styles.summaryLeft]}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Asig. de Teoría:</Text>
              <Text style={styles.summaryValue}>{theorySubjects}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Asig. de Laboratorio:</Text>
              <Text style={styles.summaryValue}>{labSubjects}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Asig. de Electiva:</Text>
              <Text style={styles.summaryValue}>0</Text>
            </View>
            <View
              style={[
                styles.summaryItem,
                { marginTop: 8, paddingTop: 8, borderTop: '1 solid #E5E7EB' }
              ]}
            >
              <Text style={[styles.summaryLabel, { fontWeight: 'bold' }]}>
                TOTAL DE ASIGNATURAS
              </Text>
              <Text style={styles.summaryValueRed}>{propScheduleData.length}</Text>
            </View>
          </View>
          <View style={[styles.summaryBox, styles.summaryRight]}>
            <Text style={styles.cargaLabel}>CARGA ACADÉMICA</Text>
            <View style={styles.cargaValueContainer}>
              <Text style={styles.cargaValue}>{totalCredits}</Text>
              <Text style={styles.cargaUnit}>Cr</Text>
            </View>
          </View>
        </View>

        <View style={styles.observationsSection}>
          <Image src={LOGO_PIE_PAGINA} style={styles.observationsIcon} />
          <View style={styles.observationsContent}>
            <Text style={styles.observationsTitle}>OBSERVACIONES IMPORTANTES</Text>
            <Text style={styles.observationsText}>
              Usted está inscrito en las asignaturas y secciones que aparecen detalladas. Si no
              coinciden con su selección original, repórtelo inmediatamente a la Dirección de
              Registro. De lo contrario, usted solo aparecerá en las listas de estas asignaturas y
              secciones.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default AcademicSchedulePDF;

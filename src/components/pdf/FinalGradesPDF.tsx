import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 10,
  },
  institutionName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    textAlign: 'right',
  },
  trimesterInfo: {
    marginTop: 5,
    marginBottom: 8,
  },
  horizontalSeparator: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    marginBottom: 15,
    paddingBottom: 10,
  },
  studentInfoBox: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    padding: 8,
  },
  studentRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  studentLabel: {
    fontWeight: 'bold',
    width: 60,
  },
  studentValue: {
    flex: 1,
  },
  previousSemesterBox: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    padding: 8,
  },
  previousSemesterTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 10,
  },
  previousSemesterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    padding: 4,
  },
  previousSemesterHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  previousSemesterData: {
    textAlign: 'center',
  },
  currentSemesterTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 10,
  },
  table: {
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  tableRow: {
    flexDirection: 'row',
    /*borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',*/
    paddingVertical: 3,
    paddingHorizontal: 2,
    minHeight: 20,
  },
  col1: { width: '12%', /*borderRightWidth: 1,*/ borderColor: 'black', paddingHorizontal: 2 }, // Clave
  col2: { width: '8%', /*borderRightWidth: 1,*/ borderColor: 'black', paddingHorizontal: 2 }, // Sec
  col3: { width: '50%', /*borderRightWidth: 1,*/ borderColor: 'black', paddingHorizontal: 2 }, // Asignatura
  col4: { width: '12%', /*borderRightWidth: 1,*/ borderColor: 'black', paddingHorizontal: 2 }, // Calificación
  col5: { width: '8%', /*borderRightWidth: 1,*/ borderColor: 'black', paddingHorizontal: 2 }, // CR
  col6: { width: '10%', paddingHorizontal: 2 }, // Puntos
  headerText: {
    fontWeight: 'bold',
    fontSize: 8,
    textAlign: 'center',
  },
  cellText: {
    fontSize: 7,
    textAlign: 'center',
    lineHeight: 1.2,
  },
  cellTextLeft: {
    fontSize: 7,
    textAlign: 'left',
    lineHeight: 1.2,
  },
  summaryContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  leftSummary: {
    flex: 0.7,
    marginRight: 8,
  },
  rightSummary: {
    flex: 1.3,
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 15.5,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  summaryTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 9,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  summaryLabel: {
    fontSize: 8,
  },
  summaryValue: {
    fontSize: 8,
  },
  summaryTable: {
    borderWidth: 1,
    borderColor: 'black',
  },
  summaryTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 4,
  },
  summaryTableRowLast: {
    flexDirection: 'row',
    borderBottomWidth: 0,
    borderColor: 'black',
    padding: 4,
  },
  summaryTableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  academicStatusBox: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 4,
    textAlign: 'center',
    marginTop: 5.5,
  },
  academicStatus: {
    fontWeight: 'bold',
    fontSize: 8.5,
    marginTop: 0.5,
  },
  observations: {
    marginTop: 3,
    borderWidth: 1,
    borderColor: 'black',
  },
  observationsTitle: {
    fontWeight: 'bold',
    fontSize: 9,
    marginBottom: 5,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  observationsContent: {
    padding: 8,
    minHeight: 40,
  }
});

interface FinalGradesData {
  clave: string;
  seccion: string;
  asignatura: string;
  calificacion: string;
  creditos: number;
  puntos: number;
}

interface FinalGradesPDFProps {
  studentData: {
    id: string;
    name: string;
    program: string;
    trimester: string;
    previousCredits?: number;
    previousPoints?: number;
    previousGPA?: number;
  };
  gradesData: FinalGradesData[];
  academicCycles?: {
    propeudeutico: number;
    formativo: number;
    profesional: number;
  };
}

const FinalGradesPDF: React.FC<FinalGradesPDFProps> = ({ 
  studentData,
  gradesData,
  academicCycles = {
    propeudeutico: 46,
    formativo: 49,
    profesional: 38
  }
}) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(/(\d{1,2})\/(\d{1,2})\/(\d{4}), (\d{1,2}):(\d{2}) (.*?)/, '$1/$2/$3 $4:$5 $6');

  const totalCredits = gradesData.reduce((sum, subject) => sum + subject.creditos, 0);
  const totalPoints = gradesData.reduce((sum, subject) => sum + subject.puntos, 0);
  const trimesterGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
  
  // Cálculos acumulados
  const accumulatedCredits = (studentData.previousCredits || 0) + totalCredits;
  const accumulatedPoints = (studentData.previousPoints || 0) + totalPoints;
  const accumulatedGPA = accumulatedCredits > 0 ? accumulatedPoints / accumulatedCredits : 0;

  // Cálculos para los ciclos
  const totalCycles = academicCycles.propeudeutico + academicCycles.formativo + academicCycles.profesional;

  return (
    <Document>
      <Page size="A4" orientation="portrait" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, styles.horizontalSeparator]}>
          <Text style={styles.institutionName}>Instituto Tecnológico de Santo Domingo</Text>
          <View style={styles.headerRow}>
            <Text style={styles.headerLeft}>Dirección de Registro</Text>
            <Text style={styles.headerRight}>
              <Text style={{ fontWeight: 'bold' }}>Fecha de Impresión : </Text>
              <Text>{currentDate}</Text>
            </Text>
          </View>
          <View style={styles.headerRow}>
            <Text style={styles.headerLeft}>Volante de calificaciones finales</Text>
            <Text style={styles.headerRight}>
              <Text style={{ fontWeight: 'bold' }}>Página : </Text>
              <Text>1 de 1</Text>
            </Text>
          </View>
          <Text style={styles.trimesterInfo}>
            <Text>Trimestre : </Text>
            <Text style={{ fontWeight: 'bold' }}>{studentData.trimester}</Text>
          </Text>
        </View>

        {/* Student Information */}
        <View style={styles.studentInfoBox}>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>ID</Text>
            <Text style={styles.studentValue}>: {studentData.id}</Text>
          </View>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>Nombre</Text>
            <Text style={styles.studentValue}>: {studentData.name}</Text>
          </View>
          <View style={styles.studentRow}>
            <Text style={styles.studentLabel}>Programa</Text>
            <Text style={styles.studentValue}>: {studentData.program}</Text>
          </View>
        </View>

        {/* Previous Semester Information */}
        <View style={styles.previousSemesterBox}>
          <Text style={styles.previousSemesterTitle}>Acumulados del Trimestre Anterior</Text>
          <View style={styles.previousSemesterRow}>
            <View style={[styles.previousSemesterHeader, { flex: 1 }]}>
              <Text>Créditos Acumulados</Text>
            </View>
            <View style={[styles.previousSemesterHeader, { flex: 1 }]}>
              <Text>Puntos Acumulados</Text>
            </View>
            <View style={[styles.previousSemesterHeader, { flex: 1 }]}>
              <Text>Índice Acumulado</Text>
            </View>
            <View style={[styles.previousSemesterHeader, { flex: 1 }]}>
              <Text>Condición Académica</Text>
            </View>
          </View>
          <View style={styles.previousSemesterRow}>
            <View style={[styles.previousSemesterData, { flex: 1 }]}>
              <Text>{studentData.previousCredits || 114}</Text>
            </View>
            <View style={[styles.previousSemesterData, { flex: 1 }]}>
              <Text>{studentData.previousPoints || 427.5}</Text>
            </View>
            <View style={[styles.previousSemesterData, { flex: 1 }]}>
              <Text>{studentData.previousGPA || 3.75}</Text>
            </View>
            <View style={[styles.previousSemesterData, { flex: 1 }]}>
              <Text>NORMAL</Text>
            </View>
          </View>
        </View>

        {/* Current Semester Grades */}
        <Text style={styles.currentSemesterTitle}>Calificaciones del Trimestre</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.col1}><Text style={styles.headerText}>Clave</Text></View>
            <View style={styles.col2}><Text style={styles.headerText}>Sec</Text></View>
            <View style={styles.col3}><Text style={styles.headerText}>Asignatura</Text></View>
            <View style={styles.col4}><Text style={styles.headerText}>Calificación</Text></View>
            <View style={styles.col5}><Text style={styles.headerText}>CR</Text></View>
            <View style={styles.col6}><Text style={styles.headerText}>Puntos</Text></View>
          </View>

          {/* Table Rows */}
          {gradesData.map((subject, index) => (
            <View key={index} style={[styles.tableRow, index % 2 === 0 ? { backgroundColor: '#f8f8f8' } : {}]}>
              <View style={styles.col1}><Text style={styles.cellText}>{subject.clave}</Text></View>
              <View style={styles.col2}><Text style={styles.cellText}>{subject.seccion}</Text></View>
              <View style={styles.col3}><Text style={styles.cellTextLeft}>{subject.asignatura}</Text></View>
              <View style={styles.col4}><Text style={styles.cellText}>{subject.calificacion}</Text></View>
              <View style={styles.col5}><Text style={styles.cellText}>{subject.creditos}</Text></View>
              <View style={styles.col6}><Text style={styles.cellText}>{subject.puntos.toFixed(1)}</Text></View>
            </View>
          ))}
        </View>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          {/* Left Summary - Credits Approved */}
          <View style={styles.leftSummary}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Créditos Aprobados</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Ciclo Propedéutico :</Text>
                <Text style={styles.summaryValue}>{academicCycles.propeudeutico}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Ciclo Formativo :</Text>
                <Text style={styles.summaryValue}>{academicCycles.formativo}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Ciclo Profesional :</Text>
                <Text style={styles.summaryValue}>{academicCycles.profesional}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { fontWeight: 'bold' }]}>Total :</Text>
                <Text style={[styles.summaryValue, { fontWeight: 'bold' }]}>{totalCycles}</Text>
              </View>
            </View>
          </View>

          {/* Right Summary - Semester and Accumulated Totals */}
          <View style={styles.rightSummary}>
            <View style={styles.summaryTable}>
              <View style={[styles.summaryTableRow, styles.summaryTableHeader]}>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 8 }}></Text></View>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 8 }}>Créditos</Text></View>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 8 }}>Puntos</Text></View>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 8 }}>Índice</Text></View>
              </View>
              <View style={styles.summaryTableRow}>
                <View style={{ flex: 1 }}><Text style={{ fontSize: 8 }}>Totales del Trimestre</Text></View>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 8 }}>{totalCredits}</Text></View>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 8 }}>{totalPoints.toFixed(1)}</Text></View>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 8 }}>{trimesterGPA.toFixed(2)}</Text></View>
              </View>
              <View style={styles.summaryTableRowLast}>
                <View style={{ flex: 1 }}><Text style={{ fontSize: 8 }}>Totales Acumulados</Text></View>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 8 }}>{accumulatedCredits}</Text></View>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 8 }}>{accumulatedPoints.toFixed(1)}</Text></View>
                <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 8 }}>{accumulatedGPA.toFixed(2)}</Text></View>
              </View>
            </View>

            <View style={styles.academicStatusBox}>
              <Text style={styles.summaryTitle}>Condición Académica</Text>
              <Text style={styles.academicStatus}>NORMAL</Text>
            </View>
          </View>
        </View>

        {/* Observations Table */}
        <View style={styles.observations}>
          <Text style={styles.observationsTitle}>Observaciones</Text>
          <View style={styles.observationsContent}>
            {/* Empty space for observations - can be filled with actual content */}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FinalGradesPDF;
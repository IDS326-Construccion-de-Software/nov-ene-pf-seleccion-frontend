import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Datos de muestra para calificaciones de medio término
const midtermGradesData = [
  {
    clave: "ITT-310",
    asignatura: "PROGRAMACION IV",
    creditos: 4,
    calificacion: 81.5,
    base: "B+"
  },
  {
    clave: "ITT-333",
    asignatura: "BASES DE DATOS II",
    creditos: 3,
    calificacion: 90,
    base: "A-"
  },
  {
    clave: "MAT-245",
    asignatura: "CALCULO DIFERENCIAL",
    creditos: 4,
    calificacion: 78.5,
    base: "C+"
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
    /*borderLeft: '1 solid black',
    borderRight: '1 solid black',
    borderBottom: '1 solid black',*/
    paddingVertical: 8,
    paddingHorizontal: 2,
    minHeight: 35,
    alignItems: 'center',
  },
  tableRowShaded: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    paddingVertical: 8,
    paddingHorizontal: 2,
    minHeight: 35,
    alignItems: 'center',
  },
  col1: { width: '15%', /*borderRight: '1 solid black',*/ paddingRight: 2, paddingLeft: 2 }, // Código
  col2: { width: '55%', /*borderRight: '1 solid black',*/ paddingRight: 2, paddingLeft: 2 }, // Asignatura
  col3: { width: '10%', /*borderRight: '1 solid black',*/ paddingRight: 2, paddingLeft: 2 }, // Créditos
  col4: { width: '12%', /*borderRight: '1 solid black',*/ paddingRight: 2, paddingLeft: 2 }, // Calificación
  col5: { width: '8%', paddingRight: 2, paddingLeft: 2 }, // Base
  headerText: {
    fontWeight: 'bold',
    fontSize: 9,
    textAlign: 'center',
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
  },
});

interface MidtermGradesData {
  clave: string;
  asignatura: string;
  creditos: number;
  calificacion: number;
  base: string;
}

interface MidtermGradesPDFProps {
  studentData?: {
    id: string;
    name: string;
    program: string;
    trimester: string;
  };
  gradesData?: MidtermGradesData[];
}

const MidtermGradesPDF: React.FC<MidtermGradesPDFProps> = ({ 
  studentData = {
    id: "1077546",
    name: "ISMAEL MARTÍNEZ",
    program: "(IDS 2020) INGENIERÍA DE SOFTWARE (IDS)",
    trimester: "Noviembre 2025 - Enero 2026"
  }, 
  gradesData: propGradesData = midtermGradesData 
}) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit'
  });

  const currentTime = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const totalCredits = propGradesData.reduce((sum, subject) => sum + subject.creditos, 0);

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
            <Text>Reporte de Calificaciones - Medio Término</Text>
            <Text>
              <Text style={styles.headerTextBold}>Página: </Text>
              <Text>1 de 1</Text>
            </Text>
          </View>
          <Text>
            <Text style={styles.headerTextBold}>Trimestre: </Text>
            <Text>{studentData.trimester}</Text>
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
            <View style={styles.col1}><Text style={styles.headerText}>Código</Text></View>
            <View style={styles.col2}><Text style={styles.headerText}>Asignatura</Text></View>
            <View style={styles.col3}><Text style={styles.headerText}>Créd.</Text></View>
            <View style={styles.col4}><Text style={styles.headerText}>Calificación</Text></View>
            <View style={styles.col5}><Text style={styles.headerText}>Base</Text></View>
          </View>

          {/* Table Rows */}
          {propGradesData.map((subject, index) => (
            <View key={index} style={[styles.tableRow, index % 2 === 0 ? { backgroundColor: '#f8f8f8' } : {}]}>
              <View style={styles.col1}><Text style={styles.cellText}>{subject.clave}</Text></View>
              <View style={styles.col2}><Text style={styles.cellTextLeft}>{subject.asignatura}</Text></View>
              <View style={styles.col3}><Text style={styles.cellText}>{subject.creditos}</Text></View>
              <View style={styles.col4}><Text style={styles.cellText}>{subject.calificacion.toFixed(1)}</Text></View>
              <View style={styles.col5}><Text style={styles.cellText}>{subject.base}</Text></View>
            </View>
          ))}
        </View>

        {/* Footer */}
        {/* 
        <View style={styles.footer}>
          <View style={{ width: '15%' }}></View>
          <View style={{ width: '55%', alignItems: 'flex-end' }}>
            <Text style={styles.footerLabel}>Total de Créditos:</Text>
          </View>
          <View style={{ width: '10%', alignItems: 'center' }}>
            <View style={{ borderTopWidth: 1, borderTopColor: 'black', width: '100%', marginBottom: 2 }}></View>
            <Text style={styles.footerLabel}>{totalCredits}</Text>
          </View>
          <View style={{ width: '20%' }}></View>
        </View>
        */}

        {/* Observations */}
        <View style={styles.observations}>
          <Text style={styles.observationsTitle}>Observaciones:</Text>
          <Text style={styles.observationsText}>
            Este reporte muestra las calificaciones parciales del trimestre en curso. Las calificaciones finales estarán disponibles al finalizar el período académico.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MidtermGradesPDF;
import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./CCPdfStyle";

export type RecordRow = {
  codigo: string;
  asignatura: string;
  estado: "Aprobada" | "Prerreq. Aprobados" | "Prerreq. Pendientes" | "En curso";
  prerequisitos: string;
  corequisitos: string;
  creditosRequeridos: number;
};

export type PdfReport = {
  trimestreLabel: string;
  summary: {
    id: string;
    programa: string;
    condicionAcademica: string;
    ultimaCondicion: string;
    indiceTrimestral: string;
    indiceGeneral: string;
    trimestreCursado: string;
    asignaturasAprobadas: string;
  };
  rows: RecordRow[];
};

export default function CareerCurriculumPDF({ report }: { report: PdfReport }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Aquí va tu layout “tipo Figma” */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.headerLabel}>Trimestre: </Text>
            <Text style={styles.headerValue}>{report.trimestreLabel}</Text>
          </View>

          {/* Summary centrado */}
          <View style={styles.summaryWrap}>
            <View style={styles.summaryBox}>
              {/* izquierda */}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Id:</Text>
                <Text style={styles.summaryValue}>{report.summary.id}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Programa:</Text>
                <Text style={styles.summaryValue}>{report.summary.programa}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Condición académica:</Text>
                <Text style={styles.summaryValue}>{report.summary.condicionAcademica}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Última condición:</Text>
                <Text style={styles.summaryValue}>{report.summary.ultimaCondicion}</Text>
              </View>

              <View style={styles.summaryDivider} />

              {/* derecha */}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Índice trimestral:</Text>
                <Text style={styles.summaryValue}>{report.summary.indiceTrimestral}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Índice general:</Text>
                <Text style={styles.summaryValue}>{report.summary.indiceGeneral}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Trimestre cursado:</Text>
                <Text style={styles.summaryValue}>{report.summary.trimestreCursado}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Asignaturas aprobadas:</Text>
                <Text style={styles.summaryValue}>{report.summary.asignaturasAprobadas}</Text>
              </View>
            </View>
          </View>

          {/* Tabla (render dinámico) */}
          <View style={styles.table}>
            <View style={[styles.tr, styles.thead]}>
              <Text style={[styles.th, styles.colCodigo]}>Código</Text>
              <Text style={[styles.th, styles.colAsig]}>Asignatura</Text>
              <Text style={[styles.th, styles.colEstado]}>Estado</Text>
              <Text style={[styles.th, styles.colPre]}>Prerequisitos</Text>
              <Text style={[styles.th, styles.colCo]}>Co-requisitos</Text>
              <Text style={[styles.th, styles.colCred]}>Créditos</Text>
            </View>

            {report.rows.map((r, i) => (
              <View key={`${r.codigo}-${i}`} style={styles.tr}>
                <Text style={[styles.td, styles.colCodigo]}>{r.codigo}</Text>
                <Text style={[styles.td, styles.colAsig]}>{r.asignatura}</Text>
                <Text style={[styles.td, styles.colEstado]}>{r.estado}</Text>
                <Text style={[styles.td, styles.colPre]}>{r.prerequisitos || "-"}</Text>
                <Text style={[styles.td, styles.colCo]}>{r.corequisitos || "-"}</Text>
                <Text style={[styles.td, styles.colCred]}>{String(r.creditosRequeridos)}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

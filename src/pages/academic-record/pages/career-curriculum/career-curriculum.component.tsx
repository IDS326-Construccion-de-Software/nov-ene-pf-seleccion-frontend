import React from "react";
import { Container } from "@/components";
import { Toolbar, ToolbarHeading } from "@/layouts/applayout/toolbar";

/** Filas de la tabla */
type RecordRow = {
  codigo: string;
  asignatura: string;
  creditos: number;
  prerequisitos: string;
  corequisitos: string;
  creditosRequeridos: number;
};

/** Reporte por trimestre */
type TrimesterReport = {
  trimestre: number;
  // (estos campos quedan por si los reutilizas luego, pero NO se muestran)
  id: string;
  programa: string;
  condicionAcademica: string;
  ultimaCondicion: string;
  indiceTrimestral: number;
  indiceGeneral: number;
  trimestreCursado: number;
  aprobadas: string;

  rows: RecordRow[];
};

/** Mocks: cada item = 1 trimestre */
const reports: TrimesterReport[] = [
  {
    trimestre: 1,
    id: "1077546",
    programa: "IDS - Ingeniería de software",
    condicionAcademica: "Normal",
    ultimaCondicion: "Agosto 2025 - Octubre 2025",
    indiceTrimestral: 3.7,
    indiceGeneral: 3.5,
    trimestreCursado: 3,
    aprobadas: "16 de 80",
    rows: [
      {
        codigo: "IDS340",
        asignatura: "Desarrollo de Software I",
        creditos: 3,
        prerequisitos: "IDS 323, IDS323L",
        corequisitos: "IDS340L",
        creditosRequeridos: 0,
      },
      {
        codigo: "IDS340L",
        asignatura: "Laboratorio de Desarrollo de Software I",
        creditos: 1,
        prerequisitos: "IDS323, IDS323L",
        corequisitos: "IDS340",
        creditosRequeridos: 0,
      },
      {
        codigo: "CBM102",
        asignatura: "Cálculo Diferencial",
        creditos: 5,
        prerequisitos: "CBM101",
        corequisitos: "",
        creditosRequeridos: 0,
      },
    ],
  },
  {
    trimestre: 2,
    id: "1077546",
    programa: "IDS - Ingeniería de software",
    condicionAcademica: "Normal",
    ultimaCondicion: "Noviembre 2025 - Enero 2026",
    indiceTrimestral: 3.8,
    indiceGeneral: 3.55,
    trimestreCursado: 4,
    aprobadas: "20 de 80",
    rows: [
      {
        codigo: "IDS373",
        asignatura: "Sistemas Operativos",
        creditos: 4,
        prerequisitos: "IDS340",
        corequisitos: "IDS373L",
        creditosRequeridos: 0,
      },
      {
        codigo: "CBF210",
        asignatura: "Física Mecánica I",
        creditos: 3,
        prerequisitos: "CBM102",
        corequisitos: "CBF210L",
        creditosRequeridos: 0,
      },
      {
        codigo: "CBF210L",
        asignatura: "Laboratorio Física Mecánica I",
        creditos: 1,
        prerequisitos: "CBM102",
        corequisitos: "CBF210",
        creditosRequeridos: 0,
      },
    ],
  },
];

const CareerCurriculumPage: React.FC = () => {
  const [reportGenerated, setReportGenerated] = React.useState(false);

  return (
    <AppShell>
      <Container>
        <Toolbar>
          <div className="flex items-start justify-between gap-4 w-full">
            <ToolbarHeading
              title="Pensum de Carrera"
              description="Pensum de carrera del estudiante"
            />

            <div className="flex items-center gap-3">
              <button
                onClick={() => setReportGenerated(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                <span className="inline-block h-4 w-4 rounded bg-white/20" />
                Generar Reporte
              </button>

              <button
                disabled={!reportGenerated}
                className={[
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold",
                  reportGenerated
                    ? "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed",
                ].join(" ")}
                onClick={() => {
                  console.log("Descargar PDF (pendiente)");
                }}
              >
                <span className="inline-block h-4 w-4 rounded bg-neutral-400" />
                Descargar como PDF
              </button>
            </div>
          </div>
        </Toolbar>

        {!reportGenerated ? (
          <NoReportPlaceholder />
        ) : (
          <div className="mt-6 space-y-6">
            {reports.map((report) => (
              <Card key={report.trimestre}>
                {/* SOLO: título del trimestre */}
                <div className="px-6 py-4 border-b border-neutral-200">
                  <div className="text-sm font-semibold text-neutral-900">
                    Trimestre:&nbsp; <span className="font-bold">{report.trimestre}</span>
                  </div>
                </div>

                {/* SOLO: tabla */}
                <div className="px-6 py-6">
                  <Table<RecordRow>
                    columns={[
                      { key: "codigo", header: "Código", className: "w-[110px]" },
                      { key: "asignatura", header: "Asignatura" },
                      { key: "creditos", header: "Créditos", className: "w-[120px]" },
                      { key: "prerequisitos", header: "Prerequisitos", className: "w-[180px]" },
                      { key: "corequisitos", header: "Co-requisitos", className: "w-[160px]" },
                      {
                        key: "creditosRequeridos",
                        header: "Créditos Requeridos",
                        className: "w-[170px]",
                      },
                    ]}
                    data={report.rows}
                    rowKey={(r) => `${report.trimestre}-${r.codigo}-${r.asignatura}`}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}

        <Footer />
      </Container>
    </AppShell>
  );
};

export { CareerCurriculumPage };

function NoReportPlaceholder() {
  return (
    <div className="mt-6">
      <div className="w-full border border-dotted border-[#4B5675]">
        <div className="min-h-[520px] flex items-center justify-center px-6">
          <p className="text-sm text-[#4B5675]">No se ha generado ningún reporte.</p>
        </div>
      </div>
    </div>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="flex">
        <div className="flex-1 min-w-0">
          <main className="px-6 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="mt-10 flex items-center justify-between text-xs text-neutral-500">
      <span>Ayuda</span>
      <span>Todos los derechos reservados</span>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white shadow-sm border border-neutral-200">
      {children}
    </section>
  );
}

/** Tabla genérica tipada */
type Column<T> = {
  key: keyof T;
  header: string;
  className?: string;
};

function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  renderCell,
}: {
  columns: Array<Column<T>>;
  data: T[];
  rowKey: (row: T) => string;
  renderCell?: (row: T, colKey: keyof T) => React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50">
          <tr>
            {columns.map((c) => (
              <th
                key={String(c.key)}
                className={[
                  "px-4 py-3 text-center font-semibold text-neutral-600",
                  "border-b border-neutral-200",
                  "border-r border-neutral-200 last:border-r-0",
                  c.className ?? "",
                ].join(" ")}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white">
          {data.map((row) => (
            <tr key={rowKey(row)} className="border-b border-neutral-100 last:border-b-0">
              {columns.map((c) => (
                <td
                  key={String(c.key)}
                  className={[
                    "px-4 py-4 text-neutral-800 align-middle text-center",
                    "border-r border-neutral-100 last:border-r-0",
                    c.className ?? "",
                  ].join(" ")}
                >
                  {renderCell ? renderCell(row, c.key) : String(row[c.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

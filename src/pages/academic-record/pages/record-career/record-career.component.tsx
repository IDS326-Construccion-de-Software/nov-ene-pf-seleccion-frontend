import React from "react";
import { Container } from "@/components";
import { Toolbar, ToolbarHeading } from "@/layouts/applayout/toolbar";

import { array } from "yup";

const h = 8;

type EstadoMateria =
  | "Aprobada"
  | "En curso"
  | "Prerreq. Pendientes"
  | "Prerreq. Aprobados";

type RecordRow = {
  codigo: string;
  asignatura: string;
  estado: EstadoMateria;
  prerequisitos: string;
  corequisitos: string;
  creditosRequeridos: number;
};

const estadoStyles: Record<EstadoMateria, string> = {
  "Aprobada": "bg-emerald-50 text-emerald-700",
  "En curso": "bg-yellow-50 text-yellow-700",
  "Prerreq. Pendientes": "bg-gray-50 text-gray-700",
  "Prerreq. Aprobados": "bg-blue-50 text-blue-700",
};

/** Mock: genera filas con estados variables */
const estados: EstadoMateria[] = [
  "Aprobada",
  "En curso",
  "Prerreq. Pendientes",
  "Prerreq. Aprobados",
];

const rows: RecordRow[] = Array.from({ length: h }, (_, i) => ({
  codigo: `SIS${140 + i}`,
  asignatura: `Asignatura ${i + 1}`,
  estado: estados[i % estados.length], // ✅ aquí va un valor, no un tipo
  prerequisitos: "IDS 323, IDS323L",
  corequisitos: "IDS340L",
  creditosRequeridos: 0,
}));


type TrimesterReport = {
  id: string;                 // clave única del trimestre (para React key)
  trimestreLabel: string;     // "Agosto - Octubre 2025"
  summary: {
    studentId: string;
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

console.log(rows);
  /*{
    codigo: "IDS340L",
    asignatura: "Laboratorio de Desarrollo de Software I",
    estado: "Aprobada",
    prerequisitos: "IDS323, IDS323L",
    corequisitos: "IDS340",
    creditosRequeridos: 0,
  },
  {
    codigo: "CBF210",
    asignatura: "Física Mecánica I",
    estado: "Aprobada",
    prerequisitos: "CBM102",
    corequisitos: "CBF210L",
    creditosRequeridos: 0,
  },
  {
    codigo: "CBF210L",
    asignatura: "Laboratorio Física Mecánica I",
    estado: "Aprobada",
    prerequisitos: "CBM102",
    corequisitos: "CBF210",
    creditosRequeridos: 0,
  },
  {
    codigo: "CBM201",
    asignatura: "Cálculo Integral",
    estado: "Aprobada",
    prerequisitos: "CBM102",
    corequisitos: "",
    creditosRequeridos: 0,
  },*/

const subjectsPool: Array<Pick<RecordRow, "codigo" | "asignatura" | "prerequisitos" | "corequisitos">> = [
  { codigo: "IDS340", asignatura: "Desarrollo de Software I", prerequisitos: "IDS323, IDS323L", corequisitos: "IDS340L" },
  { codigo: "IDS340L", asignatura: "Lab. Desarrollo de Software I", prerequisitos: "IDS323, IDS323L", corequisitos: "IDS340" },
  { codigo: "CBF210", asignatura: "Física Mecánica I", prerequisitos: "CBM102", corequisitos: "CBF210L" },
  { codigo: "CBF210L", asignatura: "Lab. Física Mecánica I", prerequisitos: "CBM102", corequisitos: "CBF210" },
  { codigo: "CBM201", asignatura: "Cálculo Integral", prerequisitos: "CBM102", corequisitos: "" },
  { codigo: "MAT120", asignatura: "Álgebra Lineal", prerequisitos: "MAT110", corequisitos: "" },
  { codigo: "SIS101", asignatura: "Introducción a Sistemas", prerequisitos: "", corequisitos: "" },
  { codigo: "IDS323", asignatura: "Programación II", prerequisitos: "IDS210", corequisitos: "IDS323L" },
];


function buildRows(count: number, offset = 0): RecordRow[] {
  return Array.from({ length: count }, (_, i) => {
    const s = subjectsPool[(i + offset) % subjectsPool.length];

    const estado = (["Aprobada", "En curso", "Prerreq. Aprobados", "Prerreq. Pendientes"] as const)[
      (i + offset) % 4
    ];

    return {
      ...s,
      estado,
      creditosRequeridos: ((i + offset) % 2) * 12, // 0 o 12
    };
  });
}

const reports: TrimesterReport[] = [
  {
    id: "2025-08-10",
    trimestreLabel: "Agosto - Octubre 2025",
    summary: {
      studentId: "1077546",
      programa: "IDS - Ingeniería de software",
      condicionAcademica: "Normal",
      ultimaCondicion: "Agosto 2025 - Octubre 2025",
      indiceTrimestral: "3.7",
      indiceGeneral: "3.5",
      trimestreCursado: "3",
      asignaturasAprobadas: "16 de 80",
    },
    rows: buildRows(5, 0),
  },
  {
    id: "2025-11-01",
    trimestreLabel: "Noviembre - Enero 2026",
    summary: {
      studentId: "1077546",
      programa: "IDS - Ingeniería de software",
      condicionAcademica: "Normal",
      ultimaCondicion: "Noviembre 2025 - Enero 2026",
      indiceTrimestral: "3.4",
      indiceGeneral: "3.5",
      trimestreCursado: "4",
      asignaturasAprobadas: "20 de 80",
    },
    rows: buildRows(6, 3),
  },
];


const RecordCareerPage: React.FC = () => {
  const [reportGenerated, setReportGenerated] = React.useState(false);
  return (
    <AppShell>
      <Container>
        <Toolbar>
          <div className="flex items-start justify-between gap-4 w-full">
            <ToolbarHeading
              title="Record según pensum"
              description="Record académico del estudiante según su pensum"
            />

            <div className="flex items-center gap-3">
              <button 
              onClick={() => setReportGenerated(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-95">
                {/* icon placeholder */}
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
        <div className="mt-6">
          <Card>
            <div className="px-6 py-4 border-b border-neutral-200">
              <div className="text-sm font-semibold text-neutral-900">
                Trimestre:&nbsp; <span className="font-bold">Febrero - Abril 2022</span>
              </div>
            </div>

            <div className="px-6 py-5">
              <div className="flex justify-center">
                <div className="grid w-full max-w-4xl grid-cols-1 lg:grid-cols-2 gap-x-40 gap-y-4">
                  {/* Columna izquierda */}
                  <dl className="space-y-3 text-sm">
                    <Info label="Id:" value="1077546" />
                    <Info label="Programa:" value="IDS - Ingeniería de software" />
                    <Info label="Condición académica:" value="Normal" />
                    <Info label="Última condición:" value="Agosto 2025 - Octubre 2025" />
                  </dl>

                  {/* Columna derecha */}
                  <dl className="space-y-3 text-sm">
                    <Info label="Índice trimestral:" value="3.7" />
                    <Info label="Índice general:" value="3.5" />
                    <Info label="Trimestre cursado:" value="3" />
                    <Info label="Asignaturas aprobadas:" value="16 de 80" />
                  </dl>
                </div>
              </div>
            </div>


            <div className="px-6 pb-6"> 
              <Table<RecordRow>
                columns={[
                  { key: "codigo", header: "Código", className: "w-[110px]" },
                  { key: "asignatura", header: "Asignatura" },
                  { key: "estado", header: "Estado", className: "w-[140px]" },
                  { key: "prerequisitos", header: "Prerequisitos", className: "w-[180px]" },
                  { key: "corequisitos", header: "Co-requisitos", className: "w-[160px]" },
                  { key: "creditosRequeridos", header: "Créditos Requeridos", className: "w-[170px]" },
                ]}
                data={rows}
                rowKey={(r) => `${r.codigo}-${r.asignatura}`}
                renderCell={(row, colKey) => {
                  if (colKey === "estado") {
                    return (
                      <span
                        className={[
                          "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
                          estadoStyles[row.estado],
                        ].join(" ")}
                      >
                        {row.estado}
                      </span>
                    );
                  }


                  return String(row[colKey as keyof RecordRow] ?? "");
                }}
              />
            </div>
          </Card>
        </div>
      )}

        <Footer />
      </Container>
    </AppShell>
  );
};

export { RecordCareerPage };

function NoReportPlaceholder() {
  return (
    <div className="mt-6">
      <div className="w-full border border-dotted border-[#4B5675]">
        <div className="min-h-[520px] flex items-center justify-center px-6">
          <p className="text-sm text-[#4B5675]">
            No se ha generado ningún reporte.
          </p>
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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="font-semibold text-neutral-900 text-right">{value}</dd>
    </div>
  );
}

function Section({ title }: { title: string }) {
  return <div className="px-2 py-2 text-xs font-semibold text-neutral-500">{title}</div>;
}

function NavItem({
  label,
  nested,
  active,
}: {
  label: string;
  nested?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center gap-2 rounded-xl px-3 py-2 cursor-pointer select-none",
        nested ? "ml-6" : "",
        active ? "bg-red-50 text-red-700 font-semibold" : "text-neutral-700 hover:bg-neutral-100",
      ].join(" ")}
    >
      <span className="h-4 w-4 rounded bg-neutral-300" />
      <span>{label}</span>
    </div>
  );
}

function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-1">
      <div className="flex items-center justify-between rounded-xl px-3 py-2 text-neutral-700 hover:bg-neutral-100 cursor-pointer">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-neutral-300" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-xs text-neutral-400">▾</span>
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function TopLink({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <a
      className={[
        "text-neutral-600 hover:text-neutral-900",
        active ? "text-neutral-900 font-semibold" : "",
      ].join(" ")}
      href="#"
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
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
                    "px-4 py-4 text-neutral-800 align-middle text-center  ",
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

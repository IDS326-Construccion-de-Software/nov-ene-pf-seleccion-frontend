import { KeenIcon } from '@/components/keenicons';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { AsignaturaOferta } from '@/interfaces/selection/selection.interfaces';
import { formatTime } from '@/utils/timeFormat';

interface SubjectSelectionScheduleProps {
  oferta: AsignaturaOferta[];
}

const SubjectSelectionSchedule = ({ oferta }: SubjectSelectionScheduleProps) => {
  const selectedSections = (oferta || []).flatMap((subj) =>
    (subj.secciones || []).map((sec) => ({
      ...sec,
      asignaturaId: subj.asignaturaId,
      asignatura: subj.asignatura,
      definitiva: subj.definitiva
    }))
  );

  const getHorarioDia = (horarios: any[], dia: string) => {
    const h = horarios.find((x) => x.dia === dia);
    if (!h) return null;
    return `${formatTime(h.horaInicio)} - ${formatTime(h.horaFin)}`;
  };

  return (
    <Card className="border-gray-200 rounded-xl overflow-hidden shadow-none">
      <CardHeader className="bg-white border-b border-gray-100 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-base sm:text-lg font-bold tracking-tight">
            Resumen de Horario académico
          </CardTitle>
          <span className="text-[10px] text-gray-400 lg:hidden">
            Desliza horizontalmente para ver el horario completo →
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto whitespace-nowrap">
          <Table className="min-w-[800px] lg:min-w-full">
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="text-[12px]">Código</TableHead>
                <TableHead className="text-[12px] ">Asignatura</TableHead>
                <TableHead className="text-center text-[12px] uppercase">Lun</TableHead>
                <TableHead className="text-center text-[12px] uppercase">Mar</TableHead>
                <TableHead className="text-center text-[12px] uppercase">Mie</TableHead>
                <TableHead className="text-center text-[12px] uppercase">Jue</TableHead>
                <TableHead className="text-center text-[12px] uppercase">Vie</TableHead>
                <TableHead className="text-center text-[12px] uppercase">Sab</TableHead>
                <TableHead className="text-center text-[12px]">Aula / Edif</TableHead>
                <TableHead className="text-center text-[12px]">Profesor</TableHead>
                <TableHead className="text-center text-[12px]">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedSections.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-10 text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <KeenIcon icon="calendar-add" className="text-5xl text-gray-300" />
                      <span>No has seleccionado ninguna asignatura todavía.</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                selectedSections.map((sec, i) => (
                  <TableRow key={i} className="hover:bg-gray-50/30">
                    <TableCell className="font-bold text-red-500 text-xs">
                      <div className="flex items-center gap-2">{sec.asignaturaId}</div>
                    </TableCell>
                    <TableCell
                      className="font-medium text-gray-900 text-xs truncate max-w-[300px]"
                      title={sec.asignatura}
                    >
                      {sec.asignatura}
                    </TableCell>
                    <TableCell className="text-center px-1">
                      {getHorarioDia(sec.horarios, 'Lunes') && (
                        <Badge className="bg-red-50 text-red-500 border-red-500  shadow-md rounded text-[12px] font-bold">
                          {getHorarioDia(sec.horarios, 'Lunes')}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center px-1">
                      {getHorarioDia(sec.horarios, 'Martes') && (
                        <Badge className="bg-red-50 text-red-500 border-red-500  shadow-md rounded text-[12px] font-bold">
                          {getHorarioDia(sec.horarios, 'Martes')}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center px-1">
                      {getHorarioDia(sec.horarios, 'Miercoles') && (
                        <Badge className="bg-red-50 text-red-500 border-red-500  shadow-md rounded text-[12px] font-bold">
                          {getHorarioDia(sec.horarios, 'Miercoles')}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center px-1">
                      {getHorarioDia(sec.horarios, 'Jueves') && (
                        <Badge className="bg-red-50 text-red-500 border-red-500  shadow-md rounded text-[12px] font-bold">
                          {getHorarioDia(sec.horarios, 'Jueves')}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center px-1">
                      {getHorarioDia(sec.horarios, 'Viernes') && (
                        <Badge className="bg-red-50 text-red-500 border-red-500  shadow-md rounded text-[12px] font-bold">
                          {getHorarioDia(sec.horarios, 'Viernes')}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center px-1">
                      {getHorarioDia(sec.horarios, 'Sabado') && (
                        <Badge className="bg-red-50 text-red-500 border-red-500  shadow-md rounded text-[12px] font-bold">
                          {getHorarioDia(sec.horarios, 'Sabado')}
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className="bg-gray-100 border-gray-600 rounded px-2 text-gray-800 text-[12px]"
                      >
                        {sec.horarios[0]?.aula || '-'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-red-500 text-center hover:text-red-800 cursor-pointer text-[13px] font-semibold whitespace-nowrap">
                      {sec.profesor}
                    </TableCell>
                    <TableCell className="flex justify-center items-center ">
                      {sec.definitiva && (
                        <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                          <KeenIcon icon="check" className="text-green-600 text-lg" />
                        </div>
                      )}
                      {!sec.definitiva && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-500 border-amber-300 text-[10px] font-bold rounded-md"
                        >
                          Pendiente
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export { SubjectSelectionSchedule };

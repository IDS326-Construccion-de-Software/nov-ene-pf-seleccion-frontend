import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { KeenIcon, Pagination } from '@/components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { AsignaturaOferta, SeccionOferta } from '@/interfaces/selection/selection.interfaces';
import { saveSelection, cancelSelection } from '@/services/selection/selection.service';
import { formatTime } from '@/utils/timeFormat';
import { useAuthContext } from '@/auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogBody,
  DialogClose
} from '@/components/ui/dialog';

interface SubjectSelectionTableProps {
  subjects: AsignaturaOferta[];
  resumen?: AsignaturaOferta[];
  canModify?: boolean;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const SubjectSelectionTable = ({
  subjects,
  canModify = true,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange
}: SubjectSelectionTableProps) => {
  const queryClient = useQueryClient();
  const { auth } = useAuthContext();
  const usuarioId = String(auth?.usuarioId);
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const [sectionToCancel, setSectionToCancel] = useState<{
    id: number;
    name: string;
    asignatura: string;
  } | null>(null);

  const mutation = useMutation(
    (seccionId: number) =>
      saveSelection({
        usuarioId,
        seccionId
      }),
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message || 'Procesado con éxito');
          queryClient.invalidateQueries(['oferta-seleccion']);
          queryClient.invalidateQueries(['resumen-seleccion']);
        } else {
          toast.error(data.message || 'Error al procesar');
        }
      },
      onError: (error: any) => {
        const errorMsg =
          error?.response?.data?.message || 'Ocurrió un error al intentar guardar la selección';
        toast.error(errorMsg);
      }
    }
  );

  const cancelMutation = useMutation(
    (seleccionId: number) => cancelSelection(seleccionId, usuarioId),
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message || 'Sección quitada con éxito');
          queryClient.invalidateQueries(['oferta-seleccion']);
          queryClient.invalidateQueries(['resumen-seleccion']);
          setSectionToCancel(null);
        } else {
          toast.error(data.message || 'Error al quitar la sección');
        }
      },
      onError: (error: any) => {
        const errorMsg =
          error?.response?.data?.message || 'Ocurrió un error al intentar quitar la selección';
        toast.error(errorMsg);
      }
    }
  );

  const getCapacityColor = (disponible: number, total: number) => {
    const percentage = (disponible / (total || 1)) * 100;
    if (percentage <= 25) return 'bg-red-500';
    if (percentage <= 50) return 'bg-orange-500';
    if (percentage <= 75) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  const getCapacityTextColor = (disponible: number, total: number) => {
    const percentage = (disponible / (total || 1)) * 100;
    if (percentage <= 25) return 'text-red-500';
    if (percentage <= 50) return 'text-orange-500';
    if (percentage <= 75) return 'text-yellow-500';
    return 'text-green-600';
  };

  const getModalityLabel = (mod: number) => {
    switch (mod) {
      case 0:
        return 'P'; // Presencial
      case 1:
        return 'V'; // Virtual
      case 2:
        return 'H'; // Híbrida
      default:
        return '-';
    }
  };

  const toggleSubject = (id: string) => {
    setExpandedSubjects((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

  const renderActionButton = (
    seccion: SeccionOferta,
    asignaturaPuedeSeleccionar: boolean,
    nombreAsignatura?: string,
    seleccionId?: number | null
  ) => {
    if (!canModify) {
      return (
        <Button
          size="icon"
          variant="outline"
          className="size-8 rounded-full opacity-50 cursor-not-allowed"
          title="Modificaciones deshabilitadas por el período"
        >
          <KeenIcon icon="lock" />
        </Button>
      );
    }

    if (seccion.seleccionada) {
      return (
        <Button
          size="icon"
          className="size-8 rounded-full bg-slate-800 hover:bg-red-600 border-none transition-colors group"
          onClick={() =>
            setSectionToCancel({
              id: seleccionId || 0,
              name: seccion.codigoSeccion,
              asignatura: nombreAsignatura || ''
            })
          }
          title="Quitar asignatura"
        >
          <KeenIcon icon="check" className="text-white group-hover:hidden" />
          <KeenIcon icon="trash" className="text-white hidden group-hover:block" />
        </Button>
      );
    }

    if (!asignaturaPuedeSeleccionar || !seccion.estatusValidacion.puedeInscribir) {
      return (
        <Button
          size="icon"
          variant="destructive"
          className="size-8 rounded-full opacity-80 cursor-not-allowed"
          title={seccion.estatusValidacion.motivo || 'No permitido'}
        >
          <KeenIcon icon="information-2" />
        </Button>
      );
    }

    if (seccion.cupoDisponible <= 0) {
      return (
        <Button
          size="icon"
          variant="outline"
          className="size-8 rounded-full border-red-300 text-red-300 hover:bg-red-100 hover:text-red-500"
        >
          <KeenIcon icon="cross" />
        </Button>
      );
    }

    return (
      <Button
        size="icon"
        variant="outline"
        className="size-8 rounded-full border-green-500 text-green-500 hover:bg-green-100 hover:text-green-500"
        onClick={() => mutation.mutate(seccion.seccionId)}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading && mutation.variables === seccion.seccionId ? (
          <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></span>
        ) : (
          <KeenIcon icon="plus" />
        )}
      </Button>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-gray-900">Asignaturas disponibles</h2>

      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray">
            <TableRow>
              <TableHead className="w-[80px]">Código</TableHead>
              <TableHead className="min-w-[250px] max-w-[350px]">Asignatura</TableHead>
              <TableHead className="text-center w-[60px]">Tri.</TableHead>
              <TableHead className="text-center">Mod.</TableHead>
              <TableHead className="text-center text-nowrap">Sección / Aula</TableHead>
              <TableHead className="text-center">Crédito</TableHead>
              <TableHead className="w-[150px]">Capacidad</TableHead>
              <TableHead className="text-center">Tipo</TableHead>
              <TableHead className="text-center">Profesor</TableHead>
              <TableHead className="text-center">Horario</TableHead>
              <TableHead className="text-right">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-10 text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <KeenIcon icon="note-2" className="text-5xl text-gray-300" />
                    <span>No hay asignaturas disponibles en la oferta.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              subjects.map((subject, idx) => {
                const key = `${subject.asignaturaId}-${subject.asignatura}-${idx}`;
                const isExpanded = expandedSubjects.includes(key);
                const availableSectionsCount = subject.secciones.filter(
                  (s) => s.cupoDisponible > 0
                ).length;
                const selectedSection = subject.secciones.find((s) => s.seleccionada);
                const hasConflict = subject.secciones.some(
                  (s) => !s.estatusValidacion.puedeInscribir && s.estatusValidacion.motivo
                );

                return (
                  <React.Fragment key={key}>
                    <TableRow
                      className="bg-gray-100 cursor-pointer"
                      onClick={() => toggleSubject(key)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-red-500">{subject.asignaturaId}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-gray-900">
                        <div className="flex flex-col min-h-[10px] justify-center">
                          <span className="text-[12px] max-w-[200px]" title={subject.asignatura}>
                            {subject.asignatura}
                          </span>

                          {/* Mostrar el motivo si no puede seleccionar la asignatura */}
                          {!subject.puedeSeleccionar && subject.motivoBloqueo && (
                            <span className=" text-[10px] mt-0.5 whitespace-normal leading-tight">
                              <Badge
                                variant="outline"
                                className="bg-red-50 text-red-500 border-gray-300 rounded px-2 font-bold"
                              >
                                <KeenIcon icon="lock" className="mb-0.5" />
                              </Badge>
                              <span className="text-bold text-gray-700"> BLOQUEADA | </span>
                              <span className="text-red-500">{subject.motivoBloqueo}</span>
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-bold text-gray-800">
                        {subject.periodoTrimestre}
                      </TableCell>
                      <TableCell className="text-center font-bold text-gray-800">
                        {selectedSection ? getModalityLabel(selectedSection.modalidad) : '-'}
                      </TableCell>
                      <TableCell className="text-center text-nowrap">
                        {selectedSection ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-500 border-gray-300 rounded px-2 font-bold"
                            >
                              Sec {selectedSection.codigoSeccion} -{' '}
                              {selectedSection.horarios[0]?.aula || 'Sin Aula'}
                            </Badge>
                          </div>
                        ) : !subject.puedeSeleccionar && subject.motivoBloqueo ? (
                          <Badge
                            variant="outline"
                            className="bg-gray-100 text-gray-500 border-gray-300 rounded px-2 font-bold"
                          >
                            No disponible
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-white border-gray-300 rounded px-2"
                          >
                            {availableSectionsCount} Secs
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {subject.creditos} <span className="text-gray-400 font-normal">cr</span>
                      </TableCell>

                      {selectedSection && !subject.motivoBloqueo ? (
                        <>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between text-nowrap">
                                <span className="text-gray-600 text-[12px]">
                                  {selectedSection.cupoTotal}
                                </span>
                                <span
                                  className={cn(
                                    'font-bold text-[12px]',
                                    getCapacityTextColor(
                                      selectedSection.cupoDisponible,
                                      selectedSection.cupoTotal
                                    )
                                  )}
                                >
                                  / {selectedSection.cupoDisponible} Disp.
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-gray-300 rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    'h-full',
                                    getCapacityColor(
                                      selectedSection.cupoDisponible,
                                      selectedSection.cupoTotal
                                    )
                                  )}
                                  style={{
                                    width: `${(selectedSection.cupoDisponible / selectedSection.cupoTotal) * 100}%`
                                  }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              className={`${
                                subject.tipoAsignatura === 'Teoría'
                                  ? 'bg-blue-50 text-blue-600 border-blue-600'
                                  : subject.tipoAsignatura === 'Electiva'
                                    ? 'bg-orange-50 text-orange-500 border-orange-500'
                                    : 'bg-purple-100 text-purple-600 border-purple-600'
                              } text-[10px] font-bold rounded-md`}
                            >
                              {subject.tipoAsignatura}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="size-6 rounded-full bg-gray-700 lg:flex hidden items-center justify-center text-[10px] font-bold text-gray-300">
                                {selectedSection.profesor
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </div>
                              <span className="text-gray-700 text-sm text-nowrap">
                                {selectedSection.profesor}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {selectedSection.horarios.map((sch, i) => (
                                <div key={i} className="text-[12px] flex gap-2">
                                  <span className="font-bold text-gray-900 w-16">{sch.dia}</span>
                                  <span className="text-gray-800 text-nowrap">
                                    {formatTime(sch.horaInicio)} - {formatTime(sch.horaFin)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        </>
                      ) : selectedSection && subject.motivoBloqueo ? (
                        <>
                          <TableCell className="text-center text-gray-400">-</TableCell>
                          <TableCell className="text-center text-gray-400">-</TableCell>
                          <TableCell className="text-center text-gray-400">-</TableCell>
                          <TableCell className="text-center text-gray-400">-</TableCell>
                        </>
                      ) : (
                        <TableCell colSpan={4}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`size-1.5 rounded-full shrink-0 ${
                                !hasConflict && subject.puedeSeleccionar
                                  ? 'bg-green-500'
                                  : 'bg-red-500'
                              }`}
                            ></div>
                            <span className="text-sm text-gray-600">
                              {subject.motivoBloqueo ? (
                                'Esta asignatura está bloqueada'
                              ) : (
                                <>
                                  Haga clic para ver{' '}
                                  {availableSectionsCount === 1
                                    ? 'la 1 sección disponible'
                                    : `las ${availableSectionsCount} secciones disponibles`}
                                </>
                              )}
                            </span>
                          </div>
                        </TableCell>
                      )}

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-5">
                          {subject.definitiva && (
                            <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                              <KeenIcon icon="check" className="text-green-600 text-lg" />
                            </div>
                          )}
                          <KeenIcon icon={isExpanded ? 'up' : 'down'} className="text-gray-400" />
                        </div>
                      </TableCell>
                    </TableRow>
                    {isExpanded &&
                      subject.secciones.map((section) => (
                        <TableRow key={section.seccionId} className="hover:bg-gray-50/50">
                          <TableCell className="text-gray-600 text-sm">
                            <span className="text-nowrap">Sección {section.codigoSeccion}</span>
                          </TableCell>

                          <TableCell className="text-center">
                            {section.seleccionada ? (
                              <Badge
                                variant="outline"
                                className="bg-gray-800 text-white text-center px-1.5 font-medium  text-nowrap"
                              >
                                Seleccionada
                              </Badge>
                            ) : !subject.puedeSeleccionar && subject.motivoBloqueo ? (
                              <Badge
                                variant="outline"
                                className="bg-gray-100 text-gray-500 border-gray-300 rounded px-1.5 font-medium text-nowrap"
                              >
                                No disponible
                              </Badge>
                            ) : !section.estatusValidacion.puedeInscribir &&
                              section.estatusValidacion.motivo ? (
                              <span className="flex flex-col items-center mx-auto text-[10px] text-center font-medium mt-1 leading-tight max-w-[150px] whitespace-normal">
                                <span className="text-gray-600 font-bold">
                                  {section.estatusValidacion.motivo}
                                </span>
                                <span className="text-red-600">
                                  {section.estatusValidacion.detalleAsignatura &&
                                    ` (${section.estatusValidacion.detalleAsignatura})`}
                                </span>
                                {section.estatusValidacion.horaInicio &&
                                  section.estatusValidacion.horaFin && (
                                    <span className="text-gray-600 font-bold">
                                      {formatTime(section.estatusValidacion.horaInicio)} -{' '}
                                      {formatTime(section.estatusValidacion.horaFin)}
                                    </span>
                                  )}
                              </span>
                            ) : section.cupoDisponible <= 0 ? (
                              <Badge
                                variant="outline"
                                className="bg-red-50 text-red-500 text-center border-gray-300 rounded px-1.5 font-medium border-dotted text-nowrap"
                              >
                                Sin Cupos
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-500 border-green-500  text-[10px] font-bold rounded-md"
                              >
                                Disponible
                              </Badge>
                            )}
                          </TableCell>

                          <TableCell className="text-center font-bold text-gray-800">
                            {subject.periodoTrimestre}
                          </TableCell>
                          <TableCell className="text-center font-bold text-gray-800">
                            {getModalityLabel(section.modalidad)}
                          </TableCell>

                          <TableCell className="text-center">
                            <div className="flex items-center flex-col justify-center gap-1 text-center">
                              <Badge
                                variant="outline"
                                className="bg-white border-gray-300 rounded px-1.5 font-medium border-dotted text-nowrap"
                              >
                                {section.horarios[0]?.aula || 'Sin Aula'}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-bold">
                            {subject.creditos} <span className="text-gray-600 font-normal">cr</span>
                          </TableCell>
                          {subject.motivoBloqueo ? (
                            <>
                              <TableCell className="text-center text-gray-400">-</TableCell>
                              <TableCell className="text-center text-gray-400">-</TableCell>
                              <TableCell className="text-center text-gray-400">-</TableCell>
                              <TableCell className="text-center text-gray-400">-</TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell>
                                <div className="flex flex-col gap-1">
                                  <div className="flex justify-between text-nowrap">
                                    <span className="text-gray-600 text-[12px]">
                                      {section.cupoTotal}
                                    </span>
                                    <span
                                      className={cn(
                                        'font-bold text-[12px]',
                                        getCapacityTextColor(
                                          section.cupoDisponible,
                                          section.cupoTotal
                                        )
                                      )}
                                    >
                                      / {section.cupoDisponible} Disp.
                                    </span>
                                  </div>
                                  <div className="h-1.5 w-full bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                      className={cn(
                                        'h-full',
                                        getCapacityColor(section.cupoDisponible, section.cupoTotal)
                                      )}
                                      style={{
                                        width: `${(section.cupoDisponible / section.cupoTotal) * 100}%`
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  className={`${
                                    subject.tipoAsignatura === 'Teoría'
                                      ? 'bg-blue-50 text-blue-600 border-blue-600'
                                      : subject.tipoAsignatura === 'Electiva'
                                        ? 'bg-orange-50 text-orange-500 border-orange-500'
                                        : 'bg-purple-100 text-purple-600 border-purple-600'
                                  } text-[10px] font-bold rounded-md`}
                                >
                                  {subject.tipoAsignatura}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="size-6 rounded-full bg-gray-200 lg:flex hidden items-center justify-center text-[10px] font-bold text-gray-500">
                                    {section.profesor
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')}
                                  </div>
                                  <span className="text-gray-700 text-sm text-nowrap">
                                    {section.profesor}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-1">
                                  {section.horarios.map((sch, i) => (
                                    <div key={i} className="text-[12px] flex gap-2">
                                      <span className="font-bold text-gray-900 w-16">
                                        {sch.dia}
                                      </span>
                                      <span className="text-gray-800 text-nowrap">
                                        {formatTime(sch.horaInicio)} - {formatTime(sch.horaFin)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </TableCell>
                            </>
                          )}
                          <TableCell className="text-right">
                            {renderActionButton(
                              section,
                              subject.puedeSeleccionar,
                              subject.asignatura,
                              subject.seleccionId
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />

      {/* Modal de Confirmación para Quitar Sección */}
      <Dialog open={!!sectionToCancel} onOpenChange={() => setSectionToCancel(null)}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>¿Quitar asignatura?</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p className="text-sm text-gray-700 text-center">
              ¿Estás seguro que deseas quitar la sección <strong>{sectionToCancel?.name}</strong> de
              la asignatura <strong>{sectionToCancel?.asignatura}</strong>?
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => sectionToCancel && cancelMutation.mutate(sectionToCancel.id)}
              disabled={cancelMutation.isLoading}
            >
              {cancelMutation.isLoading ? (
                <span className="animate-spin size-4 border-2 border-white border-t-transparent rounded-fulanimate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></span>
              ) : (
                'Sí, quitar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { SubjectSelectionTable };

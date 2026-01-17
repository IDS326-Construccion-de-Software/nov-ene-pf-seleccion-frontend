import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Container, KeenIcon } from '@/components';
import { Toolbar, ToolbarHeading, ToolbarActions } from '@/layouts/applayout/toolbar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody
} from '@/components/ui/dialog';
import {
  SubjectPreselectionStatus,
  SubjectPreselectionFilters,
  SubjectPreselectionTable,
  SubjectPreselectionSchedule
} from './blocks';
import { useOfertaPreseleccion, useResumenPreseleccion } from './hooks/useOfertaPreseleccion';
import { getFase } from '@/services/periodoconfig/peridoconfig.service';
import { finalizarPreseleccion } from '@/services/preselection/preselection.service';

const SubjectPreselectionPage = () => {
  const { usuarioId = '2' } = useParams<{ usuarioId: string }>();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<any>({});
  const [showFaseDialog, setShowFaseDialog] = useState(false);
  const [faseActual, setFaseActual] = useState<string>('');
  const [canModify, setCanModify] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const verificarFase = async () => {
      try {
        const { fase } = await getFase();
        setFaseActual(fase);

        const puedeModificar = fase === 'Preseleccion';
        setCanModify(puedeModificar);

        if (fase !== 'Preseleccion') {
          setShowFaseDialog(true);
          setTimeout(() => {
            navigate('/');
          }, 6000);
        }
      } catch (error) {
        console.error('Error al obtener la fase:', error);
        toast.error('Error al verificar la fase del período');
        navigate('/');
      }
    };

    verificarFase();
  }, [navigate]);

  const {
    data,
    isLoading: isOfertaLoading,
    error: ofertaError,
    refetch: refetchOferta
  } = useOfertaPreseleccion(usuarioId, {
    searchTerm: filters.searchTerm,
    tipoAsignatura: filters.tipoAsignatura ? parseInt(filters.tipoAsignatura) : undefined,
    modalidad: filters.modalidad ? parseInt(filters.modalidad) : undefined,
    soloDisponibles: filters.soloDisponibles,
    periodo: filters.periodo ? parseInt(filters.periodo) : undefined,
    page: currentPage,
    itemsPerPage: itemsPerPage
  });

  const {
    data: resumenData,
    isLoading: isResumenLoading,
    error: resumenError,
    refetch: refetchResumen
  } = useResumenPreseleccion(usuarioId);

  console.log('Preselección - canModify:', canModify);

  const handleFilterChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const isLoading = isOfertaLoading || isResumenLoading;

  if (isLoading && !data && !resumenData) {
    return (
      <Container width="fluid" className="p-4 sm:p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Container>
    );
  }

  if ((ofertaError || resumenError) && !data && !resumenData) {
    return (
      <Container width="fluid" className="p-4 sm:p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          Error al cargar la información de preselección. Por favor intenta de nuevo más tarde.
        </div>
      </Container>
    );
  }

  const oferta = data?.oferta || [];
  const resumen = resumenData?.resumen || [];

  const resCarga = {
    ...(resumenData?.resumenCarga ||
      data?.resumenCarga || {
        creditosSeleccionados: 0,
        creditosMaximos: 0,
        puedeAgregarMas: false,
        mensajeEstado: ''
      }),
    totalAsignaturas:
      resumenData?.resumenCarga?.totalAsignaturas ??
      data?.resumenCarga?.totalAsignaturas ??
      resumen.length
  };

  return (
    <>
      <Dialog open={showFaseDialog} onOpenChange={() => {}}>
        <DialogContent className="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Preselección no disponible</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center">
                <KeenIcon icon="information-2" className="text-slate-600 text-3xl" />
              </div>
              <div className="text-center">
                <p className="text-gray-900 font-medium mb-2">
                  La preselección no está disponible en estos momentos
                </p>
                <p className="text-sm text-gray-600">
                  Consulte el calendario académico para más información
                </p>
                {faseActual && (
                  <p className="text-sm text-gray-500 mt-2">
                    Fase actual: <span className="font-semibold">{faseActual}</span>
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-4">Redirigiendo al inicio...</p>
              </div>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>

      {/* Solo renderizar el contenido si está en la fase correcta */}
      {faseActual === 'Preseleccion' && (
        <Container width="fluid" className="p-4 sm:p-8">
          <Toolbar>
            <ToolbarHeading
              title="Preselección de asignaturas"
              description="Preselecciona tus materias y arma tu horario academico"
            />
            <ToolbarActions>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-xs sm:text-sm px-2 sm:px-4"
              >
                <KeenIcon icon="share" /> <span className="hidden sm:inline">Share</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-xs sm:text-sm px-2 sm:px-4"
              >
                <KeenIcon icon="exit-up" /> <span className="hidden sm:inline">Exportar</span>
              </Button>
              <Button
                variant="destructive"
                className="flex items-center gap-2 text-xs sm:text-sm px-2 sm:px-4 bg-slate-800 hover:bg-slate-700"
                disabled={!canModify}
                onClick={async () => {
                  try {
                    const response = await finalizarPreseleccion(usuarioId);
                    if (response.success) {
                      toast.success(response.message || 'Preselección finalizada exitosamente');
                      refetchOferta();
                      refetchResumen();
                    } else {
                      toast.error(response.message || 'Error al finalizar la preselección');
                    }
                  } catch (error) {
                    toast.error('Error al finalizar la preselección');
                    console.error('Error:', error);
                  }
                }}
              >
                <KeenIcon icon="save-2" />{' '}
                <span className="hidden sm:inline ">Guardar Selección</span>
                <span className="sm:hidden">Guardar</span>
              </Button>
            </ToolbarActions>
          </Toolbar>

          <div className="grid gap-5 lg:gap-7.5 pb-10">
            <SubjectPreselectionSchedule oferta={resumen} />
            <SubjectPreselectionStatus resumen={resCarga} canModify={canModify} />
            <SubjectPreselectionFilters onFilterChange={handleFilterChange} />
            <SubjectPreselectionTable
              subjects={oferta}
              resumen={resumen}
              canModify={canModify}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={data?.totalItems || 0}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </Container>
      )}
    </>
  );
};

export { SubjectPreselectionPage };

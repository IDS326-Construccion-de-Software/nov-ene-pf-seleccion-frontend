import { Container, KeenIcon } from '@/components';
import { Toolbar, ToolbarHeading, ToolbarActions } from '@/layouts/applayout/toolbar';
import { Button } from '@/components/ui/button';
import { GeneralStatus, PaymentHistoryTable, NextPaymentCard, ReminderAlert } from './blocks';
import { useFinancialAccount } from './hooks';

const FinancialAccountOverviewPage = () => {
  const { data, isLoading, error } = useFinancialAccount();

  const handleDownloadStatement = () => {
    // TODO: Implementar descarga de estado
    console.log('Descargar estado...');
  };

  const handleMakePayment = () => {
    // TODO: Implementar modal/ruta de pago
    console.log('Realizar pago...');
  };

  return (
    <Container>
      <Toolbar>
        <ToolbarHeading
          title="Cuenta Financiera"
          description="Tu salud financiera estudiando en un vistazo."
        />
        <ToolbarActions>
          <Button onClick={handleDownloadStatement} className="gap-2" variant="outline">
            <KeenIcon iconName="file-down" />
            Descargar Estado
          </Button>
          <Button
            onClick={handleMakePayment}
            className="gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            Realizar Pago
          </Button>
        </ToolbarActions>
      </Toolbar>

      <div className="grid grid-cols-1 gap-6 pt-5">
        {/* Loading state */}
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="card bg-red-50 border border-red-200">
            <div className="card-body flex items-center gap-3">
              <KeenIcon iconName="information-circle" className="text-red-600 text-xl" />
              <div>
                <h4 className="font-semibold text-red-900">Error al cargar</h4>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : data ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <GeneralStatus data={data.overview} />
              </div>
              <NextPaymentCard data={data.proxima_cuota} />
            </div>

            <ReminderAlert amountLateFee={50} />

            <PaymentHistoryTable data={data.historial_pagos} />
          </>
        ) : null}
      </div>
    </Container>
  );
};

export { FinancialAccountOverviewPage };

import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, KeenIcon } from '@/components';
import { Button } from '@/components/ui/button';
import { PaymentForm } from '../financial-account-overview/blocks/PaymentForm';
import { type PaymentFormData, type PaymentResponse } from '../financial-account-overview/mocks/payment.mock';
import { processPayment } from '../financial-account-overview/services/payment.service';

interface LocationState {
  amount?: number;
  concept?: string;
}

interface PaymentPageProps {
  amount?: number;
  concept?: string;
}

export const PaymentPage = ({ amount: propAmount, concept: propConcept }: PaymentPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState<'form' | 'success' | 'error'>('form');
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);

  // Usar datos del location state si existen, sino usar los props
  const state = location.state as LocationState | null;
  const amount = useMemo(() => state?.amount || propAmount || 0, [state, propAmount]);
  const concept = useMemo(() => state?.concept || propConcept || 'Pago de Matrícula', [state, propConcept]);

  const handlePaymentSubmit = async (data: PaymentFormData) => {
    try {
      // Llamar al servicio de pagos
      // Este servicio maneja tanto mock como API real
      const response = await processPayment(data, amount, concept);

      setPaymentResponse(response);
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('error');
      throw error;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleNewPayment = () => {
    setPaymentStatus('form');
    setPaymentResponse(null);
  };

  return (
    <Container>
      <div className="py-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={handleGoBack}
            className="gap-2 mb-4"
            variant="outline"
          >
            <KeenIcon icon="arrow-left" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Procesamiento de Pago</h1>
          <p className="text-gray-600 mt-2">Completa tu pago de forma segura</p>
        </div>

        {/* Payment Form */}
        {paymentStatus === 'form' && (
          <PaymentForm
            amount={amount}
            concept={concept}
            onSubmit={handlePaymentSubmit}
            onCancel={handleGoBack}
          />
        )}

        {/* Success State */}
        {paymentStatus === 'success' && paymentResponse && (
          <div className="max-w-2xl mx-auto">
            <div className="card border border-green-100 shadow-sm bg-green-50">
              <div className="card-body p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <KeenIcon icon="check-circle" className="text-green-600 text-2xl" />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h2>
                  <p className="text-gray-600 mb-6">{paymentResponse.message}</p>

                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-600 mb-2">Número de Transacción</div>
                    <div className="text-lg font-mono font-bold text-gray-900">
                      {paymentResponse.transactionId}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-6">
                    Realizado el {new Date(paymentResponse.timestamp).toLocaleString('es-DO')}
                  </p>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleGoBack}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <KeenIcon icon="check" />
                      Ir a Mi Cuenta
                    </Button>
                    <Button
                      onClick={handleNewPayment}
                      className="flex-1"
                      variant="outline"
                    >
                      Realizar otro pago
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {paymentStatus === 'error' && (
          <div className="max-w-2xl mx-auto">
            <div className="card border border-red-100 shadow-sm bg-red-50">
              <div className="card-body p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                    <KeenIcon icon="information-circle" className="text-red-600 text-2xl" />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Error en el Pago</h2>
                  <p className="text-gray-600 mb-6">
                    Ocurrió un error al procesar tu pago. Por favor, intenta nuevamente.
                  </p>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleNewPayment}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white gap-2"
                    >
                      <KeenIcon icon="arrow-repeat" />
                      Intentar Nuevamente
                    </Button>
                    <Button
                      onClick={handleGoBack}
                      className="flex-1"
                      variant="outline"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

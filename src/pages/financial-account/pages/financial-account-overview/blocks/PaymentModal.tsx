import { useState } from 'react';
import { KeenIcon } from '@/components';
import { Button } from '@/components/ui/button';
import { PaymentForm } from './PaymentForm';
import { type PaymentFormData, type PaymentResponse } from '../mocks/payment.mock';
import { processPayment } from '../services/payment.service';

interface PaymentModalProps {
  isOpen: boolean;
  amount: number;
  concept: string;
  onClose: () => void;
  onSuccess?: (response: PaymentResponse) => void;
}

export const PaymentModal = ({
  isOpen,
  amount,
  concept,
  onClose,
  onSuccess
}: PaymentModalProps) => {
  const [paymentStatus, setPaymentStatus] = useState<'form' | 'success' | 'error'>('form');
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);

  const handlePaymentSubmit = async (data: PaymentFormData) => {
    try {
      // Llamar al servicio de pagos
      // Este servicio maneja tanto mock como API real
      const response = await processPayment(data, amount, concept);

      setPaymentResponse(response);
      setPaymentStatus('success');
      onSuccess?.(response);
    } catch (error) {
      setPaymentStatus('error');
      throw error;
    }
  };

  const handleClose = () => {
    setPaymentStatus('form');
    setPaymentResponse(null);
    onClose();
  };

  const handleNewPayment = () => {
    setPaymentStatus('form');
    setPaymentResponse(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/50 transition-opacity" onClick={handleClose} />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl">
            {/* Header */}
            {paymentStatus === 'form' && (
              <div className="sticky top-0 border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-white">
                <h2 className="text-xl font-bold text-gray-900">Procesamiento de Pago</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <KeenIcon icon="close" className="text-xl" />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="p-6">
              {/* Payment Form */}
              {paymentStatus === 'form' && (
                <PaymentForm
                  amount={amount}
                  concept={concept}
                  onSubmit={handlePaymentSubmit}
                  onCancel={handleClose}
                />
              )}

              {/* Success State */}
              {paymentStatus === 'success' && paymentResponse && (
                <div className="max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                      <KeenIcon icon="check-circle" className="text-green-600 text-2xl" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h2>
                    <p className="text-gray-600 mb-6">{paymentResponse.message}</p>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                      <div className="text-sm text-gray-600 mb-2">Número de Transacción</div>
                      <div className="text-lg font-mono font-bold text-gray-900">
                        {paymentResponse.transactionId}
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mb-6">
                      Realizado el{' '}
                      {new Date(paymentResponse.timestamp).toLocaleString('es-DO')}
                    </p>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleClose}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
                      >
                        <KeenIcon icon="check" />
                        Cerrar
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
              )}

              {/* Error State */}
              {paymentStatus === 'error' && (
                <div className="max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                      <KeenIcon
                        icon="information-circle"
                        className="text-red-600 text-2xl"
                      />
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
                        onClick={handleClose}
                        className="flex-1"
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

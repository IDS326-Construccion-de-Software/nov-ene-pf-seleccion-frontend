/**
 * Payment Service
 * 
 * Este servicio maneja todas las llamadas a la API de pagos.
 * Actualmente usa datos mock para desarrollo.
 * 
 * TODO: Reemplazar URLs y datos mock con endpoints reales cuando la API esté disponible
 * 
 * Endpoints esperados:
 * - POST /api/payments - Procesar pago
 * - GET /api/payments/history - Historial de pagos
 * - GET /api/payments/{transactionId} - Detalles de pago
 * - POST /api/payments/retry - Reintentar pago
 */

import { type PaymentFormData, type PaymentResponse, mockPaymentHistory, getMockPaymentDetails } from '../mocks/payment.mock';

// TODO: Descomenta cuando configures axios en el proyecto
// import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Procesa un pago de tarjeta de crédito
 * 
 * @param paymentData - Datos del formulario de pago
 * @param amount - Monto a pagar
 * @param concept - Concepto del pago
 * @returns Respuesta de transacción
 */
export const processPayment = async (
  paymentData: PaymentFormData,
  amount: number,
  concept: string
): Promise<PaymentResponse> => {
  try {
    // ============ MODO DESARROLLO (MOCK) ============
    // Simular delay de API (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Validar que todos los datos estén presentes (en desarrollo)
    if (!paymentData.cardholderName || !paymentData.cardNumber || !paymentData.expirationDate || !paymentData.cvv) {
      throw new Error('Faltan datos de la tarjeta');
    }

    // Simular respuesta exitosa
    const mockResponse: PaymentResponse = {
      success: true,
      transactionId: `TRX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      message: 'Pago procesado exitosamente',
      timestamp: new Date().toISOString()
    };

    return mockResponse;

    // ============ MODO PRODUCCIÓN (DESCOMENTAR CUANDO TENGA API) ============
    /*
    
    // NOTA: Para usar axios, primero instala:
    // npm install axios
    
    const paymentPayload = {
      cardholderName: paymentData.cardholderName,
      cardNumber: paymentData.cardNumber.replace(/\s/g, ''),
      expirationDate: paymentData.expirationDate,
      cvv: paymentData.cvv,
      amount: amount,
      concept: concept,
      currency: 'DOP'
    };

    const response = await axios.post<PaymentResponse>(
      `${API_BASE_URL}/payments`,
      paymentPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Si requiere autenticación
        },
        timeout: 30000 // 30 segundos de timeout
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al procesar el pago');
    }

    return response.data;
    
    */

  } catch (error) {
    console.error('Error en processPayment:', error);
    throw error;
  }
};

/**
 * Obtiene el historial de pagos del usuario
 * 
 * @returns Lista de pagos realizados
 */
export const getPaymentHistory = async () => {
  try {
    // ============ MODO DESARROLLO (MOCK) ============
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      data: mockPaymentHistory
    };

    // ============ MODO PRODUCCIÓN ============
    /*
    const response = await axios.get(
      `${API_BASE_URL}/payments/history`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        timeout: 15000
      }
    );

    return response.data;
    */

  } catch (error) {
    console.error('Error en getPaymentHistory:', error);
    throw error;
  }
};

/**
 * Obtiene detalles de un pago específico
 * 
 * @param transactionId - ID de la transacción
 * @returns Detalles del pago
 */
export const getPaymentDetails = async (transactionId: string) => {
  try {
    // ============ MODO DESARROLLO (MOCK) ============
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockDetail = getMockPaymentDetails(transactionId);

    return {
      success: true,
      data: mockDetail
    };

    // ============ MODO PRODUCCIÓN ============
    /*
    const response = await axios.get(
      `${API_BASE_URL}/payments/${transactionId}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    return response.data;
    */

  } catch (error) {
    console.error('Error en getPaymentDetails:', error);
    throw error;
  }
};

/**
 * Reintenta procesar un pago
 * 
 * @param transactionId - ID de la transacción original
 * @param paymentData - Datos del pago
 * @returns Nueva respuesta de transacción
 */
export const retryPayment = async (
  transactionId: string,
  paymentData: PaymentFormData
): Promise<PaymentResponse> => {
  try {
    // ============ MODO DESARROLLO (MOCK) ============
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      success: true,
      transactionId: `TRX-${Date.now()}-RETRY`,
      message: 'Pago reintentado exitosamente',
      timestamp: new Date().toISOString()
    };

    // ============ MODO PRODUCCIÓN ============
    /*
    const paymentPayload = {
      cardholderName: paymentData.cardholderName,
      cardNumber: paymentData.cardNumber.replace(/\s/g, ''),
      expirationDate: paymentData.expirationDate,
      cvv: paymentData.cvv,
      originalTransactionId: transactionId
    };

    const response = await axios.post<PaymentResponse>(
      `${API_BASE_URL}/payments/retry`,
      paymentPayload,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        timeout: 30000
      }
    );

    return response.data;
    */

  } catch (error) {
    console.error('Error en retryPayment:', error);
    throw error;
  }
};

/**
 * Payment Mock Data
 * Types and interfaces for payment system
 */

export interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
  timestamp: string;
}

// Mock payment history
export const mockPaymentHistory = [
  {
    id: 1,
    concept: 'Matrícula Trimestral',
    amount: 5000,
    status: 'completed',
    date: '2024-01-10',
    transactionId: 'TRX-2024-001'
  },
  {
    id: 2,
    concept: 'Matrícula Trimestral',
    amount: 5000,
    status: 'completed',
    date: '2023-10-05',
    transactionId: 'TRX-2024-002'
  }
];

// Mock payment details
export const getMockPaymentDetails = (transactionId: string) => ({
  transactionId,
  amount: 5000,
  concept: 'Matrícula Trimestral',
  status: 'completed',
  date: new Date().toISOString(),
  cardLast4: '3456',
  merchant: 'Institución Educativa'
});

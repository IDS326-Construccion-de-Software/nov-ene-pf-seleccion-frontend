import { useState, useCallback } from 'react';
import { type PaymentFormData } from '../mocks/payment.mock';

export interface PaymentFormErrors {
  cardholderName?: string;
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
}

export const usePaymentForm = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState<PaymentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar número de tarjeta usando algoritmo de Luhn
  const validateCardNumber = (cardNumber: string): boolean => {
    const sanitized = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(sanitized)) return false;

    let sum = 0;
    let isEven = false;

    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized[i], 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  // Validar fecha de expiración
  const validateExpirationDate = (date: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(date)) return false;

    const [month, year] = date.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const expYear = parseInt(year, 10);
    const expMonth = parseInt(month, 10);

    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
  };

  // Validar CVV
  const validateCVV = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv);
  };

  // Formatear número de tarjeta
  const formatCardNumber = (value: string): string => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim()
      .slice(0, 19);
  };

  // Formatear fecha de expiración
  const formatExpirationDate = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  // Manejar cambios en los campos
  const handleInputChange = useCallback(
    (field: keyof PaymentFormData, value: string) => {
      let formattedValue = value;

      if (field === 'cardNumber') {
        formattedValue = formatCardNumber(value);
      } else if (field === 'expirationDate') {
        formattedValue = formatExpirationDate(value);
      } else if (field === 'cvv') {
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
      }

      setFormData(prev => ({
        ...prev,
        [field]: formattedValue
      }));

      // Limpiar error del campo cuando el usuario empieza a escribir
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: undefined
        }));
      }
    },
    [errors]
  );

  // Validar formulario completo
  const validateForm = useCallback((): boolean => {
    const newErrors: PaymentFormErrors = {};

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'El nombre del titular es requerido';
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'El número de tarjeta es requerido';
    } else if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }

    if (!formData.expirationDate.trim()) {
      newErrors.expirationDate = 'La fecha de expiración es requerida';
    } else if (!validateExpirationDate(formData.expirationDate)) {
      newErrors.expirationDate = 'Fecha de expiración inválida o vencida';
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = 'El CVV es requerido';
    } else if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'CVV inválido (3-4 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Resetear formulario
  const resetForm = useCallback(() => {
    setFormData({
      cardholderName: '',
      cardNumber: '',
      expirationDate: '',
      cvv: ''
    });
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    validateForm,
    resetForm
  };
};

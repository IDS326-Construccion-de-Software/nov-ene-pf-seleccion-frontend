import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { KeenIcon } from '@/components';
import { type PaymentFormData } from '../mocks/payment.mock';

interface PaymentFormProps {
  amount: number;
  concept: string;
  onSubmit: (data: PaymentFormData) => Promise<void>;
  onCancel: () => void;
}

export const PaymentForm = ({ amount, concept, onSubmit, onCancel }: PaymentFormProps) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validar tarjeta con Luhn
  const luhnCheck = (num: string) => {
    let sum = 0;
    let isEven = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

  // Validaciones
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'El nombre del titular es requerido';
    }
    
    const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber) {
      newErrors.cardNumber = 'El número de tarjeta es requerido';
    } else if (!/^\d{13,19}$/.test(cleanCardNumber)) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    } else if (!luhnCheck(cleanCardNumber)) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }
    
    if (!formData.expirationDate) {
      newErrors.expirationDate = 'La fecha de expiración es requerida';
    } else {
      const [month, year] = formData.expirationDate.split('/');
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);
      
      if (monthNum < 1 || monthNum > 12 || formData.expirationDate.length !== 5) {
        newErrors.expirationDate = 'Formato inválido (MM/AA)';
      } else {
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
          newErrors.expirationDate = 'Tarjeta vencida';
        }
      }
    }
    
    if (!formData.cvv) {
      newErrors.cvv = 'El CVV es requerido';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV inválido (3-4 dígitos)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Formatear número de tarjeta
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  // Formatear fecha
  const formatExpirationDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    let formatted = value;
    
    if (field === 'cardNumber') {
      formatted = formatCardNumber(value);
    } else if (field === 'expirationDate') {
      formatted = formatExpirationDate(value);
    } else if (field === 'cvv') {
      formatted = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setFormData(prev => ({ ...prev, [field]: formatted }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mascarar número de tarjeta para preview
  const maskedCardNumber = useMemo(() => {
    if (!formData.cardNumber) return '•••• •••• •••• ••••';
    const cleaned = formData.cardNumber.replace(/\s/g, '');
    const last4 = cleaned.slice(-4);
    return `•••• •••• •••• ${last4}`;
  }, [formData.cardNumber]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Form */}
        <div className="space-y-4">
          {/* Amount Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-2">Monto a pagar</div>
            <div className="text-2xl font-bold text-gray-900 mb-3">
              {formatCurrency(amount)}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Concepto:</span> {concept}
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Titular
            </label>
            <input
              type="text"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              placeholder="Juan Pérez"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.cardholderName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.cardholderName && (
              <p className="mt-1 text-sm text-red-500">{errors.cardholderName}</p>
            )}
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Tarjeta
            </label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
            )}
          </div>

          {/* Expiration & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiración
              </label>
              <input
                type="text"
                value={formData.expirationDate}
                onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                placeholder="MM/AA"
                maxLength={5}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.expirationDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.expirationDate && (
                <p className="mt-1 text-sm text-red-500">{errors.expirationDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                placeholder="123"
                maxLength={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white gap-2"
            >
              {isSubmitting ? (
                <>
                  <KeenIcon icon="spinner" className="animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <KeenIcon icon="credit-card" />
                  Procesar Pago
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>

        {/* Right Column: Card Preview */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm">
            {/* 3D Card */}
            <div
              className="relative w-full aspect-video cursor-pointer"
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Card Front */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 rounded-lg shadow-lg p-6 flex flex-col justify-between text-white"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s'
                }}
              >
                {/* Chip */}
                <div className="w-12 h-10 bg-yellow-400 rounded-lg opacity-70" />
                
                {/* Card Number */}
                <div>
                  <div className="text-2xl font-mono tracking-widest">
                    {formData.cardNumber || '•••• •••• •••• ••••'}
                  </div>
                </div>
                
                {/* Bottom Info */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-70">TITULAR</p>
                    <p className="text-sm font-semibold">
                      {formData.cardholderName.toUpperCase() || 'NOMBRE TITULAR'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">VENCE</p>
                    <p className="text-lg font-mono">
                      {formData.expirationDate || 'MM/AA'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Back */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-center text-white"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: isCardFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                  transition: 'transform 0.6s'
                }}
              >
                {/* Magnetic Stripe */}
                <div className="w-full h-12 bg-black mb-6" />
                
                {/* CVV Box */}
                <div className="bg-white text-black p-3 rounded">
                  <p className="text-xs mb-1">CVV</p>
                  <p className="text-lg font-mono tracking-widest">
                    {formData.cvv ? '•'.repeat(formData.cvv.length) : '•••'}
                  </p>
                </div>
                
                {/* Last 4 Digits */}
                <div className="mt-6 text-right">
                  <p className="text-xs opacity-70">ÚLTIMOS 4 DÍGITOS</p>
                  <p className="text-2xl font-mono">
                    {formData.cardNumber.slice(-4) || '••••'}
                  </p>
                </div>
              </div>
            </div>

            {/* Flip Indicator */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <KeenIcon icon="refresh" className="text-lg" />
                {isCardFlipped ? 'Ver frente' : 'Girar para ver CVV'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

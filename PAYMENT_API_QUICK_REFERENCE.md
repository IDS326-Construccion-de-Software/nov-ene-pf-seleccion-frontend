/**
 * PLANTILLA RÁPIDA: Cómo cambiar de Mock a API Real
 * 
 * Copiar esta plantilla y adaptarla para cada función
 */

// ============ ANTES (MOCK) ============

/*
const handlePaymentSubmit = async (data: PaymentFormData) => {
  try {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Datos ficticios
    const response: PaymentResponse = {
      success: true,
      transactionId: `TRX-${Date.now()}`,
      message: 'Pago procesado exitosamente',
      timestamp: new Date().toISOString()
    };

    setPaymentResponse(response);
    setPaymentStatus('success');
  } catch (error) {
    setPaymentStatus('error');
    throw error;
  }
};
*/

// ============ DESPUÉS (API REAL) ============

/*
const handlePaymentSubmit = async (data: PaymentFormData) => {
  try {
    // Usar servicio que hace llamada real
    const response = await processPayment(data, amount, concept);

    setPaymentResponse(response);
    setPaymentStatus('success');
  } catch (error) {
    setPaymentStatus('error');
    throw error;
  }
};

// En payment.service.ts, descomentar:
export const processPayment = async (
  paymentData: PaymentFormData,
  amount: number,
  concept: string
): Promise<PaymentResponse> => {
  try {
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
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        timeout: 30000
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al procesar el pago');
    }

    return response.data;
  } catch (error) {
    console.error('Error en processPayment:', error);
    throw error;
  }
};
*/

// ============ CAMBIOS RÁPIDOS ============

/**
 * Lista de cambios en payment.service.ts:
 * 
 * 1. Descomentar:
 *    import axios from 'axios';
 * 
 * 2. En processPayment():
 *    - Comentar: await new Promise(resolve => setTimeout(resolve, 2000));
 *    - Comentar: const mockResponse = { ... }; return mockResponse;
 *    - Descomenta: const paymentPayload = { ... }
 *    - Descomentar: const response = await axios.post(...)
 * 
 * 3. Repetir para getPaymentHistory(), getPaymentDetails(), retryPayment()
 * 
 * 4. Verificar que .env.local tenga:
 *    VITE_API_URL=http://localhost:3000/api
 * 
 * 5. Instalar axios:
 *    npm install axios
 */

// ============ VERIFICACIÓN ============

/*
Pasos para verificar que funciona:

1. npm install axios

2. Crear .env.local:
   VITE_API_URL=http://localhost:3000/api

3. Abrir DevTools (F12)

4. Ir a pestaña Network

5. Hacer clic en "Realizar Pago"

6. Ver que aparezca llamada POST a /api/payments

7. Verificar que respuesta sea { success: true, transactionId: "..." }

8. Verificar que el modal muestre "¡Pago Exitoso!"
*/

// ============ ERRORES COMUNES ============

/*
❌ Error: "Cannot find module 'axios'"
✅ Solución: npm install axios

❌ Error: "CORS error"
✅ Solución: Backend debe tener CORS configurado:
  const cors = require('cors');
  app.use(cors({ origin: '*' }));

❌ Error: "401 Unauthorized"
✅ Solución: Verificar que localStorage.getItem('token') retorne un valor válido

❌ Error: "Network request failed"
✅ Solución: Verificar que backend esté corriendo en http://localhost:3000
           Verificar VITE_API_URL en .env.local

❌ Error: "The request timed out"
✅ Solución: Aumentar timeout en axios:
  timeout: 60000  // 60 segundos
*/

// ============ DESARROLLO ============

/*
Mientras desarrollas la API backend:

1. Mantén el MOCK activo durante desarrollo
2. Cuando backend esté listo, descomentar las secciones
3. Prueba primero en Postman/Insomnia
4. Luego prueba en la app
5. Verifica Network tab en DevTools

Los comentarios ya están preparados en payment.service.ts
Solo sigue las instrucciones en PAYMENT_API_INTEGRATION_GUIDE.md
*/

export default {
  message: 'Ver payment.service.ts para descomentar código de API'
};

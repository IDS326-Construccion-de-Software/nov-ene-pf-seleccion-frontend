/**
 * PAYMENT_API_BEFORE_AFTER_EXAMPLES.md
 * 
 * Ejemplos visuales de ANTES (mock) y DESPUÉS (API real)
 * para cada componente que usa la API de pagos
 */

# Ejemplos Antes/Después - API de Pagos

## Ejemplo 1: Payment Service - processPayment()

### ❌ ANTES (Modo Mock)

```typescript
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

  } catch (error) {
    console.error('Error en processPayment:', error);
    throw error;
  }
};
```

**Características del Mock:**
- ⏳ Delay artificial de 2 segundos
- 🎲 TransactionId generado aleatoriamente
- ✅ Siempre retorna success: true
- 📝 No valida datos realmente en el servidor
- ❌ No se conecta al backend

---

### ✅ DESPUÉS (API Real)

```typescript
export const processPayment = async (
  paymentData: PaymentFormData,
  amount: number,
  concept: string
): Promise<PaymentResponse> => {
  try {
    // ============ MODO PRODUCCIÓN ============
    // Construir payload para enviar al servidor
    const paymentPayload = {
      cardholderName: paymentData.cardholderName,
      cardNumber: paymentData.cardNumber.replace(/\s/g, ''),
      expirationDate: paymentData.expirationDate,
      cvv: paymentData.cvv,
      amount: amount,
      concept: concept,
      currency: 'DOP'
    };

    // Hacer llamada POST al servidor
    const response = await axios.post<PaymentResponse>(
      `${API_BASE_URL}/payments`,
      paymentPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        timeout: 30000 // 30 segundos
      }
    );

    // Verificar que la respuesta fue exitosa
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al procesar el pago');
    }

    // Retornar respuesta del servidor
    return response.data;

  } catch (error) {
    console.error('Error en processPayment:', error);
    throw error;
  }
};
```

**Características de API Real:**
- 🌐 Conecta a servidor backend
- 📤 Envía datos reales del formulario
- 🔐 Incluye token de autenticación
- ⏱️ Timeout de 30 segundos (configurable)
- ✔️ Valida respuesta del servidor
- 🔄 Maneja errores reales del servidor

**Cambios visibles en la app:**
- Network tab muestra POST a `/api/payments`
- Duración varía según servidor
- TransactionId viene del servidor (no aleatorio)
- Puede fallar si hay problemas de red/servidor

---

## Ejemplo 2: Payment Modal - Integración

### ❌ ANTES (Inline Mock)

```typescript
export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  concept
}) => {
  const [paymentStatus, setPaymentStatus] = useState<'form' | 'success' | 'error'>('form');
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);

  const handlePaymentSubmit = async (data: PaymentFormData) => {
    try {
      // ❌ Lógica de pago inline (acoplada)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse = {
        success: true,
        transactionId: `TRX-${Date.now()}`,
        message: 'Pago procesado',
        timestamp: new Date().toISOString()
      };

      setPaymentResponse(mockResponse);
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('error');
      throw error;
    }
  };

  return (
    // ... JSX del modal
  );
};
```

**Problemas:**
- ❌ Lógica de pago acoplada al componente
- ❌ No reutilizable en otras partes
- ❌ Difícil de testear
- ❌ Difícil de mantener

---

### ✅ DESPUÉS (Service Layer)

```typescript
// Importar el servicio
import { processPayment } from '../services/payment.service';

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  concept
}) => {
  const [paymentStatus, setPaymentStatus] = useState<'form' | 'success' | 'error'>('form');
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);

  const handlePaymentSubmit = async (data: PaymentFormData) => {
    try {
      // ✅ Usar servicio centralizado
      const response = await processPayment(data, amount, concept);

      setPaymentResponse(response);
      setPaymentStatus('success');
    } catch (error) {
      setPaymentStatus('error');
      throw error;
    }
  };

  return (
    // ... JSX del modal
  );
};
```

**Beneficios:**
- ✅ Lógica separada en servicio
- ✅ Reutilizable en payment.page.tsx también
- ✅ Fácil de testear
- ✅ Fácil de mantener y actualizar
- ✅ Una fuente de verdad para la lógica de pagos

---

## Ejemplo 3: Flujo Completo en DevTools

### ❌ ANTES (Mock)

**Console:**
```
PaymentModal.tsx:42 Iniciando pago...
PaymentModal.tsx:48 Simulando delay de 2 segundos...
(espera 2 segundos)
PaymentModal.tsx:52 Pago simulado exitoso: TRX-1704973200000-ABC123DEF
```

**Network:**
```
(Sin llamadas HTTP - todo es local)
```

**Application → LocalStorage:**
```
No hay cambios
```

---

### ✅ DESPUÉS (API Real)

**Console:**
```
payment.service.ts:35 Iniciando pago...
payment.service.ts:42 Enviando pago a API...
payment.service.ts:52 Respuesta recibida: { success: true, transactionId: "TRX-2024-001-ABC123", ... }
```

**Network:**
```
POST /api/payments
  Status: 200 OK
  Method: POST
  Domain: localhost:3000
  Type: fetch
  Size: 256 B / 412 B
  Time: 234 ms
  
Request Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
  Content-Type: application/json

Request Payload:
  {
    "cardholderName": "Juan Pérez",
    "cardNumber": "4532123456789876",
    "expirationDate": "12/25",
    "cvv": "123",
    "amount": 1000,
    "concept": "Pago de saldo",
    "currency": "DOP"
  }

Response:
  {
    "success": true,
    "transactionId": "TRX-2024-001-ABC123",
    "message": "Pago procesado exitosamente",
    "timestamp": "2024-01-15T10:30:45.000Z"
  }
```

**Application → LocalStorage:**
```
Posiblemente cambios si guarda estado de pagos
```

---

## Ejemplo 4: Manejo de Errores

### ❌ ANTES (Mock - No hay Errores)

```typescript
// Mock siempre retorna éxito
export const processPayment = async (
  paymentData: PaymentFormData,
  amount: number,
  concept: string
): Promise<PaymentResponse> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResponse: PaymentResponse = {
      success: true,  // ← Siempre true
      transactionId: `TRX-${Date.now()}`,
      message: 'Pago procesado exitosamente',
      timestamp: new Date().toISOString()
    };

    return mockResponse;
    // ❌ Nunca va a entrar al catch
  } catch (error) {
    console.error('Error en processPayment:', error);
    throw error;
  }
};
```

**Posibles errores del mock:**
- ❌ Validación de tarjeta débil
- ❌ Nunca falla por red
- ❌ Nunca falla por servidor
- ❌ No simula casos reales

---

### ✅ DESPUÉS (API Real - Errores Reales)

```typescript
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

    // ✅ Validar respuesta
    if (!response.data.success) {
      throw new Error(response.data.message || 'Error al procesar el pago');
    }

    return response.data;

  } catch (error) {
    // ✅ Captura errores reales:
    if (error instanceof axios.AxiosError) {
      if (error.response?.status === 400) {
        // Tarjeta rechazada, datos inválidos
        throw new Error('Tarjeta rechazada. Verifica los datos.');
      } else if (error.response?.status === 401) {
        // Token expirado
        throw new Error('Sesión expirada. Por favor, inicia sesión de nuevo.');
      } else if (error.response?.status === 500) {
        // Error del servidor
        throw new Error('Error en el servidor. Intenta más tarde.');
      } else if (error.code === 'ECONNABORTED') {
        // Timeout
        throw new Error('La solicitud tardó demasiado. Intenta de nuevo.');
      }
    }
    console.error('Error en processPayment:', error);
    throw error;
  }
};
```

**Posibles errores capturados:**
- ✅ Tarjeta rechazada (400)
- ✅ No autorizado (401)
- ✅ Datos inválidos (400)
- ✅ Error del servidor (500)
- ✅ Timeout de red
- ✅ No hay conexión a internet
- ✅ CORS policy

---

## Ejemplo 5: Testing del Cambio

### ❌ ANTES (Mock)

```typescript
// test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PaymentModal } from './PaymentModal';

test('Pago en modo mock', async () => {
  render(<PaymentModal isOpen={true} onClose={() => {}} amount={1000} concept="Test" />);
  
  // Llenar formulario
  fireEvent.change(screen.getByPlaceholderText(/Nombre/), { target: { value: 'Juan' } });
  fireEvent.change(screen.getByPlaceholderText(/Tarjeta/), { target: { value: '4532123456789876' } });
  
  // Hacer clic en enviar
  fireEvent.click(screen.getByText('Enviar'));
  
  // PROBLEMA: Test tarda 2+ segundos por el setTimeout
  await waitFor(() => {
    expect(screen.getByText(/exitoso/i)).toBeInTheDocument();
  }, { timeout: 3000 });
  
  // ❌ Test lento
  // ❌ No verifica conexión real
  // ❌ No verifica manejo de errores reales
});
```

---

### ✅ DESPUÉS (API Real)

```typescript
// test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as paymentService from './services/payment.service';
import { PaymentModal } from './PaymentModal';

// Mock del servicio
jest.mock('./services/payment.service');

test('Pago con API real', async () => {
  // Simular respuesta exitosa
  (paymentService.processPayment as jest.Mock).mockResolvedValue({
    success: true,
    transactionId: 'TRX-2024-TEST',
    message: 'Pago procesado',
    timestamp: '2024-01-15T10:30:45Z'
  });

  render(<PaymentModal isOpen={true} onClose={() => {}} amount={1000} concept="Test" />);
  
  // Llenar formulario
  fireEvent.change(screen.getByPlaceholderText(/Nombre/), { target: { value: 'Juan' } });
  fireEvent.change(screen.getByPlaceholderText(/Tarjeta/), { target: { value: '4532123456789876' } });
  
  // Hacer clic en enviar
  fireEvent.click(screen.getByText('Enviar'));
  
  // ✅ Test rápido (sin delay artificial)
  await waitFor(() => {
    expect(screen.getByText(/exitoso/i)).toBeInTheDocument();
    expect(paymentService.processPayment).toHaveBeenCalledWith(
      expect.objectContaining({ cardholderName: 'Juan' }),
      1000,
      'Test'
    );
  });
});

test('Manejo de error de API', async () => {
  // Simular error
  (paymentService.processPayment as jest.Mock).mockRejectedValue(
    new Error('Tarjeta rechazada')
  );

  render(<PaymentModal isOpen={true} onClose={() => {}} amount={1000} concept="Test" />);
  
  // ... llenar y enviar ...
  
  // ✅ Verifica manejo de error
  await waitFor(() => {
    expect(screen.getByText(/Tarjeta rechazada/i)).toBeInTheDocument();
  });
});
```

**Beneficios del cambio:**
- ✅ Tests más rápidos (sin delays)
- ✅ Fácil de mockear para testing
- ✅ Verifica manejo de errores reales
- ✅ Verifica interacción con servicio

---

## Ejemplo 6: Debugging en DevTools

### ❌ ANTES (Mock)

```
Console → No hay requests HTTP
No puedes ver:
  ❌ Payload enviado (no hay request)
  ❌ Respuesta del servidor (es mock local)
  ❌ Headers de autenticación
  ❌ Errors reales de network
```

---

### ✅ DESPUÉS (API Real)

```
DevTools → F12 → Network:

POST /api/payments → 200 OK (234ms)
  Puedes ver:
  ✅ Payload exacto enviado
  ✅ Headers (Authorization, Content-Type)
  ✅ Response JSON completo
  ✅ Timing real del servidor
  ✅ Cookies si las hay
  ✅ Errors si falla (4xx, 5xx)

Ejemplo:
  Request URL: http://localhost:3000/api/payments
  Request Method: POST
  Status Code: 200
  Remote Address: 127.0.0.1:3000
  
  Request Headers:
    Content-Type: application/json
    Authorization: Bearer eyJhbGciOiJ...
  
  Request Payload:
    {
      "cardholderName": "Juan Pérez",
      "cardNumber": "4532123456789876",
      "amount": 1000,
      ...
    }
  
  Response:
    {
      "success": true,
      "transactionId": "TRX-2024-001",
      "timestamp": "2024-01-15T10:30:45Z"
    }
```

---

## Ejemplo 7: Flujo de Errores

### ❌ ANTES (Mock)

```
Usuario ve:
→ Clic en "Realizar Pago"
→ Espera 2 segundos (artificial)
→ "¡Pago Exitoso!" (siempre éxito)
→ Nunca ve errores reales
```

---

### ✅ DESPUÉS (API Real)

```
Usuario ve:
→ Clic en "Realizar Pago"
→ Esperando respuesta del servidor...

Escenario 1: Éxito
→ "¡Pago Exitoso! ID: TRX-2024-001"

Escenario 2: Tarjeta rechazada
→ "Error: Tarjeta rechazada"
→ "Intenta con otra tarjeta"

Escenario 3: No hay internet
→ "Error: Sin conexión"
→ "Verifica tu conexión"

Escenario 4: Servidor caído
→ "Error: Servidor no disponible"
→ "Intenta más tarde"

Escenario 5: Token expirado
→ "Error: Sesión expirada"
→ "Por favor, inicia sesión"
```

---

## Resumen Visual

| Aspecto | Mock ❌ | API Real ✅ |
|--------|--------|----------|
| Conexión | Local | Servidor backend |
| Velocidad | 2 segundos artificial | Depende del servidor |
| Errores | Ninguno | Reales del servidor |
| Debugging | No hay request HTTP | Ve request/response en Network |
| Testing | Lento | Rápido (mockeable) |
| Producción | No listo | Listo para usar |
| Validación | Básica en cliente | Completa en servidor |
| Seguridad | Baja | Alta (con token) |

---

## Próximos Pasos

1. **Preparar:** Instala axios → Configura .env.local
2. **Descomentar:** Sigue PAYMENT_API_UNCOMMENT_GUIDE.md
3. **Verificar:** Prueba en Postman primero
4. **Testear:** En la app con DevTools abierto
5. **Commit:** Cuando todo funcione

El cambio de mock a API real es transparente para la UI. Solo cambia lo que pasa "detrás".

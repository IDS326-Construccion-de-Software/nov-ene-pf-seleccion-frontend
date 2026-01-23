# 🔌 Guía de Integración con API de Pagos

## Estado Actual

✅ Sistema completo de pagos con **MOCK DATA**
- Todos los componentes funcionales
- Validaciones implementadas
- UI/UX pulida

⚠️ Listo para conectar con API real

---

## Paso 1: Instalar Axios

```bash
npm install axios
```

---

## Paso 2: Configurar Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
# Desarrollo
VITE_API_URL=http://localhost:3000/api

# O si tienes servidor en otro puerto
VITE_API_URL=http://localhost:8080/api

# Producción
# VITE_API_URL=https://api.intec.edu.do/api
```

---

## Paso 3: Descomentar Código en `payment.service.ts`

Ubicación: `src/pages/financial-account/pages/financial-account-overview/services/payment.service.ts`

### 3.1 Descomentar el import de axios

```typescript
// Cambiar esto:
// import axios from 'axios';

// A esto:
import axios from 'axios';
```

### 3.2 Descomentar las llamadas a API

En cada función (`processPayment`, `getPaymentHistory`, etc.):

1. **Comenta** la sección "MODO DESARROLLO (MOCK)"
2. **Descomenta** la sección "MODO PRODUCCIÓN"

Ejemplo:

```typescript
export const processPayment = async (
  paymentData: PaymentFormData,
  amount: number,
  concept: string
): Promise<PaymentResponse> => {
  try {
    // Comentar todo esto:
    /*
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!paymentData.cardholderName || ...) { ... }
    
    const mockResponse: PaymentResponse = { ... };
    
    return mockResponse;
    */

    // Descomentar esto:
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
```

---

## Paso 4: Endpoints Esperados

Tu backend debe tener estos endpoints:

### POST `/api/payments` - Procesar Pago

**Request:**
```json
{
  "cardholderName": "JUAN PEREZ",
  "cardNumber": "4532123456789010",
  "expirationDate": "12/25",
  "cvv": "123",
  "amount": 400,
  "concept": "Matrícula Trimestral",
  "currency": "DOP"
}
```

**Response (Éxito):**
```json
{
  "success": true,
  "transactionId": "TRX-1705980123456-ABC123",
  "message": "Pago procesado exitosamente",
  "timestamp": "2025-01-23T15:30:00Z"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Número de tarjeta inválido",
  "timestamp": "2025-01-23T15:30:00Z"
}
```

### GET `/api/payments/history` - Historial de Pagos

**Response:**
```json
[
  {
    "transactionId": "TRX-1705980123456-ABC123",
    "amount": 400,
    "concept": "Matrícula Trimestral",
    "date": "2025-01-23T15:30:00Z",
    "status": "completed"
  }
]
```

### GET `/api/payments/{transactionId}` - Detalles de Pago

**Response:**
```json
{
  "transactionId": "TRX-1705980123456-ABC123",
  "amount": 400,
  "concept": "Matrícula Trimestral",
  "date": "2025-01-23T15:30:00Z",
  "status": "completed",
  "lastDigits": "9010"
}
```

### POST `/api/payments/retry` - Reintentar Pago

**Request:**
```json
{
  "originalTransactionId": "TRX-1705980123456-ABC123",
  "cardholderName": "JUAN PEREZ",
  "cardNumber": "4532123456789010",
  "expirationDate": "12/25",
  "cvv": "123"
}
```

---

## Paso 5: Autenticación (si requiere)

Si tu API requiere autenticación:

```typescript
// El servicio ya obtiene el token automáticamente:
const authHeader = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};

// Asegúrate de que el login guarde el token en localStorage:
localStorage.setItem('token', response.data.token);
```

---

## Paso 6: Manejo de Errores

El servicio ya maneja errores, pero puedes personalizar:

```typescript
// En payment.service.ts
catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      // Token expirado
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.response?.status === 400) {
      // Datos inválidos
      console.error('Datos de pago inválidos:', error.response.data);
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
      console.error('La solicitud tardó demasiado');
    }
  }
  throw error;
}
```

---

## Paso 7: Testing con Postman/Insomnia

1. Instala [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/)
2. Crea una request POST a `http://localhost:3000/api/payments`
3. En el body (JSON):

```json
{
  "cardholderName": "JUAN PEREZ",
  "cardNumber": "4532123456789010",
  "expirationDate": "12/25",
  "cvv": "123",
  "amount": 400,
  "concept": "Matrícula Trimestral",
  "currency": "DOP"
}
```

4. Prueba que la respuesta sea correcta

---

## Paso 8: Verificar en la Aplicación

1. En modo desarrollo, sigue apareciendo el spinner (2 segundos)
2. Una vez descomentes, debería conectar con tu API real
3. Verifica en DevTools → Network → XHR

---

## Archivos Relevantes

```
src/pages/financial-account/
├── config/
│   └── api.config.ts              ← Configuración centralizada
├── pages/
│   ├── financial-account-overview/
│   │   ├── blocks/
│   │   │   ├── PaymentForm.tsx      ← Formulario
│   │   │   └── PaymentModal.tsx     ← Modal (usa servicio)
│   │   ├── services/
│   │   │   └── payment.service.ts   ← 👈 DESCOMENTAR AQUÍ
│   │   └── hooks/
│   │       └── usePaymentForm.ts
│   └── payment/
│       └── payment.page.tsx         ← Página dedicada (usa servicio)
```

---

## Checklist de Implementación

- [ ] Instalar axios: `npm install axios`
- [ ] Crear `.env.local` con `VITE_API_URL`
- [ ] Descomentar import en `payment.service.ts`
- [ ] Descomentar código en cada función
- [ ] Verificar que backend tenga endpoints correcto
- [ ] Probar con Postman/Insomnia
- [ ] Verificar Network tab en DevTools
- [ ] Pruebas completas en la app
- [ ] Commit a git

---

## Debugging

Si hay problemas:

1. **Verificar CORS**
   ```typescript
   // Backend debe permitir frontend
   // npm install cors
   app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
   }));
   ```

2. **Ver errores en consola**
   ```
   F12 → Console → Buscar errores rojos
   ```

3. **Network tab**
   ```
   F12 → Network → Buscar requests a /api/payments
   ```

4. **Verificar token**
   ```javascript
   console.log(localStorage.getItem('token'))
   ```

---

**Última actualización:** 2025-01-23  
**Estado:** Listo para integración ✅

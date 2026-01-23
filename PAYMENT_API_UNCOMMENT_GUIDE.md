/**
 * PAYMENT_API_UNCOMMENT_GUIDE.md
 * 
 * Guía visual con números de línea exactos para descomentar
 * cuando el backend esté listo
 */

# Guía de Descomentado - Payment API

## Archivo: `payment.service.ts`

### Paso 1: Descomentar import de axios
**Ubicación:** Línea 13-14

```typescript
// ANTES (líneas 13-14):
// TODO: Descomenta cuando configures axios en el proyecto
// import axios from 'axios';

// DESPUÉS:
import axios from 'axios';

// Nota: Puedes eliminar las líneas de comentario TODO si lo deseas
```

---

### Paso 2: Función `processPayment()`
**Ubicación:** Línea 38-60 (mock) y 62-92 (producción)

#### 2.1 Comentar la sección MOCK (líneas 38-53)

```typescript
// COMENTAR ESTAS LÍNEAS:
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
```

#### 2.2 Descomentar la sección PRODUCCIÓN (líneas 54-92)

```typescript
// DESCOMENTAR ESTAS LÍNEAS:
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

// Resultado: El código comentado ahora está activo
```

---

### Paso 3: Función `getPaymentHistory()`
**Ubicación:** Línea 110-145

#### 3.1 Comentar la sección MOCK (líneas 110-121)

```typescript
// COMENTAR:
// ============ MODO DESARROLLO (MOCK) ============
await new Promise(resolve => setTimeout(resolve, 1000));
return {
  success: true,
  data: [
    // Mock data...
  ]
};
```

#### 3.2 Descomentar la sección PRODUCCIÓN (líneas 123-145)

```typescript
// DESCOMENTAR:
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
```

---

### Paso 4: Función `getPaymentDetails(transactionId)`
**Ubicación:** Línea 165-195

#### 4.1 Comentar la sección MOCK (líneas 165-185)

```typescript
// COMENTAR:
// ============ MODO DESARROLLO (MOCK) ============
await new Promise(resolve => setTimeout(resolve, 1000));
const mockDetail = {
  // Mock data...
};
return mockDetail;
```

#### 4.2 Descomentar la sección PRODUCCIÓN (líneas 187-195)

```typescript
// DESCOMENTAR:
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
```

---

### Paso 5: Función `retryPayment()`
**Ubicación:** Línea 210-228

#### 5.1 Comentar la sección MOCK (líneas 210-220)

```typescript
// COMENTAR:
// ============ MODO DESARROLLO (MOCK) ============
await new Promise(resolve => setTimeout(resolve, 2000));
return {
  success: true,
  transactionId: `TRX-${Date.now()}-RETRY`,
  message: 'Pago reintentado',
  timestamp: new Date().toISOString()
};
```

#### 5.2 Descomentar la sección PRODUCCIÓN (líneas 222-228)

```typescript
// DESCOMENTAR:
// ============ MODO PRODUCCIÓN ============
/*

// Enviar mismo payload que el original
const response = await axios.post(
  `${API_BASE_URL}/payments/retry`,
  payloadOriginal,
  {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    timeout: 30000
  }
);

return response.data;

*/
```

---

## Resumen de Cambios

| Función | Mock (comentar) | Producción (descomentar) | Estado |
|---------|-----------------|-------------------------|--------|
| `processPayment` | Línea 38-53 | Línea 54-92 | ⏳ |
| `getPaymentHistory` | Línea 110-121 | Línea 123-145 | ⏳ |
| `getPaymentDetails` | Línea 165-185 | Línea 187-195 | ⏳ |
| `retryPayment` | Línea 210-220 | Línea 222-228 | ⏳ |

---

## Verificación Rápida

Después de descomentar, asegúrate de:

1. **No hay errores en la consola**
   ```bash
   npm run dev
   # Revisar terminal para errores
   ```

2. **El archivo compila sin errores TypeScript**
   ```bash
   # En VS Code, abre payment.service.ts
   # Debe estar sin subrayados rojos (errores)
   ```

3. **El archivo tiene la estructura correcta**
   - [ ] import axios al inicio
   - [ ] 4 funciones export con código axios descomentado
   - [ ] Los comentarios de sección están descomentados
   - [ ] El código tipo `/*` `*/` está abierto

4. **Prueba en DevTools**
   - [ ] F12 → Network
   - [ ] Hacer pago
   - [ ] Ver llamada POST/GET a `/api/...`
   - [ ] Ver respuesta en Network tab

---

## ⚠️ Cambios Comunes que Rompen Cosas

❌ **MALO:** Dejar `/\*` sin cerrar (comentario sin cerrar)
```typescript
/*
const response = await axios.post(...) // ← Falta el */ al final
```

❌ **MALO:** Descomentar solo parte del código
```typescript
const response = await axios.post(  // ← Descomentado
  `${API_BASE_URL}/payments`,
  // ← Pero el resto sigue comentado!
```

❌ **MALO:** Olvidar descomentar el import de axios
```typescript
// import axios from 'axios';  // ← Sigue comentado!
// Luego: const response = await axios.post(...) // ← Error: axios no está definido
```

✅ **BIEN:** Seguir el patrón exacto
```typescript
import axios from 'axios';  // Descomentado

// ... código...

const response = await axios.post(
  `${API_BASE_URL}/payments`,
  paymentPayload,
  { headers: { ... } }
);

return response.data;
```

---

## 🔧 Si Algo Sale Mal

1. **Error: "Cannot find module 'axios'"**
   - [ ] `npm install axios`
   - [ ] Verificar que el import no esté comentado

2. **Error: "API endpoint not found"**
   - [ ] Verificar que backend tiene las rutas
   - [ ] Verificar que VITE_API_URL en .env.local es correcto

3. **Error: "CORS policy"**
   - [ ] Backend necesita configurar CORS
   - [ ] Ver Fase 4 del PAYMENT_API_CHECKLIST.md

4. **¿Vuelves a mock mientras debuggeas?**
   - [ ] Comentar el código axios de nuevo
   - [ ] Descomentar el código mock
   - [ ] Seguir debugging
   - [ ] Cuando esté listo, volver a descomenta axios

---

## 📋 Pasos Finales

Cuando estés listo para descomenta:

1. [ ] Haz un commit del estado actual:
   ```bash
   git add .
   git commit -m "Before API integration"
   ```

2. [ ] Sigue este guide línea por línea

3. [ ] Prueba cada función con Postman primero

4. [ ] Prueba en la aplicación

5. [ ] Haz commit cuando esté funcionando:
   ```bash
   git commit -m "API integration completed"
   ```

**Nota:** Si algo rompe, siempre puedes hacer `git revert` para volver atrás.

---

Este guía es específica para tu proyecto. Los números de línea pueden cambiar ligeramente si modificas payment.service.ts, pero la estructura es la misma.

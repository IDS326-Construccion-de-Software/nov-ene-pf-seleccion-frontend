# ✅ Checklist: API Integration de Pagos

## Fase 1: Preparación Inicial

### 1.1 Instalación de Dependencias
- [ ] Abrir terminal en la raíz del proyecto
- [ ] Ejecutar: `npm install axios`
- [ ] Verificar que axios aparezca en `package.json` bajo `dependencies`

### 1.2 Configuración de Variables de Entorno
- [ ] Crear archivo `.env.local` en la raíz del proyecto
- [ ] Agregar línea: `VITE_API_URL=http://localhost:3000/api`
- [ ] Reemplazar `localhost:3000` con la URL real del backend cuando esté disponible
- [ ] Verificar que el servidor de Vite auto-recarga cuando cambias `.env.local`

### 1.3 Verificación de Estructura
- [ ] Confirmar que `payment.service.ts` existe en:
  ```
  src/pages/financial-account/pages/financial-account-overview/services/payment.service.ts
  ```
- [ ] Confirmar que `api.config.ts` existe en:
  ```
  src/config/api.config.ts
  ```
- [ ] Confirmar que ambos archivos contienen comentarios con TODO

---

## Fase 2: Descomentar Código de Producción

### 2.1 En `payment.service.ts`

#### Paso 1: Descomentar import de axios
```typescript
// CAMBIAR ESTO:
// import axios from 'axios';

// A ESTO:
import axios from 'axios';
```

#### Paso 2: En la función `processPayment()` (línea ~38-60)
- [ ] Comentar esta sección:
  ```typescript
  // ============ MODO DESARROLLO (MOCK) ============
  await new Promise(resolve => setTimeout(resolve, 2000));
  // ... resto del código mock ...
  return mockResponse;
  ```

- [ ] Descomentar esta sección:
  ```typescript
  // ============ MODO PRODUCCIÓN (DESCOMENTAR CUANDO TENGA API) ============
  /*
  // ... código axios ...
  */
  ```

#### Paso 3: Repetir en otras funciones
- [ ] `getPaymentHistory()` (línea ~110-125)
- [ ] `getPaymentDetails(transactionId)` (línea ~165-180)
- [ ] `retryPayment(transactionId, paymentData)` (línea ~210-228)

**Patrón a seguir en cada función:**
```typescript
// Comentar:
await new Promise(resolve => setTimeout(resolve, 2000));
const mockResponse = { ... };
return mockResponse;

// Descomentar:
const response = await axios.get(...) // o axios.post(...) según la función
return response.data;
```

### 2.2 En `api.config.ts` (si es necesario)
- [ ] Verificar que `BASE_URL` apunta al endpoint correcto
- [ ] Si el backend está en diferente puerto/dominio, actualizar `VITE_API_URL` en `.env.local`

---

## Fase 3: Testing Local

### 3.1 Prueba en Postman/Insomnia
Antes de cambiar el código, verifica que los endpoints del backend funcionan:

#### Test 1: Procesar Pago
- [ ] Método: **POST**
- [ ] URL: `http://localhost:3000/api/payments`
- [ ] Headers:
  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer [TOKEN]"
  }
  ```
- [ ] Body:
  ```json
  {
    "cardholderName": "Juan Pérez",
    "cardNumber": "4532123456789876",
    "expirationDate": "12/25",
    "cvv": "123",
    "amount": 1000,
    "concept": "Pago de saldo",
    "currency": "DOP"
  }
  ```
- [ ] Respuesta esperada:
  ```json
  {
    "success": true,
    "transactionId": "TRX-123456-ABC123",
    "message": "Pago procesado exitosamente",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
  ```

#### Test 2: Historial de Pagos
- [ ] Método: **GET**
- [ ] URL: `http://localhost:3000/api/payments/history`
- [ ] Headers:
  ```json
  {
    "Authorization": "Bearer [TOKEN]"
  }
  ```
- [ ] Respuesta esperada:
  ```json
  {
    "success": true,
    "data": [
      {
        "transactionId": "TRX-123456-ABC123",
        "amount": 1000,
        "concept": "Pago de saldo",
        "timestamp": "2024-01-15T10:30:00.000Z",
        "status": "completed"
      }
    ]
  }
  ```

#### Test 3: Detalles de Pago
- [ ] Método: **GET**
- [ ] URL: `http://localhost:3000/api/payments/TRX-123456-ABC123`
- [ ] Respuesta esperada: Objeto de transacción completo

#### Test 4: Reintentar Pago
- [ ] Método: **POST**
- [ ] URL: `http://localhost:3000/api/payments/retry`
- [ ] Body: (igual que Test 1)
- [ ] Respuesta esperada: Nueva transacción con nuevo ID

### 3.2 Prueba en la Aplicación

#### Antes de cambiar el código:
1. [ ] npm run dev
2. [ ] Abrir DevTools (F12)
3. [ ] Ir a pestaña **Network**
4. [ ] Hacer clic en "Realizar Pago"
5. [ ] Llenar formulario con datos de prueba
6. [ ] Presionar "Enviar"
7. [ ] **Con mock:** Ver delay de 2 segundos
8. [ ] Ver transactionId en modal

#### Después de cambiar el código:
1. [ ] npm run dev (si no está corriendo)
2. [ ] Abrir DevTools (F12)
3. [ ] Ir a pestaña **Network**
4. [ ] Hacer clic en "Realizar Pago"
5. [ ] Llenar formulario
6. [ ] Presionar "Enviar"
7. [ ] **En Network:** Debe aparecer llamada `POST /api/payments`
8. [ ] Ver status: `200 OK`
9. [ ] Ver respuesta JSON en tab **Response**
10. [ ] Verificar que modal muestre transactionId real

---

## Fase 4: Depuración (Si Hay Errores)

### Error: CORS
**Síntoma:** En Console: `Access to XMLHttpRequest at 'http://localhost:3000/api/payments' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solución:**
El backend necesita configurar CORS. En Node.js/Express:
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

### Error: 401 Unauthorized
**Síntoma:** En Network: Response status `401 Unauthorized`

**Solución:**
1. [ ] Verificar que hay token en localStorage
2. [ ] Ejecutar en Console: `localStorage.getItem('token')`
3. [ ] Verificar que el token sea válido
4. [ ] Actualizar token si es necesario

### Error: 404 Not Found
**Síntoma:** En Network: Response status `404`

**Solución:**
1. [ ] Verificar que `VITE_API_URL` en `.env.local` es correcto
2. [ ] Verificar que backend tiene la ruta `/api/payments`
3. [ ] Verificar que backend está corriendo: `npm run dev` (backend)

### Error: The request timed out
**Síntoma:** En Console: `timeout of 30000ms exceeded`

**Solución:**
1. [ ] Backend tarda más de 30 segundos
2. [ ] Aumentar timeout en `payment.service.ts`:
   ```typescript
   timeout: 60000  // 60 segundos
   ```
3. [ ] Optimizar backend

### Error: Cannot find module 'axios'
**Síntoma:** En Console: `Module not found: 'axios'`

**Solución:**
- [ ] Ejecutar: `npm install axios`
- [ ] Limpiar caché: `rm -rf node_modules/.vite`
- [ ] Reiniciar servidor: `npm run dev`

---

## Fase 5: Validación Final

- [ ] Puede hacer clic en "Realizar Pago"
- [ ] Formulario valida en tiempo real
- [ ] Tarjeta de crédito muestra 3D flip correcto
- [ ] Al presionar "Enviar":
  - [ ] Se ve loader/spinner
  - [ ] Después de 2-3 segundos aparece modal de éxito
  - [ ] Modal muestra transactionId real (no mock)
  - [ ] Puede cerrar modal
  - [ ] Puede intentar otro pago
- [ ] En DevTools Network:
  - [ ] Aparece `POST /api/payments`
  - [ ] Status es `200 OK`
  - [ ] Response tiene `success: true`
  - [ ] Response tiene `transactionId`

---

## Archivos Clave para Referencia

| Archivo | Propósito |
|---------|-----------|
| `payment.service.ts` | Funciones de API (mock + comentadas) |
| `api.config.ts` | Configuración centralizada |
| `PaymentModal.tsx` | Interfaz de usuario |
| `payment.page.tsx` | Página dedicada |
| `.env.local` | Variables de entorno (crear) |
| `PAYMENT_API_INTEGRATION_GUIDE.md` | Guía completa (300+ líneas) |
| `PAYMENT_API_QUICK_REFERENCE.md` | Referencia rápida |

---

## ⏭️ Próximos Pasos

1. **Cuando backend esté listo:**
   - [ ] Verificar que endpoints están disponibles
   - [ ] Probar en Postman primero
   - [ ] Descomentar código en `payment.service.ts`
   - [ ] Actualizar `.env.local` con URL real

2. **Conexiones adicionales:**
   - [ ] Conectar historial de pagos a tabla
   - [ ] Integrar con financial account overview
   - [ ] Agregar notificaciones en tiempo real

3. **Seguridad:**
   - [ ] Verificar que token se envía correctamente
   - [ ] Implementar refresh token si es necesario
   - [ ] Nunca exponer datos sensibles en logs

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa **Fase 4: Depuración**
2. Verifica **PAYMENT_API_INTEGRATION_GUIDE.md** (guía completa)
3. Checkea DevTools → Network tab para ver solicitudes reales
4. Verifica que backend está corriendo y en puerto correcto

**Nota:** Este checklist te guía por todo el proceso. Sigue cada paso en orden para evitar problemas.

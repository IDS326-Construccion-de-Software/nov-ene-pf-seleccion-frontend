# Sistema de Pago - Documentación

## Descripción General
Se ha implementado un sistema completo de pago para la aplicación de Cuenta Financiera INTEC. El sistema incluye validaciones robustas, una interfaz moderna y soporte tanto para modal como para página dedicada.

## Componentes Creados

### 1. **PaymentForm.tsx** - Formulario Principal de Pago
**Ubicación:** `src/pages/financial-account/pages/financial-account-overview/blocks/PaymentForm.tsx`

Componente que renderiza el formulario de pago con dos columnas:
- **Columna Izquierda:** Formulario con campos de tarjeta
- **Columna Derecha:** Resumen de pago y vista previa interactiva de tarjeta

**Características:**
- Campos: Nombre titular, Número tarjeta, Fecha expiración, CVV
- Validaciones en tiempo real
- Vista previa de tarjeta (frente/reverso)
- Mostrar/ocultar CVV
- Formateo automático de números

**Props:**
```typescript
interface PaymentFormProps {
  amount: number;           // Monto a pagar
  concept: string;          // Concepto del pago
  onSubmit: (data: PaymentFormData) => Promise<void>;  // Callback envío
  onCancel?: () => void;    // Callback cancelación
}
```

### 2. **usePaymentForm.ts** - Hook de Validación
**Ubicación:** `src/pages/financial-account/pages/financial-account-overview/hooks/usePaymentForm.ts`

Hook personalizado que maneja toda la lógica del formulario de pago.

**Validaciones Implementadas:**
- ✅ Nombre del titular (requerido)
- ✅ Número de tarjeta (algoritmo de Luhn, 13-19 dígitos)
- ✅ Fecha de expiración (formato MM/AA, no vencida)
- ✅ CVV (3-4 dígitos)

**Funciones Principales:**
- `handleInputChange()` - Manejo de cambios con formateo automático
- `validateForm()` - Validación completa del formulario
- `formatCardNumber()` - Formato números tarjeta (XXXX XXXX...)
- `formatExpirationDate()` - Formato fecha (MM/AA)
- `validateCardNumber()` - Validación Luhn
- `validateExpirationDate()` - Validación fecha y vencimiento
- `validateCVV()` - Validación CVV
- `resetForm()` - Resetea el formulario

**Hook Return:**
```typescript
{
  formData: PaymentFormData;
  errors: PaymentFormErrors;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  handleInputChange: (field: keyof PaymentFormData, value: string) => void;
  validateForm: () => boolean;
  resetForm: () => void;
}
```

### 3. **PaymentModal.tsx** - Modal de Pago
**Ubicación:** `src/pages/financial-account/pages/financial-account-overview/blocks/PaymentModal.tsx`

Modal elegante para procesar pagos dentro de la página de cuenta financiera.

**Características:**
- Overlay oscuro con cierre al hacer click
- Tres estados: formulario, éxito, error
- Número de transacción
- Timestmap del pago
- Opción para realizar otro pago
- Botón de cierre inteligente

**Props:**
```typescript
interface PaymentModalProps {
  isOpen: boolean;
  amount: number;
  concept: string;
  onClose: () => void;
  onSuccess?: (response: PaymentResponse) => void;
}
```

### 4. **PaymentPage.tsx** - Página de Pago Dedicada
**Ubicación:** `src/pages/financial-account/pages/payment/payment.page.tsx`

Página completa de pago con opciones de navegación.

**Características:**
- Layout full-page para procesamiento de pago
- Botón para volver atrás
- Mismo formulario que el modal
- Estados: formulario, éxito, error
- Opción de realizar otro pago

**Props:**
```typescript
interface PaymentPageProps {
  amount?: number;
  concept?: string;
}
```

**Location State (alternativo):**
```typescript
interface LocationState {
  amount?: number;
  concept?: string;
}
```

### 5. **Tipos e Interfaces** - payment.mock.ts
**Ubicación:** `src/pages/financial-account/pages/financial-account-overview/mocks/payment.mock.ts`

Tipos TypeScript y datos mock para el sistema de pago.

**Interfaces:**
```typescript
interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

interface PaymentRequest {
  amount: number;
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  concept: string;
}

interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
  timestamp: string;
}
```

## Integración con la Aplicación

### 1. En el Componente Principal (financial-account-overview.component.tsx)

```typescript
import { PaymentModal } from './blocks';

// En el componente:
const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

// Renderizar modal:
<PaymentModal
  isOpen={isPaymentModalOpen}
  amount={data.overview.saldo_pendiente}
  concept="Matrícula Trimestral"
  onClose={() => setIsPaymentModalOpen(false)}
  onSuccess={handlePaymentSuccess}
/>
```

### 2. Rutas Configuradas (AppRoutingSetup.tsx)

```typescript
// Ruta dedicada de pago
<Route path="/financial-account/payment" element={<PaymentPage amount={0} concept="" />} />
```

## Validaciones Detalladas

### Número de Tarjeta
- Utiliza algoritmo de Luhn (estándar bancario)
- Aceptan 13-19 dígitos
- Formatea automáticamente: XXXX XXXX XXXX XXXX
- Valida tipo de tarjeta (Visa, Mastercard, Amex, etc.)

### Fecha de Expiración
- Formato: MM/AA (ejemplo: 12/25)
- Valida que no esté vencida
- Compara con fecha actual del sistema
- Rechaza fechas pasadas

### CVV
- Acepta 3-4 dígitos
- Previene copia de campo incorrecto
- Validación de formato numérico

### Nombre del Titular
- Campo requerido
- Sin caracteres especiales permitidos
- Trimea espacios

## Estados del Flujo de Pago

```
┌─────────────────────┐
│  Cargar Modal/Página │
└──────────┬──────────┘
           │
      ┌────▼────┐
      │ Formulario│ ◄──────┐
      └────┬────┘         │
           │              │
    (Usuario valida)      │ (Error)
           │              │
      ┌────▼────┐    ┌───┴───┐
      │Procesando│   │ Error │
      └────┬────┘    └───────┘
           │
    (API response)
           │
      ┌────▼────────┐
      │   Éxito      │
      │(Transacción) │
      └──────────────┘
```

## Estilos y Diseño

### Paleta de Colores
- **Error/Cancelar:** Red-600 (#DC2626)
- **Éxito:** Green-600 (#16A34A)
- **Información:** Gray-900 (#111827)
- **Fondo Modal:** Black/50 opacity (#00000080)

### Componentes Reutilizables
- `Button` - Componente de botón UI
- `KeenIcon` - Iconos de la aplicación
- `Container` - Contenedor de página

## Próximos Pasos - TODO

1. **Integración con API Real**
   - Reemplazar mock data con llamada a endpoint `/api/payments`
   - Implementar autenticación con JWT
   - Manejo de errores de servidor

2. **Seguridad**
   - Encriptación de datos de tarjeta
   - Implementar PCI-DSS compliance
   - Usar tokenización de tarjeta

3. **Confirmación de Email**
   - Enviar comprobante por email
   - Notificación push (opcional)

4. **Historial de Pagos**
   - Actualizar tabla de historial automáticamente
   - Refrescar saldo pendiente

5. **Métodos de Pago Alternativos**
   - Billetera digital
   - Transferencia bancaria
   - PayPal / Stripe

## Ejemplo de Uso

### Modal
```typescript
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Realizar Pago</Button>

<PaymentModal
  isOpen={isOpen}
  amount={400}
  concept="Matrícula Trimestral"
  onClose={() => setIsOpen(false)}
  onSuccess={(response) => console.log('Pago exitoso:', response)}
/>
```

### Página Dedicada
```typescript
navigate('/financial-account/payment', {
  state: {
    amount: 400,
    concept: 'Matrícula Trimestral'
  }
});
```

## Notas Importantes

- ✅ Sistema completamente responsivo (móvil y desktop)
- ✅ Validaciones en cliente (considerar agregar en servidor)
- ✅ Manejo de errores de usuario-friendly
- ✅ Accesibilidad básica (labels, ARIA)
- ⚠️ Mock API - Necesita integración con backend real
- ⚠️ No store sensible data - Todo debe ser encriptado

## Archivos Modificados

```
src/
├── pages/
│   └── financial-account/
│       └── pages/
│           ├── financial-account-overview/
│           │   ├── blocks/
│           │   │   ├── PaymentForm.tsx (NUEVO)
│           │   │   ├── PaymentModal.tsx (NUEVO)
│           │   │   └── index.ts (ACTUALIZADO)
│           │   ├── hooks/
│           │   │   └── usePaymentForm.ts (NUEVO)
│           │   ├── mocks/
│           │   │   └── payment.mock.ts (NUEVO)
│           │   └── financial-account-overview.component.tsx (ACTUALIZADO)
│           └── payment/
│               ├── payment.page.tsx (NUEVO)
│               └── index.ts (NUEVO)
└── routing/
    └── AppRoutingSetup.tsx (ACTUALIZADO)
```

---
**Última actualización:** 2025-01-23
**Versión:** 1.0.0

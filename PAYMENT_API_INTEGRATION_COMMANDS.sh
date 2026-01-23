#!/bin/bash
# PAYMENT_API_INTEGRATION_COMMANDS.sh
# 
# Comandos exactos para integrar la API de pagos en la aplicación
# Ejecuta cada comando en orden cuando el backend esté listo

# ============================================================================
# FASE 1: PREPARACIÓN
# ============================================================================

echo "=== FASE 1: PREPARACIÓN ==="
echo ""

# Paso 1.1: Verificar Node.js
echo "Paso 1.1: Verificar Node.js"
node --version
npm --version
echo ""

# Paso 1.2: Instalar axios
echo "Paso 1.2: Instalar axios"
echo "Ejecutar en terminal:"
echo "  npm install axios"
echo ""
echo "Después de instalar, verifica que fue exitoso:"
echo "  grep 'axios' package.json"
echo ""

# Paso 1.3: Crear .env.local
echo "Paso 1.3: Crear archivo .env.local"
echo "En la raíz del proyecto, crea .env.local con contenido:"
echo ""
echo "  VITE_API_URL=http://localhost:3000/api"
echo ""
echo "Reemplaza http://localhost:3000 con tu servidor real cuando esté listo"
echo ""

# ============================================================================
# FASE 2: VERIFICACIÓN
# ============================================================================

echo "=== FASE 2: VERIFICACIÓN ==="
echo ""

# Paso 2.1: Verificar estructura
echo "Paso 2.1: Verificar que archivos existen"
echo ""
echo "Ejecutar en terminal:"
echo "  ls -la src/pages/financial-account/pages/financial-account-overview/services/payment.service.ts"
echo "  ls -la src/config/api.config.ts"
echo "  ls -la .env.local"
echo ""

# Paso 2.2: Verificar contenido
echo "Paso 2.2: Verificar que payment.service.ts tiene comentarios"
echo ""
echo "Ejecutar en terminal:"
echo "  grep -n 'TODO:' src/pages/financial-account/pages/financial-account-overview/services/payment.service.ts"
echo "  grep -n 'MODO' src/pages/financial-account/pages/financial-account-overview/services/payment.service.ts"
echo ""

# ============================================================================
# FASE 3: TESTING LOCAL
# ============================================================================

echo "=== FASE 3: TESTING LOCAL ==="
echo ""

echo "Paso 3.1: Iniciar servidor de Vite"
echo "  npm run dev"
echo ""

echo "Paso 3.2: Abrir navegador"
echo "  http://localhost:5173"
echo ""

echo "Paso 3.3: Abrir DevTools"
echo "  F12"
echo "  Ir a Network tab"
echo ""

echo "Paso 3.4: Probar con mock (ANTES de descomentar)"
echo "  Ir a: Financial Account → Realizar Pago"
echo "  Llenar formulario"
echo "  Hacer clic en 'Enviar'"
echo "  Ver delay de 2 segundos"
echo "  Ver modal con transactionId (generado)"
echo ""

# ============================================================================
# FASE 4: DESCOMENTAR CÓDIGO
# ============================================================================

echo "=== FASE 4: DESCOMENTAR CÓDIGO ==="
echo ""

echo "Ver archivo: PAYMENT_API_UNCOMMENT_GUIDE.md"
echo ""

echo "Paso 4.1: Editar payment.service.ts"
echo "  1. Descomentar: import axios from 'axios'"
echo "  2. En processPayment(): comentar mock, descomentar producción"
echo "  3. En getPaymentHistory(): comentar mock, descomentar producción"
echo "  4. En getPaymentDetails(): comentar mock, descomentar producción"
echo "  5. En retryPayment(): comentar mock, descomentar producción"
echo ""

echo "Paso 4.2: Verificar sin errores"
echo "  En VS Code, abrir payment.service.ts"
echo "  No debe haber subrayados rojos (errores TypeScript)"
echo "  No debe haber sintaxis errors"
echo ""

# ============================================================================
# FASE 5: TESTING CON API
# ============================================================================

echo "=== FASE 5: TESTING CON API ==="
echo ""

echo "Paso 5.1: Verificar que backend está corriendo"
echo "  En otra terminal:"
echo "  (depende de tu backend, e.g., npm run dev o npm start)"
echo ""

echo "Paso 5.2: Verificar conexión con Postman"
echo "  1. Abrir Postman"
echo "  2. POST a http://localhost:3000/api/payments"
echo "  3. Headers: Content-Type: application/json, Authorization: Bearer [token]"
echo "  4. Body: { cardholderName: 'Test', cardNumber: '4532123456789876', ... }"
echo "  5. Click Send"
echo "  6. Verificar response 200 OK"
echo ""

echo "Paso 5.3: Probar en la aplicación"
echo "  1. npm run dev (frontend)"
echo "  2. Abrir DevTools (F12)"
echo "  3. Ir a Network tab"
echo "  4. Ir a Financial Account → Realizar Pago"
echo "  5. Llenar formulario"
echo "  6. Hacer clic en 'Enviar'"
echo "  7. En Network, debe aparecer POST /api/payments"
echo "  8. Status: 200 OK"
echo "  9. Ver respuesta en Response tab"
echo "  10. Modal debe mostrar transactionId real"
echo ""

# ============================================================================
# FASE 6: DEBUGGING (SI HAY ERRORES)
# ============================================================================

echo "=== FASE 6: DEBUGGING ==="
echo ""

echo "Problema 1: CORS Error"
echo "  Síntoma: Access to XMLHttpRequest ... has been blocked by CORS policy"
echo "  Solución: Backend necesita configurar CORS:"
echo "    const cors = require('cors');"
echo "    app.use(cors({ origin: '*' }));"
echo ""

echo "Problema 2: 401 Unauthorized"
echo "  Síntoma: Response status 401"
echo "  Solución: En Console, ejecutar:"
echo "    localStorage.getItem('token')"
echo "  Debe retornar un token válido"
echo ""

echo "Problema 3: 404 Not Found"
echo "  Síntoma: Response status 404"
echo "  Solución: Verificar que VITE_API_URL en .env.local es correcto"
echo "  Backend tiene endpoint /api/payments"
echo ""

echo "Problema 4: Cannot find module 'axios'"
echo "  Síntoma: Error en Console"
echo "  Solución:"
echo "    npm install axios"
echo "    npm run dev"
echo ""

echo "Problema 5: Timeout"
echo "  Síntoma: Error: timeout of 30000ms exceeded"
echo "  Solución: Backend tarda más de 30 segundos"
echo "  En payment.service.ts, aumentar timeout:"
echo "    timeout: 60000  // 60 segundos"
echo ""

# ============================================================================
# FASE 7: COMMIT
# ============================================================================

echo "=== FASE 7: COMMIT ==="
echo ""

echo "Paso 7.1: Antes de empezar"
echo "  git status"
echo "  git add ."
echo "  git commit -m 'Before API integration'"
echo ""

echo "Paso 7.2: Después de descomentar y verificar"
echo "  git status"
echo "  git diff src/pages/financial-account/pages/financial-account-overview/services/payment.service.ts"
echo "  git add src/pages/financial-account/pages/financial-account-overview/services/payment.service.ts"
echo "  git add .env.local"
echo "  git add package.json package-lock.json"
echo "  git commit -m 'API integration: uncommented axios calls'"
echo ""

echo "Paso 7.3: Si algo rompe y necesitas volver atrás"
echo "  git revert HEAD"
echo "  # O si no hiciste push:"
echo "  git reset --hard HEAD~1"
echo ""

# ============================================================================
# FASE 8: VALIDACIÓN FINAL
# ============================================================================

echo "=== FASE 8: VALIDACIÓN FINAL ==="
echo ""

echo "Checklist Final:"
echo "  ✓ npm install axios ejecutado"
echo "  ✓ .env.local creado con VITE_API_URL"
echo "  ✓ payment.service.ts descomentado (sin errores)"
echo "  ✓ Backend corriendo en http://localhost:3000"
echo "  ✓ Endpoints verificados en Postman"
echo "  ✓ npm run dev corriendo (frontend)"
echo "  ✓ DevTools Network mostrando POST /api/payments 200"
echo "  ✓ Modal muestra transactionId real"
echo "  ✓ Sin errores en console"
echo ""

# ============================================================================
# REFERENCIA RÁPIDA
# ============================================================================

echo "=== REFERENCIA RÁPIDA ==="
echo ""

echo "Archivos clave:"
echo "  • src/pages/financial-account/pages/financial-account-overview/services/payment.service.ts"
echo "  • src/config/api.config.ts"
echo "  • .env.local (crear)"
echo ""

echo "Documentación:"
echo "  • PAYMENT_API_INTEGRATION_GUIDE.md (300+ líneas completo)"
echo "  • PAYMENT_API_CHECKLIST.md (paso a paso)"
echo "  • PAYMENT_API_UNCOMMENT_GUIDE.md (números de línea exactos)"
echo "  • PAYMENT_API_BEFORE_AFTER_EXAMPLES.md (ejemplos visuales)"
echo "  • PAYMENT_API_QUICK_REFERENCE.md (referencia rápida)"
echo ""

echo "Comandos útiles:"
echo "  npm install axios"
echo "  npm run dev"
echo "  git log --oneline"
echo "  git status"
echo ""

echo ""
echo "============================================================================"
echo "🎉 Para ejecutar este archivo:"
echo "   bash PAYMENT_API_INTEGRATION_COMMANDS.sh"
echo ""
echo "📋 Para versión interactiva, sigue PAYMENT_API_CHECKLIST.md"
echo "📖 Para guía completa, lee PAYMENT_API_INTEGRATION_GUIDE.md"
echo "============================================================================"

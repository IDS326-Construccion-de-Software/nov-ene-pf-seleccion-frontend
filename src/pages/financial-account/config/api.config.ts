/**
 * API Configuration
 * 
 * Configuración centralizada para todas las llamadas a API
 * Facilita el cambio entre desarrollo y producción
 */

export const API_CONFIG = {
  // URL base de la API
  // Usa variable de entorno VITE_API_URL si está definida
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',

  // Endpoints de Pagos
  ENDPOINTS: {
    PAYMENTS: {
      PROCESS: '/payments',
      HISTORY: '/payments/history',
      DETAILS: (id: string) => `/payments/${id}`,
      RETRY: '/payments/retry',
      CANCEL: (id: string) => `/payments/${id}/cancel`
    },
    FINANCIAL_ACCOUNT: {
      OVERVIEW: '/financial-account/overview',
      BALANCE: '/financial-account/balance',
      HISTORY: '/financial-account/history'
    }
  },

  // Configuración de timeouts (en ms)
  TIMEOUTS: {
    SHORT: 5000,      // 5 segundos
    MEDIUM: 15000,    // 15 segundos
    LONG: 30000       // 30 segundos
  },

  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json'
  }
};

/**
 * Obtiene el header de autorización si existe token
 */
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

/**
 * Construye la URL completa de un endpoint
 */
export const buildUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export default API_CONFIG;

import { useState, useEffect } from 'react';
import {
  mockFinancialAccountData,
  type FinancialAccountData
} from '../mocks/financial-account.mock';

interface UseFinancialAccountOptions {
  usuarioId?: string;
  simulate_delay?: boolean;
}

export const useFinancialAccount = (options: UseFinancialAccountOptions = {}) => {
  const { simulate_delay = true } = options;
  const [data, setData] = useState<FinancialAccountData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Simular delay de API
        if (simulate_delay) {
          await new Promise((resolve) => setTimeout(resolve, 800));
        }

        // Por ahora usamos mock data
        // TODO: Reemplazar con llamada a API cuando esté disponible
        setData(mockFinancialAccountData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar datos financieros');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [simulate_delay]);

  return { data, isLoading, error };
};

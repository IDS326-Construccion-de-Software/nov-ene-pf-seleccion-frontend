export interface FinancialAccountOverview {
  saldo_pagado: number;
  saldo_pendiente: number;
  saldo_total: number;
  porcentaje_pagado: number;
}

export interface PaymentHistory {
  id: string;
  fecha: string;
  concepto: string;
  monto: number;
  estado: 'PAGADO' | 'PENDIENTE' | 'CANCELADO';
}

export interface FinancialAccountData {
  overview: FinancialAccountOverview;
  historial_pagos: PaymentHistory[];
  proxima_cuota: UpcomingPayment;
}

export interface UpcomingPayment {
  titulo: string;
  cuotaLabel: string;
  venceEl: string;
  restanteHoras: number;
  restanteMinutos: number;
  montoPendiente: number;
}

export const mockFinancialAccountData: FinancialAccountData = {
  overview: {
    saldo_pagado: 750.0,
    saldo_pendiente: 400.0,
    saldo_total: 1150.0,
    porcentaje_pagado: 65
  },
  proxima_cuota: {
    titulo: 'Matrícula Trimestral',
    cuotaLabel: 'Cuota 2 de 3',
    venceEl: '20 de Mayo',
    restanteHoras: 8,
    restanteMinutos: 14,
    montoPendiente: 400.0
  },
  historial_pagos: [
    {
      id: '1',
      fecha: '12 abr de 2025',
      concepto: 'Matrícula Trimestre 10',
      monto: 500.0,
      estado: 'PAGADO'
    },
    {
      id: '2',
      fecha: '10 abr de 2025',
      concepto: 'Matrícula Trimestre 9',
      monto: 500.0,
      estado: 'PAGADO'
    },
    {
      id: '3',
      fecha: '14 abr de 2025',
      concepto: 'Matrícula Trimestre 8',
      monto: 500.0,
      estado: 'PENDIENTE'
    },
    {
      id: '4',
      fecha: '05 mar de 2025',
      concepto: 'Laboratorio Trimestre 7',
      monto: 150.0,
      estado: 'PAGADO'
    },
    {
      id: '5',
      fecha: '28 feb de 2025',
      concepto: 'Seguro estudiantil',
      monto: 75.0,
      estado: 'PAGADO'
    },
    {
      id: '6',
      fecha: '15 feb de 2025',
      concepto: 'Matrícula Trimestre 7',
      monto: 500.0,
      estado: 'CANCELADO'
    },
    {
      id: '7',
      fecha: '10 ene de 2025',
      concepto: 'Matrícula Trimestre 6',
      monto: 500.0,
      estado: 'PAGADO'
    },
    {
      id: '8',
      fecha: '05 ene de 2025',
      concepto: 'Laboratorio Trimestre 6',
      monto: 150.0,
      estado: 'PAGADO'
    },
    {
      id: '9',
      fecha: '20 dic de 2024',
      concepto: 'Matrícula Trimestre 5',
      monto: 500.0,
      estado: 'PAGADO'
    },
    {
      id: '10',
      fecha: '15 nov de 2024',
      concepto: 'Matrícula Trimestre 4',
      monto: 500.0,
      estado: 'PAGADO'
    },
    {
      id: '11',
      fecha: '02 oct de 2024',
      concepto: 'Seguro estudiantil',
      monto: 75.0,
      estado: 'PAGADO'
    },
    {
      id: '12',
      fecha: '01 sep de 2024',
      concepto: 'Matrícula Trimestre 3',
      monto: 500.0,
      estado: 'PAGADO'
    }
  ]
};

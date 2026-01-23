import { useMemo, useState } from 'react';
import { KeenIcon } from '@/components';
import { type PaymentHistory } from '../mocks/financial-account.mock';

interface PaymentHistoryProps {
  data: PaymentHistory[];
}

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'PAGADO':
      return 'badge-success';
    case 'PENDIENTE':
      return 'badge-warning';
    case 'CANCELADO':
      return 'badge-danger';
    default:
      return 'badge-secondary';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'PAGADO':
      return 'check-circle';
    case 'PENDIENTE':
      return 'information-circle';
    case 'CANCELADO':
      return 'cross-circle';
    default:
      return 'question-circle';
  }
};

export const PaymentHistoryTable = ({ data }: PaymentHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'TODOS' | 'PAGADO' | 'PENDIENTE' | 'CANCELADO'>(
    'TODOS'
  );
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP'
    }).format(value);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = `${item.concepto} ${item.fecha}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'TODOS' ? true : item.estado === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (safeCurrentPage <= 3) return [1, 2, 3, 4, '…', totalPages];
    if (safeCurrentPage >= totalPages - 2)
      return [1, '…', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

    return [1, '…', safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, '…', totalPages];
  }, [safeCurrentPage, totalPages]);

  return (
    <div className="card border border-gray-100 shadow-sm">
      <div className="card-header border-b border-gray-100">
        <div>
          <h3 className="card-title">Historial de pago</h3>
          <p className="text-sm text-gray-600">Revisa las transacciones anteriores.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <KeenIcon
              icon="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar pago"
              className="pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 min-w-[200px] bg-white"
            />
          </div>

          <div className="relative">
            <KeenIcon
              icon="filter"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="pl-9 pr-8 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 min-w-[140px] appearance-none"
            >
              <option value="TODOS">Todos</option>
              <option value="PAGADO">Pagado</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
            <KeenIcon
              icon="chevron-down"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left font-semibold text-gray-700 py-3 px-4">Fecha</th>
                <th className="text-left font-semibold text-gray-700 py-3 px-4">Concepto</th>
                <th className="text-center font-semibold text-gray-700 py-3 px-4">Monto</th>
                <th className="text-center font-semibold text-gray-700 py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((payment, index) => (
                <tr
                  key={payment.id}
                  className={index !== paginatedData.length - 1 ? 'border-b border-gray-50' : ''}
                >
                  <td className="py-4 px-4 text-gray-600">{payment.fecha}</td>
                  <td className="py-4 px-4 text-gray-900 font-medium">{payment.concepto}</td>
                  <td className="py-4 px-4 text-center text-gray-900 font-semibold">
                    {formatCurrency(payment.monto)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`badge ${getStatusBadgeColor(payment.estado)}`}>
                      {payment.estado}
                    </span>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    No se encontraron pagos con esos criterios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Mostrar</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span>por página</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-700">
            <span>
              {filteredData.length === 0
                ? '0 resultados'
                : `${startIndex + 1}-${endIndex} de ${filteredData.length}`}
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className="px-2 py-1 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
              >
                <KeenIcon icon="chevron-left" />
              </button>

              {pageNumbers.map((num, idx) =>
                typeof num === 'number' ? (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(num)}
                    className={`px-3 py-1 rounded-md border ${
                      num === safeCurrentPage
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {num}
                  </button>
                ) : (
                  <span key={idx} className="px-2 text-gray-500">
                    {num}
                  </span>
                )
              )}

              <button
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className="px-2 py-1 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
              >
                <KeenIcon icon="chevron-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

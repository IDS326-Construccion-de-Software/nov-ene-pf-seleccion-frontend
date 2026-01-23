import React from 'react';
import { KeenIcon } from '@/components';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50]
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  if (totalItems === 0) return null;

  const renderPageButtons = () => {
    return Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
      let pageNum = currentPage;
      if (totalPages <= 5) pageNum = i + 1;
      else if (currentPage <= 3) pageNum = i + 1;
      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
      else pageNum = currentPage - 2 + i;

      return (
        <Button
          key={pageNum}
          variant={currentPage === pageNum ? 'outline' : 'ghost'}
          size="icon"
          className={`size-8 font-bold ${
            currentPage === pageNum ? 'bg-gray-200 border-none text-gray-700' : ''
          }`}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </Button>
      );
    });
  };

  return (
    <div className="p-4  flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-gray-600 border border-gray-200 rounded-xl overflow-hidden mt-2">
      <div className="flex items-center gap-2 order-2 md:order-1">
        Mostrar{' '}
        <select
          className="bg-white border rounded-lg p-1 outline-none focus:ring-1 focus:ring-gray-400"
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
            onPageChange(1);
          }}
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>{' '}
        por página
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 order-1 md:order-2">
        <span className="text-[14px] text-gray-600">
          {totalItems > 0 ? startIndex + 1 : 0}-{endIndex} de {totalItems}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <KeenIcon icon="left" />
          </Button>

          {renderPageButtons()}

          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <KeenIcon icon="right" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Pagination };

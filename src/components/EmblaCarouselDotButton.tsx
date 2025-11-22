import React from 'react';

export type DotButtonProps = {
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export const DotButton: React.FC<DotButtonProps> = ({ selected, onClick, className }) => (
  <button
    type="button"
    aria-label="Ir al slide"
    className={className}
    onClick={onClick}
    style={{ opacity: selected ? 1 : 0.5 }}
  />
);

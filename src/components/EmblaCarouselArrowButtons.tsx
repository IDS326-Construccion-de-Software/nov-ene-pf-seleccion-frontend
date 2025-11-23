import React from 'react';

export type ArrowButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const PrevButton: React.FC<Omit<ArrowButtonProps, 'children'>> = ({
  onClick,
  disabled,
  className
}) => (
  <button
    type="button"
    aria-label="Anterior"
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    &#8592;
  </button>
);

export const NextButton: React.FC<Omit<ArrowButtonProps, 'children'>> = ({
  onClick,
  disabled,
  className
}) => (
  <button
    type="button"
    aria-label="Siguiente"
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    &#8594;
  </button>
);

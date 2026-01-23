/**
 * Formatea una hora en formato 24 horas a formato 12 horas con AM/PM
 */
export const formatTime = (time: string): string => {
  const parts = time.split(':');
  const hour = parseInt(parts[0]);
  const minutes = parts[1] || '00';

  if (hour === 0) return `12:${minutes} AM`;
  if (hour < 12) return `${hour}:${minutes} AM`;
  if (hour === 12) return `12:${minutes} PM`;
  return `${hour - 12}:${minutes} PM`;
};

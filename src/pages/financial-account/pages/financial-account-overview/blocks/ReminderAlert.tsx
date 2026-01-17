import { KeenIcon } from '@/components';

interface ReminderAlertProps {
  amountLateFee: number;
}

export const ReminderAlert = ({ amountLateFee }: ReminderAlertProps) => (
  <div className="card bg-amber-50/70 border border-amber-100 shadow-sm">
    <div className="card-body flex items-start gap-3 text-sm text-amber-800">
      <KeenIcon iconName="warning-2" className="text-amber-500 text-xl mt-0.5" />
      <p>
        Evita cargos por mora de{' '}
        <span className="font-semibold">{amountLateFee.toFixed(2)} DOP</span> realizando tu pago
        antes de la fecha límite.
      </p>
    </div>
  </div>
);

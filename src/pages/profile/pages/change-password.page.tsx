import { useState } from 'react';
import clsx from 'clsx';
import { Alert, KeenIcon } from '@/components';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Regex: Min 8 chars, 1 uppercase, 1 number
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!currentPassword.trim()) {
      setError('La contraseña actual es requerida.');
      setLoading(false);
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      setError('La nueva contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas nuevas no coinciden.');
      setLoading(false);
      return;
    }

    // Simulación de éxito visual
    setTimeout(() => {
      setSuccess('Contraseña actualizada correctamente.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
    }, 1000);
  };

  const togglePassword = (
    e: React.MouseEvent<HTMLButtonElement>,
    field: 'current' | 'new' | 'confirm'
  ) => {
    e.preventDefault();
    if (field === 'current') setShowCurrentPassword(!showCurrentPassword);
    if (field === 'new') setShowNewPassword(!showNewPassword);
    if (field === 'confirm') setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen">
      <div className="card max-w-[450px] w-full">
        <form className="card-body flex flex-col gap-5 p-10" onSubmit={handleSubmit} noValidate>
          <h3 className="text-2xl font-semibold text-gray-900 text-center leading-none mb-2.5">
            Cambiar Contraseña
          </h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Contraseña Actual</label>
            <label className="input">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Escribir contraseña actual"
                autoComplete="off"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="form-control"
                required
              />
              <button className="btn btn-icon" onClick={e => togglePassword(e, 'current')}>
                <KeenIcon
                  icon="eye"
                  className={clsx('text-gray-500', { hidden: showCurrentPassword })}
                />
                <KeenIcon
                  icon="eye-slash"
                  className={clsx('text-gray-500', { hidden: !showCurrentPassword })}
                />
              </button>
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Nueva Contraseña</label>
            <label className="input">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Escribir nueva contraseña"
                autoComplete="off"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="form-control"
                required
              />
              <button className="btn btn-icon" onClick={e => togglePassword(e, 'new')}>
                <KeenIcon
                  icon="eye"
                  className={clsx('text-gray-500', { hidden: showNewPassword })}
                />
                <KeenIcon
                  icon="eye-slash"
                  className={clsx('text-gray-500', { hidden: !showNewPassword })}
                />
              </button>
            </label>
            <span className="text-2xs text-gray-600">Mínimo 8 caracteres, 1 mayúscula, 1 número</span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Confirmar Nueva Contraseña</label>
            <label className="input">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar nueva contraseña"
                autoComplete="off"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="form-control"
                required
              />
              <button className="btn btn-icon" onClick={e => togglePassword(e, 'confirm')}>
                <KeenIcon
                  icon="eye"
                  className={clsx('text-gray-500', { hidden: showConfirmPassword })}
                />
                <KeenIcon
                  icon="eye-slash"
                  className={clsx('text-gray-500', { hidden: !showConfirmPassword })}
                />
              </button>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary flex justify-center grow"
            disabled={loading}
          >
            {loading ? 'Por favor espere...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export { ChangePasswordPage };

import { useState } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Container, Alert } from '@/components';
import { KeenIcon } from '@/components';
import { useAuthContext } from '@/auth';
import { useNavigate } from 'react-router-dom';
import * as authService from '@/services/auth/auth.service';

const changePasswordSchema = Yup.object().shape({
  passwordActual: Yup.string().required('La contraseña actual es requerida'),
  nuevaPassword: Yup.string()
    .required('La nueva contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/^(?=.*[A-Z])(?=.*\d)/, 'Debe tener al menos 1 mayúscula y 1 número'),
  confirmarPassword: Yup.string()
    .required('Debe confirmar la nueva contraseña')
    .oneOf([Yup.ref('nuevaPassword')], 'Las contraseñas no coinciden')
});

const ProfileChangePasswordPage = () => {
  const navigate = useNavigate();
  const { auth, currentUser, logout } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      passwordActual: '',
      nuevaPassword: '',
      confirmarPassword: ''
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        if (!auth?.access_token) {
          throw new Error('No hay sesión activa');
        }

        await authService.changePassword(auth.access_token, {
          correoInstitucional: currentUser?.email,
          passwordActual: values.passwordActual,
          nuevaPassword: values.nuevaPassword,
          confirmarPassword: values.confirmarPassword
        });

        setStatus('Contraseña actualizada correctamente');
        // Opcional: cerrar sesión para reautenticar
        await logout();
        navigate('/auth/login', { replace: true });
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'Error al cambiar la contraseña';
        setStatus(message);
        setSubmitting(false);
      } finally {
        setLoading(false);
      }
    }
  });

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !formik.isSubmitting && !loading) {
      event.preventDefault();
      formik.submitForm();
    }
  };

  return (
    <Container className="flex justify-center">
      <div className="card w-full max-w-[520px]">
        <div className="card-header pb-0">
          <div className="card-title text-xl font-semibold">Cambiar contraseña</div>
          <div className="text-sm text-gray-600">Actualiza tu contraseña por seguridad</div>
        </div>

        <form className="card-body flex flex-col gap-5" onSubmit={formik.handleSubmit} noValidate>
          {formik.status && <Alert variant="success">{formik.status}</Alert>}

          {/* Contraseña actual */}
          <div className="flex flex-col gap-1">
            <label className="form-label">Contraseña actual</label>
            <label className="input">
              <input
                type={showCurrent ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña actual"
                autoComplete="current-password"
                {...formik.getFieldProps('passwordActual')}
                onKeyDown={handleEnter}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.passwordActual && formik.errors.passwordActual
                })}
              />
              <button type="button" className="btn btn-icon" onClick={() => setShowCurrent(!showCurrent)}>
                <KeenIcon icon={showCurrent ? 'eye-slash' : 'eye'} className="text-gray-500" />
              </button>
            </label>
            {formik.touched.passwordActual && formik.errors.passwordActual && (
              <span className="text-danger text-xs">{formik.errors.passwordActual}</span>
            )}
          </div>

          {/* Nueva contraseña */}
          <div className="flex flex-col gap-1">
            <label className="form-label">Nueva contraseña</label>
            <label className="input">
              <input
                type={showNew ? 'text' : 'password'}
                placeholder="Ingresa tu nueva contraseña"
                autoComplete="new-password"
                {...formik.getFieldProps('nuevaPassword')}
                onKeyDown={handleEnter}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.nuevaPassword && formik.errors.nuevaPassword
                })}
              />
              <button type="button" className="btn btn-icon" onClick={() => setShowNew(!showNew)}>
                <KeenIcon icon={showNew ? 'eye-slash' : 'eye'} className="text-gray-500" />
              </button>
            </label>
            {formik.touched.nuevaPassword && formik.errors.nuevaPassword && (
              <span className="text-danger text-xs">{formik.errors.nuevaPassword}</span>
            )}
            <p className="text-2xs text-gray-600">Mínimo 8 caracteres, 1 mayúscula y 1 número.</p>
          </div>

          {/* Confirmar contraseña */}
          <div className="flex flex-col gap-1">
            <label className="form-label">Confirmar contraseña</label>
            <label className="input">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirma tu nueva contraseña"
                autoComplete="new-password"
                {...formik.getFieldProps('confirmarPassword')}
                onKeyDown={handleEnter}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.confirmarPassword && formik.errors.confirmarPassword
                })}
              />
              <button type="button" className="btn btn-icon" onClick={() => setShowConfirm(!showConfirm)}>
                <KeenIcon icon={showConfirm ? 'eye-slash' : 'eye'} className="text-gray-500" />
              </button>
            </label>
            {formik.touched.confirmarPassword && formik.errors.confirmarPassword && (
              <span className="text-danger text-xs">{formik.errors.confirmarPassword}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading || formik.isSubmitting}>
            {loading ? 'Guardando...' : 'Guardar y cerrar sesión'}
          </button>
        </form>
      </div>
    </Container>
  );
};

export { ProfileChangePasswordPage };

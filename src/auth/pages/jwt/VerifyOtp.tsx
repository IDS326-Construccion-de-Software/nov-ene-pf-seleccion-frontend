import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { KeenIcon, Alert } from '@/components';
import { useLayout } from '@/providers';
import { toAbsoluteUrl } from '@/utils';
import * as authService from '@/services/auth/auth.service';

const verifyOtpSchema = Yup.object().shape({
  codigoOtp: Yup.string()
    .required('El código OTP es requerido')
    .matches(/^\d+$/, 'El código OTP debe contener solo números')
    .length(5, 'El código OTP debe tener 5 dígitos'),
  nuevaPassword: Yup.string()
    .required('La nueva contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos 1 mayúscula y 1 número'
    ),
  confirmarPassword: Yup.string()
    .required('Debe confirmar la nueva contraseña')
    .oneOf([Yup.ref('nuevaPassword')], 'Las contraseñas no coinciden')
});

const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { currentLayout } = useLayout();

  const formik = useFormik({
    initialValues: {
      codigoOtp: '',
      nuevaPassword: '',
      confirmarPassword: ''
    },
    validationSchema: verifyOtpSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);

      try {
        // Obtener correo del localStorage
        const recoveryEmail = localStorage.getItem('recoveryEmail');

        if (!recoveryEmail) {
          throw new Error('Sesión expirada. Por favor, intenta nuevamente desde el inicio.');
        }

        const payload = {
          correoInstitucional: recoveryEmail,
          codigoOtp: values.codigoOtp,
          nuevaPassword: values.nuevaPassword,
          confirmarPassword: values.confirmarPassword
        };

        // Llamar a reset-password
        await authService.resetPassword(payload);

        // Limpiar datos temporales
        localStorage.removeItem('recoveryEmail');

        // Mostrar mensaje de éxito
        setSuccessMessage('Contraseña restablecida correctamente.');

        // Redirigir a login después de 2 segundos
        setTimeout(() => {
          navigate(
            currentLayout?.name === 'auth-branded' ? '/auth/login' : '/auth/classic/login',
            { replace: true }
          );
        }, 2000);
      } catch (error: any) {
        const errorMessage =
          error?.message || 'Error al restablecer la contraseña. Por favor, intenta de nuevo.';
        setStatus(errorMessage);
        setSubmitting(false);
      } finally {
        setLoading(false);
      }
    }
  });

  const togglePasswordVisibility = (
    field: 'new' | 'confirm',
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !formik.isSubmitting && !loading) {
      event.preventDefault();
      formik.submitForm();
    }
  };

  return (
    <div className="d-flex flex-column justify-center align-center">
      <div>
        <img
          src={toAbsoluteUrl('/media/app/default-logo.svg')}
          className="default-logo w-[180px] mx-auto mb-5"
          alt="Logo"
        />
      </div>
      <div className="card max-w-[400px] w-full">
        <form
          className="card-body flex flex-col gap-5 p-10 w-[400px]"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 leading-none mb-2.5">
              Verificar OTP
            </h3>
            <p className="text-sm text-gray-600">
              Ingresa el código OTP que recibiste y tu nueva contraseña
            </p>
          </div>

          {formik.status && <Alert variant="danger">{formik.status}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          {/* Código OTP */}
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Código OTP</label>
            <input
              type="text"
              placeholder="00000"
              inputMode="numeric"
              maxLength={5}
              {...formik.getFieldProps('codigoOtp')}
              onKeyDown={handleKeyDown}
              className={clsx('form-control text-center tracking-widest text-lg font-mono', {
                'is-invalid': formik.touched.codigoOtp && formik.errors.codigoOtp
              })}
            />
            {formik.touched.codigoOtp && formik.errors.codigoOtp && (
              <span role="alert" className="text-danger text-xs mt-1">
                {formik.errors.codigoOtp}
              </span>
            )}
            <p className="text-2xs text-gray-600 mt-1">
              Se envió un código de 5 dígitos a tu correo personal
            </p>
          </div>

          {/* Nueva Contraseña */}
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Nueva Contraseña</label>
            <label className="input">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Escribir nueva contraseña"
                autoComplete="new-password"
                {...formik.getFieldProps('nuevaPassword')}
                onKeyDown={handleKeyDown}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.nuevaPassword && formik.errors.nuevaPassword
                })}
              />
              <button className="btn btn-icon" onClick={(e) => togglePasswordVisibility('new', e)}>
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
            {formik.touched.nuevaPassword && formik.errors.nuevaPassword && (
              <span role="alert" className="text-danger text-xs mt-1">
                {formik.errors.nuevaPassword}
              </span>
            )}
            <p className="text-2xs text-gray-600 mt-1">
              Mínimo 8 caracteres, 1 mayúscula y 1 número
            </p>
          </div>

          {/* Confirmar Contraseña */}
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Confirmar Nueva Contraseña</label>
            <label className="input">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar nueva contraseña"
                autoComplete="new-password"
                {...formik.getFieldProps('confirmarPassword')}
                onKeyDown={handleKeyDown}
                className={clsx('form-control', {
                  'is-invalid':
                    formik.touched.confirmarPassword && formik.errors.confirmarPassword
                })}
              />
              <button
                className="btn btn-icon"
                onClick={(e) => togglePasswordVisibility('confirm', e)}
              >
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
            {formik.touched.confirmarPassword && formik.errors.confirmarPassword && (
              <span role="alert" className="text-danger text-xs mt-1">
                {formik.errors.confirmarPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary flex justify-center grow"
            disabled={loading || formik.isSubmitting}
          >
            {loading ? 'Procesando...' : 'Restablecer Contraseña'}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Recuerdas tu contraseña?{' '}
              <Link
                to={currentLayout?.name === 'auth-branded' ? '/auth/login' : '/auth/classic/login'}
                className="link link-primary text-sm font-medium"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export { VerifyOtp };

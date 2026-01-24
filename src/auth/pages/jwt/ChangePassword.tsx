import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { KeenIcon, Alert } from '@/components';
import { useAuthContext } from '@/auth';
import { useLayout } from '@/providers';
import { toAbsoluteUrl } from '@/utils';
import * as authService from '@/services/auth/auth.service';

const changePasswordSchema = Yup.object().shape({
  passwordActual: Yup.string()
    .required('La contraseña actual es requerida'),
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

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const { currentLayout } = useLayout();

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
        // Obtener credenciales temporales de localStorage
        const tempEmail = localStorage.getItem('tempEmail');
        const tempPassword = localStorage.getItem('tempPassword');

        if (!tempEmail || !tempPassword) {
          throw new Error('Sesión expirada. Por favor, intenta iniciar sesión nuevamente.');
        }

        const payload = {
          correoInstitucional: tempEmail,
          passwordActual: values.passwordActual,
          nuevaPassword: values.nuevaPassword,
          confirmarPassword: values.confirmarPassword
        };

        console.log('Enviando payload:', payload);

        // Llamar a change-password enviando credenciales en el body
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/change-password`,
          payload,
          {
            headers: {
              Authorization: undefined
            }
          }
        );

        console.log('Respuesta exitosa:', response.data);

        // Éxito: limpiar datos temporales
        localStorage.removeItem('tempEmail');
        localStorage.removeItem('tempPassword');

        // Redirigir a login
        navigate(
          currentLayout?.name === 'auth-branded' ? '/auth/login' : '/auth/classic/login',
          { replace: true }
        );
      } catch (error: any) {
        console.log('Error completo:', error);
        console.log('Error response:', error?.response?.data);
        
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'Error al cambiar la contraseña. Por favor, intenta de nuevo.';
        setStatus(errorMessage);
        setSubmitting(false);
      } finally {
        setLoading(false);
      }
    }
  });

  const togglePasswordVisibility = (
    field: 'current' | 'new' | 'confirm',
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'new') {
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
              Cambiar Contraseña
            </h3>
            <p className="text-sm text-gray-600">
              Se requiere actualizar tu contraseña para continuar
            </p>
          </div>

          {formik.status && <Alert variant="danger">{formik.status}</Alert>}

          {/* Contraseña Actual */}
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Contraseña Actual (Temporal)</label>
            <label className="input">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Escribir contraseña actual"
                autoComplete="current-password"
                {...formik.getFieldProps('passwordActual')}
                onKeyDown={handleKeyDown}
                className={clsx('form-control', {
                  'is-invalid': formik.touched.passwordActual && formik.errors.passwordActual
                })}
              />
              <button
                className="btn btn-icon"
                onClick={(e) => togglePasswordVisibility('current', e)}
              >
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
            {formik.touched.passwordActual && formik.errors.passwordActual && (
              <span role="alert" className="text-danger text-xs mt-1">
                {formik.errors.passwordActual}
              </span>
            )}
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
            {loading ? 'Procesando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export { ChangePassword };

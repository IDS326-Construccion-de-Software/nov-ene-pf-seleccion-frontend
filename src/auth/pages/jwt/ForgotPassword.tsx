import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Alert } from '@/components';
import { useLayout } from '@/providers';
import { toAbsoluteUrl } from '@/utils';
import * as authService from '@/services/auth/auth.service';

const forgotPasswordSchema = Yup.object().shape({
  correoInstitucional: Yup.string()
    .required('El correo institucional es requerido')
    .email('Debe ser un correo válido')
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { currentLayout } = useLayout();

  const formik = useFormik({
    initialValues: {
      correoInstitucional: ''
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);

      try {
        // Llamar a forgot-password
        await authService.forgotPassword(values.correoInstitucional);

        // Guardar el correo en localStorage para usarlo en VerifyOtp
        localStorage.setItem('recoveryEmail', values.correoInstitucional);

        // Mostrar mensaje de éxito
        setSuccessMessage('Si el correo es correcto, se han enviado las instrucciones.');

        // Redirigir a verify-otp después de 2 segundos
        setTimeout(() => {
          navigate(
            currentLayout?.name === 'auth-branded' ? '/auth/verify-otp' : '/auth/classic/verify-otp',
            { replace: true }
          );
        }, 2000);
      } catch (error: any) {
        const errorMessage = error?.message || 'Error al procesar la solicitud. Por favor, intenta de nuevo.';
        setStatus(errorMessage);
        setSubmitting(false);
      } finally {
        setLoading(false);
      }
    }
  });

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
              ¿Olvidaste tu Contraseña?
            </h3>
            <p className="text-sm text-gray-600">
              Ingresa tu correo institucional y te enviaremos instrucciones para restablecerla
            </p>
          </div>

          {formik.status && <Alert variant="danger">{formik.status}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          {/* Correo Institucional */}
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Correo Institucional</label>
            <input
              type="email"
              placeholder="correo@institucional.edu.do"
              autoComplete="email"
              {...formik.getFieldProps('correoInstitucional')}
              onKeyDown={handleKeyDown}
              className={clsx('form-control', {
                'is-invalid':
                  formik.touched.correoInstitucional && formik.errors.correoInstitucional
              })}
            />
            {formik.touched.correoInstitucional && formik.errors.correoInstitucional && (
              <span role="alert" className="text-danger text-xs mt-1">
                {formik.errors.correoInstitucional}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary flex justify-center grow"
            disabled={loading || formik.isSubmitting}
          >
            {loading ? 'Procesando...' : 'Enviar Instrucciones'}
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

export { ForgotPassword };

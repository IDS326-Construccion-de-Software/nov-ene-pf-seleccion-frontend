/* eslint-disable prettier/prettier */
import { type MouseEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { KeenIcon } from '@/components';
import { useAuthContext } from '@/auth';
import { useLayout } from '@/providers';
import { Alert } from '@/components';
import { emailValidation, passwordValidation, toAbsoluteUrl } from '@/utils';

const loginSchema = Yup.object().shape({
  email: emailValidation(),
  password: passwordValidation(),
  remember: Yup.boolean()
});

const initialValues = {
  email: 'demo@keenthemes.com',
  password: 'demo1234',
  remember: false
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);
  const { currentLayout } = useLayout();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);

      try {
        if (!login) {
          throw new Error('Se requiere JWTProvider para este formulario.');
        }

        await login(values.email, values.password);

        if (values.remember) {
          localStorage.setItem('email', values.email);
        } else {
          localStorage.removeItem('email');
        }

        navigate(from, { replace: true });
      } catch {
        setStatus('Los datos de inicio de sesión son incorrectos');
        setSubmitting(false);
      }
      setLoading(false);
    }
  });

  const togglePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
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
        {/* <img src={toAbsoluteUrl('/media/app/default-logo.svg')} className="default-logo w-[200px]" /> */}
        <form
          className="card-body flex flex-col gap-5 p-10 w-[400px]"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <h3 className="text-2xl font-semibold text-gray-900 text-center leading-none mb-2.5">
            Iniciar Sesión
          </h3>

          {/* Autenticación con google o people */}

          {/* <div className="grid grid-cols-2 gap-2.5">
          <a href="#" className="btn btn-light btn-sm justify-center">
            <img
              src={toAbsoluteUrl('/media/brand-logos/google.svg')}
              className="size-3.5 shrink-0"
            />
            Usar Google
          </a>

          <a href="#" className="btn btn-light btn-sm justify-center">
            <img
              src={toAbsoluteUrl('/media/brand-logos/apple-black.svg')}
              className="size-3.5 shrink-0 dark:hidden"
            />
            <img
              src={toAbsoluteUrl('/media/brand-logos/apple-white.svg')}
              className="size-3.5 shrink-0 light:hidden"
            />
            Usar Apple
          </a>
        </div> */}

          {/* <div className="flex items-center gap-2">
          <span className="border-t border-gray-200 w-full"></span>
          <span className="text-2xs text-gray-500 font-medium uppercase">O</span>
          <span className="border-t border-gray-200 w-full"></span>
        </div> */}

          {/* <Alert variant="primary">
          Use <span className="font-semibold text-gray-900">demo@keenthemes.com</span> username and{' '}
          <span className="font-semibold text-gray-900">demo1234</span> password.
        </Alert> */}

          {formik.status && <Alert variant="danger">{formik.status}</Alert>}
          <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">Correo electrónico</label>
            <label className="input">
              <input
                placeholder="Escribir correo electrónico"
                autoComplete="off"
                // {...formik.getFieldProps('email')}
                // className={clsx('form-control', {
                //   'is-invalid': formik.touched.email && formik.errors.email
                // })}
              />
            </label>
            {/* {formik.touched.email && formik.errors.email && (
              <span role="alert" className="text-danger text-xs mt-1">
                {formik.errors.email}
              </span>
            )} */}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-1">
              <label className="form-label text-gray-900">Contraseña</label>
            </div>
            <label className="input">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Escribir contraseña"
                autoComplete="off"
                // {...formik.getFieldProps('password')}
                // className={clsx('form-control', {
                //   'is-invalid': formik.touched.password && formik.errors.password
                // })}
              />

              <button className="btn btn-icon" onClick={togglePassword}>
                <KeenIcon icon="eye" className={clsx('text-gray-500', { hidden: showPassword })} />
                <KeenIcon
                  icon="eye-slash"
                  className={clsx('text-gray-500', { hidden: !showPassword })}
                />
              </button>
            </label>
            {/* {formik.touched.password && formik.errors.password && (
              <span role="alert" className="text-danger text-xs mt-1">
                {formik.errors.password}
              </span>
            )} */}
            <div className="flex justify-end">
              <Link
                to={
                  currentLayout?.name === 'auth-branded'
                    ? '/auth/reset-password'
                    : '/auth/classic/reset-password'
                }
                className="text-2sm link shrink-0"
              >
                <span className="text-1l font-semibold text-foreground hover:text-primary">
                  ¿Olvidaste tu contraseña?
                </span>
              </Link>
            </div>
          </div>

          {/* Recordar inicio de sesión */}

          {/* <label className="checkbox-group">
          <input
            className="checkbox checkbox-sm"
            type="checkbox"
            {...formik.getFieldProps('remember')}
          />
          <span className="checkbox-label">Recordar inicio de sesión</span>
        </label> */}
          <button
            type="submit"
            className="btn btn-primary flex justify-center grow"
            disabled={loading || formik.isSubmitting}
          >
            {loading ? 'Por favor espere...' : 'Iniciar Sesión'}
          </button>
          <div className="flex items-center justify-center font-medium">
            <span className="text-2sm text-gray-600 me-1.5">¿Necesitas una cuenta?</span>
            <Link
              to={currentLayout?.name === 'auth-branded' ? '/auth/signup' : '/auth/classic/signup'}
              className="text-2sm link"
            >
              <span className="text-1xl font-semibold text-foreground hover:text-primary">
                Registrarse
              </span>
            </Link>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export { Login };

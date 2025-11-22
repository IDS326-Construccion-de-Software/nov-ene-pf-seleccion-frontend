import * as Yup from 'yup';

// Validaciones de email
export const emailValidation = () =>
  Yup.string()
    .email('Formato de correo electrónico incorrecto')
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('El correo electrónico es requerido');

// Validaciones de password
export const passwordValidation = (required = true) => {
  const validation = Yup.string().min(3, 'Mínimo 3 caracteres').max(50, 'Máximo 50 caracteres');

  return required ? validation.required('La contraseña es requerida') : validation;
};

// Validaciones de texto general
export const textValidation = (label: string, min = 3, max = 50, required = true) => {
  const validation = Yup.string()
    .min(min, `Mínimo ${min} caracteres`)
    .max(max, `Máximo ${max} caracteres`);

  return required ? validation.required(`${label} es requerido`) : validation;
};

// Validaciones de número
export const numberValidation = (label: string, min?: number, max?: number, required = true) => {
  let validation = Yup.number().typeError(`${label} debe ser un número`);

  if (min !== undefined) {
    validation = validation.min(min, `${label} debe ser al menos ${min}`);
  }

  if (max !== undefined) {
    validation = validation.max(max, `${label} debe ser máximo ${max}`);
  }

  return required ? validation.required(`${label} es requerido`) : validation;
};

// Validación de teléfono
export const phoneValidation = (required = true) => {
  const validation = Yup.string()
    .matches(/^[0-9]+$/, 'Solo se permiten números')
    .min(10, 'Mínimo 10 dígitos')
    .max(15, 'Máximo 15 dígitos');

  return required ? validation.required('El teléfono es requerido') : validation;
};

// Validación de URL
export const urlValidation = (required = true) => {
  const validation = Yup.string().url('URL inválida');

  return required ? validation.required('La URL es requerida') : validation;
};

// Validación de fecha
export const dateValidation = (label: string, required = true) => {
  const validation = Yup.date().typeError('Fecha inválida');

  return required ? validation.required(`${label} es requerida`) : validation;
};

// Validación de confirmación de password
export const confirmPasswordValidation = (passwordField = 'password') =>
  Yup.string()
    .oneOf([Yup.ref(passwordField)], 'Las contraseñas deben coincidir')
    .required('Confirmar contraseña es requerido');

// Validación de checkbox/boolean
export const checkboxValidation = (label: string, required = false) => {
  const validation = Yup.boolean();

  return required
    ? validation.oneOf([true], `Debe aceptar ${label}`).required(`${label} es requerido`)
    : validation;
};

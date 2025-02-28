import { check } from 'express-validator';
import validateFields from "../../middlewares/fieldsValidation";

// Middleware de validación
const loginDataValidations = [
    check('email', 'Debe ingresar el correo').isEmail(),
    check('password', 'Debe ingresar la contraseña').not().isEmpty(),
    validateFields
];

const registerDataValidations = [
    check('firstName', 'Debe ingresar su nombre').not().isEmpty(),
    check('lastName', 'Debe ingresar su apellido').not().isEmpty(),
    check('email', 'Debe ingresar el correo').isEmail(),
    check('password', 'Debe ingresar la contraseña').not().isEmpty(),
    check('role', 'Debe seleccionar su rol').not().isEmpty(),
    validateFields
];

export { loginDataValidations, registerDataValidations };



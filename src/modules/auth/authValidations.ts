import { check } from 'express-validator';
import validateFields from "../../middlewares/fieldsValidation";

// Middleware de validación
const loginDataValidations = [
    check('email', 'Debe ingresar el correo').isEmail(),
    check('password', 'Debe ingresar la contraseña').not().isEmpty(),
    validateFields
];

export { loginDataValidations };



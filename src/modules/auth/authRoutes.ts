const { Router } = require('express');
import { tryCatch } from "../../utils/tryCatch";
import { loginDataValidations, registerDataValidations } from "./authValidations";
import { loginUserController, registerUserController } from "./authControllers";

const router = Router();

router.post('/login', loginDataValidations, tryCatch(loginUserController));
router.post('/register', registerDataValidations, tryCatch(registerUserController))

// module.exports = router;
export default router
const { Router } = require('express');
import { loginDataValidations } from "./authValidations";
import { tryCatch } from "../../utils/tryCatch";
import { loginUser } from "./authControllers";

const router = Router();

router.post('/login', loginDataValidations, tryCatch(loginUser));

module.exports = router;
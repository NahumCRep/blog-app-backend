const { Router } = require('express');
const jwtUtils = require("../../utils/tokenUtils");

const router = Router();

router.post('/login', (req: any, res: any) => {
    const credentials = req.body;
    const { email, password } = credentials;
    const token = jwtUtils.generateToken({ email });
    res.json({ token: token })
});

module.exports = router;
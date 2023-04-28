import { Router } from 'express';

import { authClienteNatural } from '../controllers/login.natural.controllers.js';

const router = Router();

router.post("/authClienteNatural", authClienteNatural)

export default router;
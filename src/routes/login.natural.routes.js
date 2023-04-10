import { Router } from 'express';

import { authClienteNatural, verUsuarioNatural } from '../controllers/login.natural.controllers.js';
import { validateToken} from '../middleware/validateToken.js';

const router = Router();

router.post("/authClienteNatural", authClienteNatural)
router.get("/verClienteNatural", validateToken, verUsuarioNatural );

export default router;
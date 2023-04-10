import { Router } from 'express';
import { authClienteEmpresa, verClienteEmpresa } from '../controllers/login.empresa.controllers.js';
import { validateToken } from '../middleware/validateToken.js';
const router = Router();

router.post("/authClienteEmpresa", authClienteEmpresa);
router.get("/verClienteEmpresa", validateToken, verClienteEmpresa);

export default router;
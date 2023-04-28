import { Router } from 'express';
import { authClienteEmpresa } from '../controllers/login.empresa.controllers.js';
const router = Router();

router.post("/authClienteEmpresa", authClienteEmpresa);
export default router;
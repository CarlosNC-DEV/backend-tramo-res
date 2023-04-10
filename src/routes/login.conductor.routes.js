import { Router } from 'express';
import { validateToken } from '../middleware/validateToken.js';
import { authConductor, verConductor } from '../controllers/login.conductor.controllers.js';
const router = Router();

router.post("/authConductor", authConductor);
router.get("/verConductor",validateToken, verConductor);

export default router;
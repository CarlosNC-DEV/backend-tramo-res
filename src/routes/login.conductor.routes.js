import { Router } from 'express';
import { authConductor } from '../controllers/login.conductor.controllers.js';
const router = Router();

router.post("/authConductor", authConductor);

export default router;
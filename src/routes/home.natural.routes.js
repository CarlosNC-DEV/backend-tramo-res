import { Router } from 'express';
import { verDisponibles } from '../controllers/home.natural.controllers.js';
import { validateToken } from '../middleware/validateToken.js';

const router = Router();

router.get("/disponiblesHome", validateToken, verDisponibles);

export default router;
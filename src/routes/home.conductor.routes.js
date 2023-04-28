import { Router } from 'express';
import { validateToken } from '../middleware/validateToken.js';
import { verConductor, apiNotificaciones, actualizarDatosConductor } from '../controllers/home.conductor.controllers.js';
const router = Router();

router.get("/verConductor",validateToken, verConductor);
router.get("/enviarNotificacion", apiNotificaciones);
router.put("/verConductor/:id", actualizarDatosConductor);


export default router;
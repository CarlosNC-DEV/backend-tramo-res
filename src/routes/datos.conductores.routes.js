import { Router } from 'express';
import { conductoresHabilitados, inhabilitarConductor, conductoresInhabilitados, habilitarConductor } from '../controllers/datos.conductor.controllers.js';

const router = Router();

router.get("/conductoresHabilitados", conductoresHabilitados);
router.put("/inhabilitarConductor/:id", inhabilitarConductor);

router.get("/conductoresInhabilitados", conductoresInhabilitados);
router.put("/habilitarConductor/:id", habilitarConductor);

export default router;
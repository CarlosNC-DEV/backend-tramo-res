import { Router } from 'express';
import { conductoresDispo, conductoresEnServicio } from '../controllers/estado.conductores.controllers.js';

const router = Router();

router.get("/conductoresDis", conductoresDispo);
router.get("/conductoresEnServicio", conductoresEnServicio);

export default router;
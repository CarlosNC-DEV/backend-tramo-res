import { Router } from 'express';
import { verPqrs, crearPqrs } from '../controllers/pqrs.controllers.js';

const router = Router();

router.get("/pqrs", verPqrs)
router.post("/pqrs", crearPqrs)

export default router;
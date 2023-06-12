import { Router } from 'express';
import { verPqrs, crearPqrs, verUniquePqrs } from '../controllers/pqrs.controllers.js';

const router = Router();

router.get("/pqrs", verPqrs)
router.get("/pqrs/:id", verUniquePqrs)
router.post("/pqrs", crearPqrs)

export default router;
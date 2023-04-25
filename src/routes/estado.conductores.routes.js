import { Router } from "express";
import {
  conductoresDispo,
  conductoresEnServicio,
  pasarConductorDisponible,
  pasarConductorEnServicio,
} from "../controllers/estado.conductores.controllers.js";

const router = Router();

router.get("/conductoresDis", conductoresDispo);
router.get("/conductoresEnServicio", conductoresEnServicio);
router.put("/conductoresDis/:id", pasarConductorDisponible);
router.put("/conductoresEnServicio/:id", pasarConductorEnServicio);

export default router;

import { Router } from 'express';
import { validaCamposPedido } from '../middleware/validateCampos.js';
import { crearPedido, aceptarPedido, rechazarPedido, verEstadoPedido } from '../controllers/pedido.controllers.js';

const router = Router()

router.post("/crearPedido", validaCamposPedido, crearPedido);
router.post("/aceptarPedido", aceptarPedido);
router.post("/rechazarPedido", rechazarPedido);
router.post("/verPedido", verEstadoPedido);

export default router;
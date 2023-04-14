import { Router } from 'express';
import { crearPedido } from '../controllers/pedido.controllers.js';

const router = Router()

router.post("/crearPedido", crearPedido)

export default router;
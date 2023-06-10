import { Router } from 'express';
import { validaCamposPedido } from '../middleware/validateCampos.js';
import { crearPedido, aceptarPedido, rechazarPedido, verEstadoPedido, terminarPedido, calificacionPedido, verHistoriales, verManifiesto, dataPedido, seleccionarNuevoConductor, pedidoConductores, verPedidoUnique } from '../controllers/pedido.controllers.js';

import multer from 'multer';
import { storage } from '../middleware/cloudinary.js';

const upload = multer({
    storage: storage
});

const router = Router()

const input = upload.fields([{name: 'imgPedido'}]);
router.post("/crearPedido", input, validaCamposPedido, crearPedido);
router.put("/aceptarPedido/:id", aceptarPedido);
router.put("/rechazarPedido/:id", rechazarPedido);
router.get("/verPedido", verEstadoPedido);
router.put("/terminarPedido/:id", terminarPedido);
router.put("/calificarPedido/:id", calificacionPedido);
router.get("/verHistoriales", verHistoriales);
router.get("/verManifiesto/:id", verManifiesto);
router.get("/notificacion/:id", dataPedido);
router.put("/newPedido/:id_pedido/:id_conductor", seleccionarNuevoConductor);
router.get("/verMisPedidos/:id", pedidoConductores)
router.get("/verPedidoUnique/:id", verPedidoUnique)


export default router;
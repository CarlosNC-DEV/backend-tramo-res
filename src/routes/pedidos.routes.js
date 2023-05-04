import { Router } from 'express';
import { validaCamposPedido } from '../middleware/validateCampos.js';
import { crearPedido, aceptarPedido, rechazarPedido, verEstadoPedido, terminarPedido, calificacionPedido, verHistoriales } from '../controllers/pedido.controllers.js';

import multer from 'multer';
import { storage } from '../middleware/cloudinary.js';

const upload = multer({
    storage: storage
})

const router = Router()

const input = upload.fields([{name: 'imgPedido'}]);
router.post("/crearPedido", input, validaCamposPedido, crearPedido);
router.put("/aceptarPedido/:id", aceptarPedido);
router.put("/rechazarPedido/:id", rechazarPedido);
router.get("/verPedido", verEstadoPedido);
router.put("/terminarPedido/:id", terminarPedido);
router.put("/calificarPedido/:id", calificacionPedido);
router.get("/verHistorales", verHistoriales)


export default router;
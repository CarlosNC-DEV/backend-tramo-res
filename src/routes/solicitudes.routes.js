import { Router } from 'express';
import multer from 'multer';
import { storage } from '../middleware/cloudinary.js';

import { solicitudCon, soliPendientes, rechazarSolicitud, aceptarSolicitud, solicitudesRechazadas } from '../controllers/solicitud.controllers.js';

const upload = multer({
    storage: storage
})

const router = Router();

const input = upload.fields([{name: 'perfilImgCon'}, {name: 'frente'}, {name: 'volco'}, {name: 'izquierdo'}, {name: 'derecho'}, {name: 'izquierdotrailer'}, {name: 'derechotrailer'}, {name: 'volcotrailer'}]);
router.post("/solicitudCon", input, solicitudCon);

router.get("/solicitudesPendiente", soliPendientes);

router.put("/rechazarSolicitud/:id", rechazarSolicitud);

router.put("/aceptarSoli/:id", aceptarSolicitud);

router.get("/solicitudesRechazadas", solicitudesRechazadas);


export default router;
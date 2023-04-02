import { Router } from "express";
import multer from "multer";
import { storage } from "../middleware/cloudinary.js";

const upload = multer({
  storage: storage,
});

const router = Router();

// registro cliente natural
const input = upload.fields([{ name: "perfilImgPJU" }]);
router.post("/registroClienteEmpresa", input, registroClienteNatural);

// ver clientes naturales habilitados
router.get("/datosClientesEmpresaHB", verClienteNaturalHabilitado);
router.put("/datosClientesEmpresaHB/:id", inhabilitarClienteNatural);

router.get("/datosClientesEmpresaIN", verClienteNaturalInhabilitado);
router.put("/datosClientesEmpresaIN/:id", habilitarClienteNatural);

export default router;

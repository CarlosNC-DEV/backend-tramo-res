import ClienteNatural from "../models/ClienteNatural.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authClienteNatural = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json(" !Todos los datos son requeridos! ");
    }

    const clienteFound = await ClienteNatural.findOne({
      correoElectronicoPNA: correo,
    });
    if (!clienteFound) {
      return res.status(400).json(" !Correo Incorrecto! ");
    }

    const validatePassword = await ClienteNatural.comparePassword(
      contrasena,
      clienteFound.contrasenaPNA
    );
    if (!validatePassword) {
      return res.status(400).json(" !Contraseña Incorrecta! ");
    }

    const token = jwt.sign({ id: clienteFound._id }, JWT_SECRET, {
      expiresIn: 120,
    });

    res.status(200).json({
      token: token,
      messagge: " !login Cliente Natural Correcto! ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};


export const verUsuarioNatural = async (req, res) => {
  try {
    const usuario = req.idUsuario;
    const usuarioNaturalFound = await ClienteNatural.findById(usuario, { tipoDocumentoPNA:0, nroDocumentoPNA:0, contrasenaPNA:0, "perfil.idfotoPerfilPNA":0 });
    if (!usuarioNaturalFound) {
      return res.status(400).json(" !Cliente Natural no existente! ");
    }
    res.status(200).json(usuarioNaturalFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

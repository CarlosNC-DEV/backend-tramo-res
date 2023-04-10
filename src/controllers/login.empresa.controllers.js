import ClienteEmpresa from "../models/ClienteEmpresa.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authClienteEmpresa = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json(" !Todos los datos son requeridos! ");
    }

    const empresaFound = await ClienteEmpresa.findOne({
      correoElectronicoPJU: correo,
    });
    if (!empresaFound) {
      return res.status(400).json({
        token: null,
        messagge: "Correo Incorrecto",
      });
    }

    const validatePassword = await ClienteEmpresa.comparePassword(
      contrasena,
      empresaFound.contrasenaPJU
    );
    if (!validatePassword) {
      return res.status(400).json({
        token: null,
        messagge: "Contraseña Incorrecto",
      });
    }

    const token = jwt.sign({ id: empresaFound._id }, JWT_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({
      token: token,
      messagge: " !login Empresa Correcto! ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const verClienteEmpresa = async (req, res) => {
  try {
    const usuario = req.idUsuario;
    const usuarioEmpresaFound = await ClienteEmpresa.findById(usuario);
    if (!usuarioEmpresaFound) {
      return res.status(400).json(" !Cliente Empresa no existente! ");
    }
    res.status(200).json(usuarioEmpresaFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

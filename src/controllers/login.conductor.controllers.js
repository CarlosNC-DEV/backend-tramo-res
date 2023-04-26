import Conductores from "../models/Conductores.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import Notificaciones from "node-gcm";
export const authConductor = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json(" !Todos los datos son requeridos! ");
    }

    const conductorFound = await Conductores.findOne({
      correoElectronicoCON: correo,
    });
    if (!conductorFound) {
      return res.status(400).json({
        token: null,
        messagge: "Correo Incorrecto",
      });
    }

    const validatePassword = await Conductores.comparePassword(
      contrasena,
      conductorFound.contrasenaCON
    );
    if (!validatePassword) {
      return res.status(400).json({
        token: null,
        messagge: "Contraseña Incorrecta",
      });
    }

    const ingresado = conductorFound.estadoCON.IngresoCON;
    const habilitado = conductorFound.estadoCON.habilitadoCON;
    if (!ingresado || !habilitado) {
      return res.status(400).json({
        token: null,
        messagge: "!Debes esperar a ser acepetado en la app TRAMO!",
      });
    }

    const token = jwt.sign({ id: conductorFound._id }, JWT_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({
      token: token,
      messagge: " !login Conductor Correcto! ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const verConductor = async (req, res) => {
  try {
    enviarNotificacion();
    
    const usuario = req.idUsuario;
    const conductorFound = await Conductores.findById(usuario);
    if (!conductorFound) {
      return res.status(400).json(" !Conductor no existente! ");
    }
    res.status(200).json(conductorFound);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

const enviarNotificacion = () => {
  var sender = new Notificaciones.Sender(""); // aqui ira la API KEY DEL SERVIDOR DE NOTIFICACIONES
  var message = new Notificaciones.Message({
    notification: {
      title: "Titulo Notificacion",
      body: "Cuerpo de la notificacion",
    },
    data: {
      usuario: "Jose Medina",
      email: "josemedina@gmail.com",
    },
  });

  var regTokens = []
  regTokens.push("") // token de la app y dispositivo actual

  sender.send(message, { registrationTokens:regTokens }, function(err, response){
    if(err) console.log(err);
    else console.log(response);
  })
};

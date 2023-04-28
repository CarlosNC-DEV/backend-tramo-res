import Conductores from "../models/Conductores.js";
import admin from "firebase-admin";
import serviceAccount from "../libs/tramo-14fa8-firebase-adminsdk-bjn43-6791f87bea.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const fcmOne = admin.messaging();

var serverKey =
  "AAAAp3ejXd8:APA91bGx7uQIB10Bdc9s9ZPy-m97_yu2VbuF0Sf5haCIIuIXVuzBKCDvHl9LXhlTNHsMRT5Z5XJaaoKPyfEqKnlqyC0yxK_JCaPlO91EAt_7phxfs4iGJShd4VxV7TY4_TZKrAyQr9uG";

export const verConductor = async (req, res) => {
  try {
    enviarMensaje();

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

// Notificacion
const enviarMensaje = () => {
  const message = {
    notification: {
      title: "¡Hola mundo!",
      body: "Esto es una notificación de tu aplicación.",
    },
    data: {
      title: "Hola tramo",
      message: "Este es el mensaje TRAMO",
    },
    token:
      "fTTsZsApRMmBiAqcdJweBW:APA91bFHZ6SjBp6sqZbZH_nvIOuG9JmORPnoFnZQ9OA5u-bYHbyyUR0QIUnvD-D8FZWHeJ27mqdvW4zrf6k8PS99mX5vhA7xcYkM5y61byWb-5lXwVEbJlKmSvnwlWC_FCwFu7yJtk2a",
  };
  fcmOne
    .send(message)
    .then((response) => {
      console.log("Mensaje enviado correctamente:", response);
    })
    .catch((error) => {
      console.log("Error al enviar mensaje:", error);
    });
};

export const actualizarDatosConductor = async(req, res)=>{
    try {
        const { id } = req.params;
        const conductorActualizado = await Conductores.findByIdAndUpdate(id, req.body)
        if(!conductorActualizado){
          return res.status(400).json(" !No se pudo Actualizar el usuario! ");
        }
    
        res.status(200).json(" !Cliente Empresa Actualizado Correctamente! ");
    } catch (error) {
        console.log(error);
        return res.status(500).json(" !Error en el servidor! ");
    }
}


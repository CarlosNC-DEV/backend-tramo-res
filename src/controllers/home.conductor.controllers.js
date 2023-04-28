import Conductores from "../models/Conductores.js";

export const verConductor = async (req, res) => {
  try {
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

export const actualizarDatosConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const conductorActualizado = await Conductores.findByIdAndUpdate(
      id,
      req.body
    );
    if (!conductorActualizado) {
      return res.status(400).json(" !No se pudo Actualizar el usuario! ");
    }

    res.status(200).json(" !Cliente Empresa Actualizado Correctamente! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

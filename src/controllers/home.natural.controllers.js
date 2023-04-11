import Conductores from "../models/Conductores.js";

export const verDisponibles = async (req, res) => {
  try {
    const disponibles = await Conductores.find({
      "estadoCON.IngresoCON": true,
      "estadoCON.habilitadoCON": true,
      "estadoCON.conectadoCON": true,
      "estadoCON.disponibilidadCON": true,
    }).lean();

    if (!disponibles) {
      return res.status(400).json("!No se pudo traer los conductores disponibles!");
    }

    res.status(200).json(disponibles);

  } catch (error) {
    console.log(error);
    return res.status(500).json("!Error en el servidor!");
  }
};

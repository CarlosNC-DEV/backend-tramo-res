import Conductores from "../models/Conductores.js";

export const conductoresDispo = async (req, res) => {
  try {
    const coductoresDis = await Conductores.find({
      "estadoCON.IngresoCON": true,
      "estadoCON.habilitadoCON": true,
      "estadoCON.conectadoCON": true,
      "estadoCON.disponibilidadCON": true,
    });

    res.status(200).json(coductoresDis);
  } catch (error) {
    console.log(error);
    return res.status(500).json("! Error en el servidor !");
  }
};

export const conductoresEnServicio = async (req, res) => {
  try {
    const coductoresDis = await Conductores.find({
      "estadoCON.IngresoCON": true,
      "estadoCON.habilitadoCON": true,
      "estadoCON.conectadoCON": true,
      "estadoCON.disponibilidadCON": false,
    });

    res.status(200).json(coductoresDis);
  } catch (error) {
    console.log(error);
    return res.status(500).json("! Error en el servidor !");
  }
};

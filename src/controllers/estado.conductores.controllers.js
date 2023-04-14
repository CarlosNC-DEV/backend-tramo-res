import Conductores from "../models/Conductores.js";
import Vehiculos from "../models/Vehiculos.js";
import ImageVehiculos from "../models/ImageVehiculos.js";

export const conductoresDispo = async (req, res) => {
  try {
    const coductoresDis = await Conductores.find({
      "estadoCON.IngresoCON": true,
      "estadoCON.habilitadoCON": true,
      "estadoCON.conectadoCON": true,
      "estadoCON.disponibilidadCON": true,
    });

    const conductoresDisponibles = [];
    for (const conductor of coductoresDis) {
      const vehiculoDispo = await Vehiculos.findOne({
        idConductorVeh: conductor._id,
      });
      const ImagenVehiculo = await ImageVehiculos.findOne({ idVehiculoFotos: vehiculoDispo._id });

      const conductorDispo = { conductor, vehiculoDispo, ImagenVehiculo  }
      conductoresDisponibles.push(conductorDispo);
      
    }

    res.status(200).json(conductoresDisponibles);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json("! Error en el servidor !");
  }
};

export const conductoresEnServicio = async (req, res) => {
  try {
    const coductoresEnServicio = await Conductores.find({
      "estadoCON.IngresoCON": true,
      "estadoCON.habilitadoCON": true,
      "estadoCON.conectadoCON": true,
      "estadoCON.disponibilidadCON": false,
    });

    const conductoresEnServicio = [];
    for (const conductor of coductoresEnServicio) {
      const vehiculoEnServicio = await Vehiculos.findOne({
        idConductorVeh: conductor._id,
      });

      if (vehiculoEnServicio) {
        const conductorConVehiculo = { conductor, vehiculoEnServicio };
        conductoresEnServicio.push(conductorConVehiculo);
      }
    }

    res.status(200).json(conductoresEnServicio);
  } catch (error) {
    console.log(error);
    return res.status(500).json("! Error en el servidor !");
  }
};

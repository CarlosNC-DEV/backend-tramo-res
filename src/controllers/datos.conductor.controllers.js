import Conductores from "../models/Conductores.js";
import Vehiculos from "../models/Vehiculos.js";

//Conductores habilitados
export const conductoresHabilitados = async (req, res) => {
  try {
    const conductoresHabilitados = await Conductores.find({
      "estadoCON.IngresoCON": true,
      "estadoCON.habilitadoCON": true,
      "estadoCON.conectadoCON": false,
      "estadoCON.disponibilidadCON": false,
      motivoInhabilitadoCON: null,
      motivoRechazoCON: null,
    });

    const conductoresConVehiculosHabiliados = [];
    for (const conductor of conductoresHabilitados) {
      const vehiculoSolicitud = await Vehiculos.findOne({
        idConductorVeh: conductor._id,
      });
      if (vehiculoSolicitud) {
        conductoresConVehiculosHabiliados.push(conductor, vehiculoSolicitud);
      }
    }

    res.status(200).json(conductoresConVehiculosHabiliados);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const inhabilitarConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivoInhabilitadoCON } = req.body;
    if (!motivoInhabilitadoCON) {
      return res.status(400).json(" !Se requiere un motivo de ihabilitación! ");
    }
    const inhabilitacionConductor = await Conductores.findByIdAndUpdate(id, {
      motivoInhabilitadoCON,
      "estadoCON.habilitadoCON": false,
    });
    if (!inhabilitacionConductor) {
      return res.status(400).json(" !No se pudo Inhabilitar al Conductor!");
    }
    res.status(200).json(" !Solicitud Rechazada Correctamente! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//Conductores inhabilitados
export const conductoresInhabilitados = async (req, res) => {
  try {
    const conductoresInhabilitados = await Conductores.find({
      "estadoCON.IngresoCON": true,
      "estadoCON.habilitadoCON": false,
      "estadoCON.conectadoCON": false,
      "estadoCON.disponibilidadCON": false,
      motivoInhabilitadoCON: null,
      motivoRechazoCON: { $ne: null },
    });

    const conductoresConVehiculosInhabilitados = [];
    for (const conductor of conductoresInhabilitados) {
      const vehiculoSolicitud = await Vehiculos.findOne({
        idConductorVeh: conductor._id,
      });
      if (vehiculoSolicitud) {
        conductoresConVehiculosInhabilitados.push(conductor, vehiculoSolicitud);
      }
    }

    res.status(200).json(conductoresConVehiculosInhabilitados);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const habilitarConductor = async (req, res) => {
  try {
    const { id } = req.params;
    const habilitadoConductor = await Conductores.findByIdAndUpdate(id, {
      motivoInhabilitadoCON: null,
      "estadoCON.habilitadoCON": true,
    });
    if (!habilitadoConductor) {
      return res.status(400).json(" !No se pudo habilitar al Conductor!");
    }
    res.status(200).json(" !Solicitud Rechazada Correctamente! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

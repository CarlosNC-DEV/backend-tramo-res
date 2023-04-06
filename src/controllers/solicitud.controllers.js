import cloudinary from "cloudinary";
import Conductores from "../models/Conductores.js";
import ContactorEmergencia from "../models/ContactorEmergencia.js";
import Vehiculos from "../models/Vehiculos.js";
import ImageVehiculos from "../models/ImageVehiculos.js";
import PropietarioVehiculos from "../models/PropietarioVehiculos.js";
import TenedorVehiculo from "../models/TenedorVehiculo.js";

export const solicitudCon = async (req, res) => {
  try {

    const requestBody = JSON.parse(req.body.body);
    
    //Conductor
    let idImgPerfilCon;
    let urlImgPerfilCon;

    //Vehivulos
    let idImgFronV;
    let urlImgFronV;

    let idImgVolcoV;
    let urlImgVolcoV;

    let idImgLateralIzV;
    let urlImglateralIzV;

    let idImgLateralDeV;
    let urlImglateralDeV;

    let idImgLateralIzT;
    let urlImgLateralIzT;

    let idImgLateralDeT;
    let urlImgLateralDeT;

    let idImgVolvoT;
    let urlImgVolcoT;

    if (req.files) {
      const perfilCon = await cloudinary.uploader.upload(
        req.files.perfilImgCon[0].path
      );
      idImgPerfilCon = perfilCon.public_id;
      urlImgPerfilCon = perfilCon.secure_url;

      const fotoFrontal = await cloudinary.uploader.upload(
        req.files.frente[0].path
      );
      idImgFronV = fotoFrontal.public_id;
      urlImgFronV = fotoFrontal.secure_url;

      const fotoVolco = await cloudinary.uploader.upload(
        req.files.volco[0].path
      );
      idImgVolcoV = fotoVolco.public_id;
      urlImgVolcoV = fotoVolco.secure_url;

      const fotoLateralIzquierdo = await cloudinary.uploader.upload(
        req.files.izquierdo[0].path
      );
      idImgLateralIzV = fotoLateralIzquierdo.public_id;
      urlImglateralIzV = fotoLateralIzquierdo.secure_url;

      const fotoLateralDerecho = await cloudinary.uploader.upload(
        req.files.derecho[0].path
      );
      idImgLateralDeV = fotoLateralDerecho.public_id;
      urlImglateralDeV = fotoLateralDerecho.secure_url;

      const fotoLateralIzquierdoTrailer = await cloudinary.uploader.upload(
        req.files.izquierdotrailer[0].path
      );
      idImgLateralIzT = fotoLateralIzquierdoTrailer.public_id;
      urlImgLateralIzT = fotoLateralIzquierdoTrailer.secure_url;

      const fotoLateralDerechoTrailer = await cloudinary.uploader.upload(
        req.files.derechotrailer[0].path
      );
      idImgLateralDeT = fotoLateralDerechoTrailer.public_id;
      urlImgLateralDeT = fotoLateralDerechoTrailer.secure_url;

      const fotoVolcoTrailer = await cloudinary.uploader.upload(
        req.files.volcotrailer[0].path
      );
      idImgVolvoT = fotoVolcoTrailer.public_id;
      urlImgVolcoT = fotoVolcoTrailer.secure_url;
    }

    const conductorModel = new Conductores(requestBody);
    conductorModel.perfil.idfotoperfilCON = idImgPerfilCon;
    conductorModel.perfil.fotoperfilCON = urlImgPerfilCon;
    conductorModel.contrasenaCON = await conductorModel.encryptPassword(
      requestBody.contrasena
    );
    const conductorSave = await conductorModel.save();

    const contactoEmergenciaModel = new ContactorEmergencia(requestBody);
    contactoEmergenciaModel.idConductorCEM = conductorSave._id;
    await contactoEmergenciaModel.save();

    const vehiculoModel = new Vehiculos(requestBody);
    vehiculoModel.idConductorVeh = conductorSave._id;
    const vehiculoSave = await vehiculoModel.save();

    const imageVehiculosModel = new ImageVehiculos(requestBody);
    imageVehiculosModel.idFotoFrontal = idImgFronV;
    imageVehiculosModel.FotoFrontal = urlImgFronV;
    imageVehiculosModel.idFotoVolco = idImgVolcoV;
    imageVehiculosModel.FotoVolco = urlImgVolcoV;
    imageVehiculosModel.idFotolateral_Izq = idImgLateralIzV;
    imageVehiculosModel.Fotolateral_Izq = urlImglateralIzV;
    imageVehiculosModel.idFotolateral_Der = idImgLateralDeV;
    imageVehiculosModel.Fotolateral_Der = urlImglateralDeV;
    imageVehiculosModel.idFotolateral_IzqTrailer = urlImgLateralIzT; // Trailer
    imageVehiculosModel.Fotolateral_IzqTrailer = idImgLateralIzT;
    imageVehiculosModel.idFotolateral_DerTrailer = idImgLateralDeT;
    imageVehiculosModel.Fotolateral_DerTrailer = urlImgLateralDeT;
    imageVehiculosModel.idFotoVolco_Trailer = idImgVolvoT;
    imageVehiculosModel.FotoVolco_Trailer = urlImgVolcoT;
    imageVehiculosModel.idVehiculoFotos = vehiculoSave._id;
    await imageVehiculosModel.save();

    const propietarioModel = new PropietarioVehiculos(requestBody);
    propietarioModel.idVehiculoPRO = vehiculoSave._id;
    await propietarioModel.save();

    const tenedorModel = new TenedorVehiculo(requestBody);
    tenedorModel.idVehiculoTE = vehiculoSave._id;
    await tenedorModel.save();

    res.status(200).json(" !Solicitud Enviada Correctamente! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// Solicitudes Pendientes
export const soliPendientes = async (req, res) => {
  try {
    const conductoresPendientes = await Conductores.find({
      "estadoCON.IngresoCON": false,
      "estadoCON.habilitadoCON": false,
      "estadoCON.conectadoCON": false,
      "estadoCON.disponibilidadCON": false,
      motivoInhabilitadoCON: null,
      motivoRechazoCON: null,
    });

    const conductoresConVehiculos = [];
    for (const conductor of conductoresPendientes) {
      const vehiculoSolicitud = await Vehiculos.findOne({
        idConductorVeh: conductor._id,
      });
      if (vehiculoSolicitud) {
        conductoresConVehiculos.push(conductor, vehiculoSolicitud);
      }
    }

    res.status(200).json(conductoresConVehiculos);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const rechazarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivoRechazoCON } = requestBody;
    if (!motivoRechazoCON) {
      return res.status(200).json(" !Se requiere un motivo de rechazo! ");
    }
    const solicitudRechazada = await Conductores.findByIdAndUpdate(
      { id },
      motivoRechazoCON
    );
    if (!solicitudRechazada) {
      return res.status(400).json(" !No se pudo Rechazar Solicitud!");
    }
    res.status(200).json(" !Solicitud Rechazada Correctamente! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const aceptarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitudAceptar = await Conductores.findByIdAndUpdate(
      { id },
      { "estadoCON.IngresoCON": true, "estadoCON.habilitadoCON": true }
    );
    if (!solicitudAceptar) {
      return res.status(400).json(" ! No se pudo Aceptar la solicitud! ");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//Solicitudes rechazadas

export const solicitudesRechazadas = async (req, res) => {
  try {
    const conductoresRechazados = await Conductores.find({
      "estadoCON.IngresoCON": false,
      "estadoCON.habilitadoCON": false,
      "estadoCON.conectadoCON": false,
      "estadoCON.disponibilidadCON": false,
      motivoInhabilitadoCON: null,
      motivoRechazoCON: { $ne: null },
    });

    const conductoresConVehiculosRechazados = [];
    for (const conductor of conductoresRechazados) {
      const vehiculoRechazada = await Vehiculos.findOne({
        idConductorVeh: conductor._id,
      });
      if (vehiculoRechazada) {
        conductoresConVehiculosRechazados.push(conductor, vehiculoRechazada);
      }
    }

    res.status(200).json(conductoresConVehiculosRechazados);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

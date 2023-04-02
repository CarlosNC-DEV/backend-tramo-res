import cloudinary from "cloudinary";
import ClienteEmpresa from "../models/ClienteEmpresa.js";

export const registroClienteNatural = async (req, res) => {
  try {
    let idImgPJU;
    let urlImgPJU;

    if (req.files) {
      const imagePersonaPJU = await cloudinary.uploader.upload(
        req.files.perfilImgPJU[0].path
      );
      idImgPJU = imagePersonaPJU.public_id;
      urlImgPJU = imagePersonaPJU.secure_url;
    }

    const modelPersonaEmpresa = new ClienteEmpresa(req.body);
    modelPersonaEmpresa.perfil.idfotoPerfilPJU = idImgPJU;
    modelPersonaEmpresa.perfil.idfotoPerfilPJU = urlImgPJU;
    modelPersonaEmpresa.contrasenaPJU = await modelPersonaEmpresa.encryptPassword(
      req.body.contrasena
    );

    modelPersonaEmpresa.save();

    res.status(200).json(" !Cliente Empresa Registrado Correctamente! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const verClienteNaturalHabilitado = async(req, res)=>{
    try {
        const clienteNaturalHB = await ClienteNatural.find({ "estadoCLN.habilitadoPNA": true, "estadoCLN.motivoInhabilitadoPNA": null});

        res.status(200).json(clienteNaturalHB);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const inhabilitarClienteNatural = async(req, res)=>{
    try {
        const { id } = req.params;
        const { motivoInhabilitadoPNA } = req.body;
        if(!motivoInhabilitadoPNA){
            return res.status(400).json(' !Se requiere un motivo para inhabilitar al cliente! ');
        }

        const inhabilitarClienteNT = await ClienteNatural.findByIdAndUpdate(id, { "estadoCLN.habilitadoPNA": false, "estadoCLN.motivoInhabilitadoPNA": motivoInhabilitadoPNA });

        res.status(200).json(inhabilitarClienteNT);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

//Clientes inhabilitados
export const verClienteNaturalInhabilitado = async(req, res)=>{
    try {
        const clienteNaturalIN = await ClienteNatural.find({ "estadoCLN.habilitadoPNA": false, "estadoCLN.motivoInhabilitadoPNA": { $ne: null }});

        res.status(200).json(clienteNaturalIN);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const habilitarClienteNatural = async(req, res)=>{
    try {
        const { id } = req.params;

        const inhabilitarClienteNT = await ClienteNatural.findByIdAndUpdate(id, { "estadoCLN.habilitadoPNA": true, "estadoCLN.motivoInhabilitadoPNA": null });

        res.status(200).json(inhabilitarClienteNT);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
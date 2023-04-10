import cloudinary from "cloudinary";
import ClienteEmpresa from "../models/ClienteEmpresa.js";

export const registroClienteEmpresa = async (req, res) => {
  try {

    const requestBody = JSON.parse(req.body.body);

    let idImgPJU;
    let urlImgPJU;

    if (req.files) {
      const imagePersonaPJU = await cloudinary.uploader.upload(
        req.files.perfilImgPJU[0].path
      );
      idImgPJU = imagePersonaPJU.public_id;
      urlImgPJU = imagePersonaPJU.secure_url;
    }

    const modelPersonaEmpresa = new ClienteEmpresa(requestBody);
    modelPersonaEmpresa.perfil.idfotoPerfilPJU = idImgPJU;
    modelPersonaEmpresa.perfil.fotoPerfilPJU = urlImgPJU;
    modelPersonaEmpresa.contrasenaPJU = await modelPersonaEmpresa.encryptPassword(
        requestBody.contrasena
    );

    modelPersonaEmpresa.save();

    res.status(200).json(" !Cliente Empresa Registrado Correctamente! ");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const verClienteEmpresaHabilitado = async(req, res)=>{
    try {
        const clienteEmpresaHB = await ClienteEmpresa.find({ "estadoPJU.habilitadoPJU": true, "estadoPJU.motivoInhabilitadoPJU": null});

        res.status(200).json(clienteEmpresaHB);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const inhabilitarClienteEmpresa = async(req, res)=>{
    try {
        const { id } = req.params;
        const { motivoInhabilitadoPJU } = req.body;
        if(!motivoInhabilitadoPJU){
            return res.status(400).json(' !Se requiere un motivo para inhabilitar al cliente! ');
        }

        const inhabilitarClientePJU = await ClienteEmpresa.findByIdAndUpdate(id, { "estadoPJU.habilitadoPJU": false, "estadoPJU.motivoInhabilitadoPJU": motivoInhabilitadoPJU });

        res.status(200).json(inhabilitarClientePJU);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

//Clientes inhabilitados
export const verClienteEmpresaInhabilitado = async(req, res)=>{
    try {
        const clienteEmpresaIN = await ClienteEmpresa.find({ "estadoPJU.habilitadoPJU": false, "estadoPJU.motivoInhabilitadoPJU": { $ne: null }});

        res.status(200).json(clienteEmpresaIN);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const habilitarClienteEmpresa = async(req, res)=>{
    try {
        const { id } = req.params;
        const inhabilitarClienteNT = await ClienteEmpresa.findByIdAndUpdate(id, { "estadoPJU.habilitadoPJU": true, "estadoPJU.motivoInhabilitadoPJU": null });

        res.status(200).json(inhabilitarClienteNT);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
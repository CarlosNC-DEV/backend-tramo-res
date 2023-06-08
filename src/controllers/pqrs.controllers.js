import Pqrs from '../models/Pqrs.js';


export const verPqrs = async(req, res)=>{
    try {
        const pqrs = await Pqrs.find().lean();
        res.status(200).json(pqrs);
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error en el sevidor");
    }
}

export const crearPqrs = async(req, res)=>{
    try {
        const { tipo, motivo, respuesta, id_usuario} = req.body
        if(!tipo || !motivo || !respuesta || !id_usuario){
            return res.status(400).json("Todos los datos son requeridos")
        }
        const pqrsModel = new Pqrs(req.body)
        pqrsModel.save()

        res.status(200).json("Pqrs Creada");

    } catch (error) {
        console.log(error);
        return res.status(500).json("Error en el sevidor");
    }
}
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
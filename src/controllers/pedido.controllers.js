import Pedido from '../models/Pedido.js';

export const crearPedido = async(req, res)=>{
    try {
        const pedidoModel = new Pedido(req.body);
        await pedidoModel.save();

        res.status(200).json("!Pedido Guardado!");
    } catch (error) {
        console.log(error);
        return res.status(500).json(" !Error en el servidor! ");
    }
}
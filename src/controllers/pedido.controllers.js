import Pedido from "../models/Pedido.js";

export const crearPedido = async (req, res) => {
  try {
    const requestBody = JSON.parse(req.body.body);

    const { latitudRE, longitudRE, latitudDE, longitudDE, tipoDES, tipoIdentificacionDES, numeroIdentificacionDES, nombreEntidadDES, razonSocialDES, tipoCarga, producto, empaque, riesgo, cantidadAproximada, cuidadoCarga } = requestBody;

    const pedidoModel = new Pedido(requestBody);
    pedidoModel.recogida.latitud = latitudRE;
    pedidoModel.recogida.longitud = longitudRE;
    pedidoModel.destino.latitud = latitudDE;
    pedidoModel.destino.longitud = longitudDE;
    pedidoModel.destinatario.tipo = tipoDES;
    pedidoModel.destinatario.tipoIdentificacion = tipoIdentificacionDES;
    pedidoModel.destinatario.numeroIdentificacion = numeroIdentificacionDES;
    pedidoModel.destinatario.nombreEntidad = nombreEntidadDES;
    pedidoModel.destinatario.razonSocial = razonSocialDES;
    pedidoModel.carga.tipoCarga = tipoCarga;
    pedidoModel.carga.producto = producto;
    pedidoModel.carga.empaque = empaque;
    pedidoModel.carga.riesgo = riesgo;
    pedidoModel.carga.cantidadAproximada = cantidadAproximada;
    pedidoModel.carga.cuidadoCarga = cuidadoCarga;
    pedidoModel.carga.cuidadoCarga = cuidadoCarga;

    await pedidoModel.save();

    res.status(200).json("Pedido en proceso de aceptación");

  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const aceptarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedidoAceptado = await Pedido.findByIdAndUpdate(id, {
      "estado.enEspera": false,
      "estado.atendiendo": true,
      "estado.terminado": false,
    });

    if (!pedidoAceptado) {
      return res.status(400).json("! No se pudo aceptar el pedido!");
    }

    res.status(200).json("Pedido aceptado");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const rechazarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoRechazado = await Pedido.findByIdAndUpdate(id, {
      "estado.enEspera": true,
      "estado.atendiendo": false,
      "estado.terminado": false,
      id_conductor: null,
    });

    if (!pedidoRechazado) {
      return res.status(400).json("! No se pudo rechazar el pedido!");
    }

    res.status(200).json("Pedido Rechazado");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const verEstadoPedido = async (req, res) => {
  try {
    const pedido = await Pedido.find().lean();
    if (!pedido) {
      return res.status(400).json("! No se pudo rechazar el pedido!");
    }
    res.status(200).json(pedido);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const pedidoEnEspera = async (req, res) => {
  try {
    const pedidoEnEspera = await Pedido.find({
      "estado.enEspera": true,
    }).lean();
    if (!pedidoEnEspera) {
      return res.status(400).json("Error al traer los pedidos en espera");
    }
    res.status(200).json(pedidoEnEspera);
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

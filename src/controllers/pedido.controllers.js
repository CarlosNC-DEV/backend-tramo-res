import Pedido from "../models/Pedido.js";
import cloudinary from "cloudinary";
import admin from "firebase-admin";
import { CLIENTEMAIL_FBS, PRIVATEKEY_FBS, PROJECTID_FBS } from "../config.js";
import Conductores from "../models/Conductores.js";
import ClienteNatural from "../models/ClienteNatural.js";

// inicializa la app de Firebase
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: PROJECTID_FBS,
    clientEmail: CLIENTEMAIL_FBS,
    privateKey: PRIVATEKEY_FBS,
  }),
});

export const crearPedido = async (req, res) => {
  try {
    const requestBody = JSON.parse(req.body.body);

    let idImgPedido = null;
    let urlImgPedido = null;

    if (req.files.imgPedido) {
      const imagePedido = await cloudinary.uploader.upload(
        req.files.imgPedido[0].path
      );
      idImgPedido = imagePedido.public_id;
      urlImgPedido = imagePedido.secure_url;
    }

    const {
      latitudRE,
      longitudRE,
      latitudDE,
      longitudDE,
      tipoDES,
      tipoIdentificacionDES,
      numeroIdentificacionDES,
      nombreEntidadDES,
      razonSocialDES,
      tipoCarga,
      producto,
      empaque,
      riesgo,
      cantidadAproximada,
      cuidadoCarga,
    } = requestBody;

    const pedidoModel = new Pedido(requestBody);
    pedidoModel.imagePedido.idImg = idImgPedido;
    pedidoModel.imagePedido.urlImg = urlImgPedido;
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

    const pedidoSave = await pedidoModel.save();

    const conductorFound = await Conductores.findById(pedidoSave.id_conductor);
    const usuarioNatural = await ClienteNatural.findById(pedidoSave.id_usuario);
    if (usuarioNatural) {
      var tipo = "natural";
      const { token_fbs } = conductorFound;
      notificacionPedido(token_fbs, usuarioNatural, pedidoSave, tipo);
    } else if (!usuarioNatural) {
      var tipo = "empresa";
      const usuarioEmpresa = await ClienteNatural.findById(
        pedidoSave.id_usuario
      );
      notificacionPedido(token_fbs, usuarioEmpresa, pedidoSave, tipo);
    }
    res.status(200).json("Pedido en proceso de aceptación");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

const notificacionPedido = async (token_fbs, usuario, pedidoSave, tipo) => {
  try {
    var nombre ;
    var telefono ;
    if(tipo === "natural"){
      console.log("Natural")
      nombre = usuario.nombrePNA;
      telefono = usuario.nroTelefonoPNA;
    }else if(tipo === "empresa"){
      nombre = usuario.nombreEmpresa;
      telefono = usuario.nroTelefonoPJU;
    }

    const message = {
      notification: {
        title: "Título de la notificación",
        body: "Cuerpo de la notificación",
      },
      data: {
        // usuario
        nombre: nombre,
        telefono: telefono.toString(),
        // pedido
        imgPedido: pedidoSave.imagePedido.urlImg,
        riegoCarga: pedidoSave.carga.riesgo,
        cantidadCarga: pedidoSave.carga.cantidadAproximada.toString(),
        producto: pedidoSave.carga.producto,
        cuidadoCarga : pedidoSave.carga.cuidadoCarga,
        ubicacionCarga: "No implemetada mi bebes",
        destinoCarga: "No implemetada mi bebes",
        precioCarga: pedidoSave.costosViaje.toString()
      },
      token: token_fbs,
    };

    const response = await admin.messaging().send(message);
    console.log("Mensaje enviado:", response);
  } catch (error) {
    console.log(error);
    return;
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

import Pedido from "../models/Pedido.js";
import cloudinary from "cloudinary";
import admin from "firebase-admin";
import { CLIENTEMAIL_FBS, PRIVATEKEY_FBS, PROJECTID_FBS } from "../config.js";
import Conductores from "../models/Conductores.js";
import ClienteNatural from "../models/ClienteNatural.js";
import ClienteEmpresa from "../models/ClienteEmpresa.js";
import TenedorVehiculo from "../models/TenedorVehiculo.js";
import Vehiculos from "../models/Vehiculos.js";

// inicializa la app de Firebase
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: PROJECTID_FBS,
    clientEmail: CLIENTEMAIL_FBS,
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCZ9mlWFM2AmR72\nAZ6Ho5mlCnpx1tSPSLi0ykwbz11PIBQ9wwz8QiEcxpmzL32COpeHFhFSec3CFaRN\n0sGWukpazxFQ/MQ3wWYdDMVli/3nY5PRCA0bAmIHZ2zZJNMdaVFpGLUCmZ8SlC0V\n7W7sxtrIUHAetChzHsEg0XWnDkcGFtHltaj26sL03MdURGPVdTFsfyEPX1w5hXzN\nUMQlvyIt6Jq/kW4BOKcL7NAsBSRWG+hlqdkBsmxYlbED4Vgwprpbj/RG2e+HAZY7\njxRaIpg3uV6Z2CcR2wQmTMczwpdfRkaLuTRyKTFL10pR5gYZ69GzGDbW/+JQ20Vk\nBM3FA/UDAgMBAAECggEAA9xplNaNtsFgROQSgS1Jn5ltK6irCPLWavY9xV7EZMUV\nrNzU2QihgvK6DQPOXnMwtJsJkStrzQe06Jy17R072x4hPYoxM4K+mFDnLF4/3ksh\nfFb62SgMpEnkMWfagXzQJVYQyAFpO1KK9OdQ5lAwUWCvBx4We5iUWEnYbPmPL2he\nHetIUtOrwjOcuh0FnrEFhiSe55VcWrTdaaLoaI2H2lJO6A6N2aGjXi/PsVRQxkiu\nEyzNjGSgdsnSAzSY0rK8vSSrJwDjT5e+/swpO9XGHwYJQ0lN4JG29r+aaajWurWu\nyEbODz2Bi1i4bpsrlJFiu80EBI/YS3WJoaupW6hMnQKBgQDTieeUDlTVbDzXilg/\nkwOqWQxTw4qNxLS0Bn/AKOSM01Fgg5D3aA6Nf50/7228+Kt8qI0/Sri+iJzvmYu6\nDIWgDQV9U33/xI4imZAjRhT0OFsJs4rD4XFUZi0kuz8Y88c2Qs6qg6gfum+wsMQh\nCnELs9fz4Pq3vwiS3x2LiLjbvwKBgQC6Uo16rxvzUR1WtuFbhd4j5+O5Z4QhPCkp\nlZ9lvIhGtysDWSLS8Ck+Qg+QDxtSFmrV1l1dK2HoeJ786eOX3VMc+TItewY3fg+r\nn6KRcGu6xVJLCULZC49gZNWy8OGD8SgR7TwbfLUgsz4LmUAVi1Fy3gjCcVRlKvdd\nrDA68ViHvQKBgFC7rPpAjff2GzJXxl5dCWUWHzJIyrRYgm7CnDcGZFOqwsAG9mi1\n+ffe4HDqPAOHFEu7OE0Tg3aURPDctQsIhGcVESdHmirnJSfnW69aq9yZNYV6VFd1\nzv7bEBeYrvgi8cCvtpg1LxEM4luY2wGRLpu8w4p8LrO54NfM90WtpH+ZAoGASkA9\nu2dvJw7rNzRYKIX3ma1+ldNH14rHCJhk1kFEuZGjJYlvFEq61OG0m/85LwRZ/O+Z\nc1inguIW0clPdqSvy3sPYQqG1rR5ADb0rSr085BRFDAToLU3pP1qIA5YgKEpC8PT\n0UxoTijAEBU5cZx8j98l9H7/V/XAcGb/LW4ijq0CgYARLP3pgwqZB63Y8OWHEMh/\nECvQZGfMTzUqVhKmWnBeUNZAwmkKi5fzh3BBex/VjYqREQxmdQGloYx8s0ApD1Nl\nK6tEG+Ud7lScSEc5Ucc+LlcQpH9nyYcfkDg+Tw0oYM4Z+cPjAcDxqLdgVWlzXhNi\n5BdD2Kzhfy4yrZhx6cQn1A==\n-----END PRIVATE KEY-----\n",
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
      const usuarioEmpresa = await ClienteEmpresa.findById(
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
    var imgPerfilUsuario;
    var nombre;
    var telefono;
    if (tipo === "natural") {
      imgPerfilUsuario = usuario.perfil.fotoPerfilPNA;
      nombre = usuario.nombrePNA;
      telefono = usuario.nroTelefonoPNA;
    } else if (tipo === "empresa") {
      imgPerfilUsuario =
        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
      nombre = usuario.nombreEmpresa;
      telefono = usuario.nroTelefonoPJU;
    }

    const message = {
      notification: {
        title: "Título de la notificación",
        body: "Cuerpo de la notificación",
      },
      data: {
        // tipo de datos para validacion
        tipo: "pedido",
        // usuario
        imgPerfil: imgPerfilUsuario,
        nombre: nombre,
        telefono: telefono.toString(),
        // pedido
        idPedido: pedidoSave._id.toString(),
        imgPedido: pedidoSave.imagePedido.urlImg,
        riegoCarga: pedidoSave.carga.riesgo,
        cantidadCarga: pedidoSave.carga.cantidadAproximada.toString(),
        producto: pedidoSave.carga.producto,
        cuidadoCarga: pedidoSave.carga.cuidadoCarga,

        latitudInicial: pedidoSave.recogida.latitud.toString(),
        longitudInicial: pedidoSave.recogida.longitud.toString(),

        latitudFinal: pedidoSave.destino.latitud.toString(),
        longitudFinal: pedidoSave.destino.longitud.toString(),

        precioCarga: pedidoSave.costosViaje.toString(),
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
    const pedidoFound = await Pedido.findById(id).lean();
    if (pedidoFound.estado.atendiendo === true) {
      return res.status(400).json("El pedido ya a sido aceptado");
    }
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

export const terminarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoFound = await Pedido.findById(id).lean();
    if (pedidoFound.estado.terminado === true) {
      return res.status(400).json("El pedido ya a sido terminado");
    } else if (pedidoFound.estado.atendiendo === false) {
      return res.status(400).json("El pedido no a sido atendido");
    }

    const pedidoTerminado = await Pedido.findByIdAndUpdate(id, {
      "estado.enEspera": false,
      "estado.atendiendo": false,
      "estado.terminado": true,
    });

    if (!pedidoTerminado) {
      return res.status(400).json("! No se pudo terminar el pedido!");
    }

    res.status(200).json("Pedido Terminado");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const calificacionPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { calificacionCON, calificacionSEV } = req.body;
    if (!calificacionCON || !calificacionSEV) {
      return res.status(400).json("Las calificaciones son requeridas");
    }
    const pedidoCalificado = await Pedido.findByIdAndUpdate(id, {
      calificacionConductorPED: calificacionCON,
      calificacionServicioPED: calificacionSEV,
    });
    if (!pedidoCalificado) {
      return res
        .status(400)
        .json("No se puedo calificar el conductor y servicio");
    }

    res.status(200).json("Pedido Calificado");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const verManifiestos = async(req, res)=>{
  try {
    
    const manifiestoEnd = [];

    const pedidoManiestos = await Pedido.find({
      "estado.enEspera": false,
      "estado.atendiendo": false,
      "estado.terminado": true,
      calificacionConductorPED: {$ne: null},
      calificacionServicioPED: {$ne: null}
    }).populate("id_conductor").lean();

    const idConductorFound = pedidoManiestos.map((res)=> res.id_conductor);
    const vehiculoFound = await Vehiculos.findOne({idConductorVeh: idConductorFound});
    const tenedorFound = await TenedorVehiculo.findOne({idVehiculoTE: vehiculoFound._id});

    const idClienteFound = pedidoManiestos.map((res)=> res.id_usuario);
    const clienteEmpresaFound = await ClienteEmpresa.findById(idClienteFound);
    const clienteNaturalFound = await ClienteNatural.findById(idClienteFound);
    
    if(clienteNaturalFound){
      let cliente = clienteNaturalFound;
      const dataManiesto = { pedidoManiestos, cliente, vehiculoFound, tenedorFound };
      manifiestoEnd.push(dataManiesto);
    }else if(clienteEmpresaFound){
      let cliente = clienteEmpresaFound;
      const dataManiesto = { pedidoManiestos, cliente, vehiculoFound, tenedorFound };
      manifiestoEnd.push(dataManiesto);
    }





    res.status(200).json(manifiestoEnd);

  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
}

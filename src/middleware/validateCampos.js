export const validaCamposPedido = (req, res, next) => {
  const requestBody = JSON.parse(req.body.body);
  const {
    latitudRE,
    longitudRE,
    latitudDE,
    longitudDE,
    descripcionUbicacion,
    tipoDES,
    tipoIdentificacionDES,
    numeroIdentificacionDES,
    nombreEntidadDES,
    razonSocialDES,
    pagoCarga,
    pagoDescarge,
    tipoCarga,
    producto,
    empaque,
    riesgo,
    cantidadAproximada,
    cuidadoCarga,
    metodoPago,
    id_usuario,
    id_conductor,
  } = requestBody;

  if (
    !latitudRE ||
    !longitudRE ||
    !latitudDE ||
    !longitudDE ||
    !descripcionUbicacion ||
    !tipoDES ||
    !tipoIdentificacionDES ||
    !numeroIdentificacionDES ||
    !nombreEntidadDES ||
    !razonSocialDES ||
    !pagoCarga ||
    !pagoDescarge ||
    !tipoCarga ||
    !producto ||
    !empaque ||
    !riesgo ||
    !cantidadAproximada ||
    !cuidadoCarga ||
    !metodoPago ||
    !id_usuario ||
    !id_conductor
  ) {
    return res.status(400).json("Todos los datos son requeridos");
  }

  next();
};

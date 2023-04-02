import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const personaNaturalSchema = new Schema(
  {
    nombrePNA: { type: String, require: true },
    apellidoPNA: { type: String, require: true },
    tipoDocumentoPNA: { type: String, require: true },
    nroDocumentoPNA: { type: String, require: true },
    DireccionPNA: { type: String, require: true },
    nroTelefonoPNA: { type: String, require: true },
    correoElectronicoPNA: { type: String, require: true },
    contrasenaPNA: { type: String, require: true },

    calificacionPNA: { type: Number, default: 5 },
    numeroPedidosPNA: { type: Number, default: 0 },

    perfil: {
      idfotoPerfilPNA: { type: String, require: true, default: null },
      fotoPerfilPNA: { type: String, require: true, default: null },
    },

    estadoCLN: {
      habilitadoPNA: { type: Boolean, default: true },
      motivoInhabilitadoPNA: { type: String, default: null },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

personaNaturalSchema.methods.encryptPassword = async (contrasena) => {
  return bcryptjs.hash(contrasena, 10);
};

personaNaturalSchema.methods.comparePassword = async function (contrasena) {
  return await bcryptjs.compare(contrasena, this.contrasenaPNA);
};

export default model("PersonaNatural", personaNaturalSchema);

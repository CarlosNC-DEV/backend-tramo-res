import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const personaEmpresaSchema = new Schema(
  {
    nombreEmpresa: { type: String, require: true },
    razonSocialEmpresa: { type: String, require: true },
    nomRepresentanteLegal: { type: String, require: true },
    NITempresa: { type: String, require: true },
    DireccionEmpresa: { type: String, require: true },
    nroTelefonoPJU: { type: String, require: true },
    correoElectronicoPJU: { type: String, require: true },
    contrasenaPJU: { type: String, require: true },

    calificacionPJU: { type: Number, default: 5 },
    numeroPedidosPJU: { type: Number, default: 0 },

    perfil: {
      idfotoPerfilPJU: { type: String, require: true, default: null },
      fotoPerfilPJU: { type: String, require: true, default: null },
    },

    estadoPJU: {
      habilitadoPJU: { type: Boolean, default: true },
      motivoInhabilitadoPJU: { type: String, default: null },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

personaEmpresaSchema.methods.encryptPassword = async (contrasena) => {
  return bcryptjs.hash(contrasena, 10);
};

personaEmpresaSchema.methods.comparePassword = async function (contrasena) {
  return await bcryptjs.compare(contrasena, this.contrasenaPJU);
};

export default model("PersonaJuridica", personaEmpresaSchema);

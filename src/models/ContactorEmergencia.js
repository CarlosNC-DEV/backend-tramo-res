import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const contactoEmergenciaSchema = new Schema(
  {
    nombreCEM: { type: String, require: true },
    apellidoCEM: { type: String, require: true },
    NroDocumentoCEM: { type: String, require: true },
    NroTelefonoCEM: { type: String, require: true },
    CorreoElectricoCEM: { type: String, require: true },
    idConductorCEM: { type: ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("ContactoEmergencia", contactoEmergenciaSchema);
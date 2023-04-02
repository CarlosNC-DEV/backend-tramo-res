import { Schema, model } from "mongoose";
const ObjectId = Schema.ObjectId;

const vehiculoSchema = new Schema(
  {
    marca: { type: String, require: true },
    modelo: { type: String, require: true },
    numeroEjes: { type: Number, require: true },
    tipoVehiculo: { type: String, require: true },
    traccionVeh: { type: String, require: true },
    placaVehiculo: { type: String, require: true },
    placasTrailer: { type: String, require: true },
    pesoVacio: { type: Number, require: true },
    CombustibleVeh: { type: String, require: true },
    numeroLicenciaVeh: { type: String, require: true },
    numeroSOAT: { type: String, require: true },
    companiaSOAT: { type: String, require: true },
    fechavencSOAT: { type: String, require: true },
    nroPoliza_ResponCivil: { type: String, require: true },
    nroRev_TecMecanica: { type: String, require: true },
    fechaVenc_Tecno: { type: String, require: true },

    idConductorVeh: { type: ObjectId, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Vehiculos", vehiculoSchema);

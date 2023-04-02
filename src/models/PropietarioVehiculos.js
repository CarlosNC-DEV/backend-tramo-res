import {Schema,model} from 'mongoose';

const ObjectId = Schema.ObjectId;


const datosPropietarioSchema = new Schema({

    nombrePRO:{type:String,require:true},
    apellidoPRO:{type:String,require:true},
    NroDocumentoPRO:{type:String,require:true},
    DireccionResidenciaPRO:{type:String,require:true},
    ciudadPRO:{type:String,require:true},
    NroTelefonoPRO:{type:String,require:true},
    
    idVehiculoPRO:{type:ObjectId,require:true},
},{
    timestamps: true,
    versionKey: false
});


export default model('DatosPropietarios',datosPropietarioSchema);
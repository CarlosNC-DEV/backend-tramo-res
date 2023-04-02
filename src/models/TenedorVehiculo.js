import {Schema,model} from 'mongoose';


const ObjectId = Schema.ObjectId;

const datosTenedorSchema = new Schema({
    nombreTE:{type:String,require:true},
        apellidoTE:{type:String,require:true},
        NroDocumentoTE:{type:String, require:true},
        DireccionResidenciaTE:{type:String,require:true},
        ciudadTE:{type:String,require:true},
        NroTelefonoTE:{type:String , require:true},
        
        idVehiculoTE:{type:ObjectId,require:true},
},{
    timestamps: true,
    versionKey: false
});



export default model('DatosTenedores',datosTenedorSchema);
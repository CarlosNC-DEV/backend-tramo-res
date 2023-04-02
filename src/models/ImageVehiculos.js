import {Schema,model} from 'mongoose';

const ObjectId = Schema.ObjectId;

const fotosVehiculoSchema = new Schema({
        idFotoFrontal :{type:String,require:true},
        FotoFrontal :{type:String,require:true},
        idFotoVolco :{type:String,require:true},
        FotoVolco :{type:String,require:true},
        idFotolateral_Izq :{type:String,require:true},
        Fotolateral_Izq :{type:String,require:true},
        idFotolateral_Der :{type:String,require:true},
        Fotolateral_Der :{type:String,require:true},
        idFotolateral_IzqTrailer :{type:String,require:true,default:null} ,
        Fotolateral_IzqTrailer :{type:String,require:true,default:null} ,
        idFotolateral_DerTrailer:{type:String,require:true,default:null}  ,
        Fotolateral_DerTrailer:{type:String,require:true,default:null}  ,
        idFotoVolco_Trailer :{type:String,require:true,default:null} ,
        FotoVolco_Trailer :{type:String,require:true,default:null} ,
        
        idVehiculoFotos:{type:ObjectId,require:true}
},{
    timestamps: true,
    versionKey: false
});


export default model('FotosVehiculos',fotosVehiculoSchema);
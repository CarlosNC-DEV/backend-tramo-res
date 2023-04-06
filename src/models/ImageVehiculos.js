import {Schema,model} from 'mongoose';

const ObjectId = Schema.ObjectId;

const fotosVehiculoSchema = new Schema({
        idFotoFrontal :{type:String,required:true},
        FotoFrontal :{type:String,required:true},
        idFotoVolco :{type:String,required:true},
        FotoVolco :{type:String,required:true},
        idFotolateral_Izq :{type:String,required:true},
        Fotolateral_Izq :{type:String,required:true},
        idFotolateral_Der :{type:String,required:true},
        Fotolateral_Der :{type:String,required:true},
        idFotolateral_IzqTrailer :{type:String,required:true,default:null} ,
        Fotolateral_IzqTrailer :{type:String,required:true,default:null} ,
        idFotolateral_DerTrailer:{type:String,required:true,default:null}  ,
        Fotolateral_DerTrailer:{type:String,required:true,default:null}  ,
        idFotoVolco_Trailer :{type:String,required:true,default:null} ,
        FotoVolco_Trailer :{type:String,required:true,default:null} ,
        
        idVehiculoFotos:{type:ObjectId,required:true}
},{
    timestamps: true,
    versionKey: false
});


export default model('FotosVehiculos',fotosVehiculoSchema);
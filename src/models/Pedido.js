import { Schema, model } from 'mongoose';

const schemaPedido = new Schema(
    {
        ubicacionCarga:{
            type: String,
            required: true
        },
        ubicacionEntrega:{
            type: String,
            required: true
        },

        tipoCargaPED:{
            type: String,
            required: true
        },
        productoPED:{
            type: String,
            required: true
        },
        riesgoCargaPED:{
            type: String,
            required: true
        },
        cantidadCarga:{
            type: Number,
            required: true
        },
        fragilidadPED:{
            type: String,
            required: true
        },
        idfotoCarga:{
            type: String,
            required: true
        },

        fotoCarga:{
            type: String,
            required: true
        },
        precioCarga:{
            type: Number,
            required: true
        },
        medioPagoPED:{
            type: String,
            required: true
        },
        comentario_PED:{
            type: String,
            default: null
        },
        calificacionConductorPED:{
            type: Number,
            required: true,
            float: true
        },
        calificacionServicioPED:{
            type: Number,
            required: true,
            float: true
        },
        id_conductor:{
            ref: "Conductores",
            type: Schema.Types.ObjectId,
            required: true
        },
        usuario:{
            id_natural:{
                ref: "PersonaNatural",
                type: Schema.Types.ObjectId,
                default: null
            },
            id_empresa:{
                ref: "PersonaJuridica",
                type: Schema.Types.ObjectId,
                default: null
            }
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model("Pedidos", schemaPedido)
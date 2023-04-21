import { Schema, model } from 'mongoose';

const schemaPedido = new Schema(
    {
        recogida:{
            latitud:{
                type: Number,
                float:true,
                required: true
            },
            longitud:{
                type: Number,
                float: true,
                required: true
            }
        },
        destino:{
            latitud:{
                type: Number,
                float:true,
                required: true
            },
            longitud:{
                type: Number,
                float: true,
                required: true
            }
        },
        descripcionUbicacion:{
            type: String
        },
        destinatario:{
            tipo:{
                type: String
            },
            tipoIdentificacion:{
                type: String
            },
            numeroIdentificacion:{
                type: String
            },
            nombreEntidad:{
                type: String,
                default: null
            },
            razonSocial:{
                type: String,
                default: null
            }
        },
        pagoCarga:{
            type: String,
            required:true
        },
        pagoDescarge:{
            type: String,
            required:true
        },
        carga:{
            tipoCarga:{
                type: String
            },
            producto:{
                type: String
            },
            empaque:{
                type: String
            },
            riesgo:{
                type: String
            },
            cantidadAproximada:{
                type: String
            },
            cuidadoCarga:{
                type: String
            },
            fotoCarga:{
                idFoto:{
                    type: String,
                    default: null
                },
                urlCarga:{
                    type: String,
                    default: null
                }
            }
        },
        metodoPago:{
            type: String
        },
        calificacionConductorPED:{
            type: Number,
            default: null
        },
        calificacionServicioPED:{
            type: Number,
            default: null
        },
        id_usuario:{
            type: Schema.Types.ObjectId,
            required: true
        },
        id_conductor:{
            ref: "Conductores",
            type: Schema.Types.ObjectId,
            default: null
        },
        estado:{
            enEspera:{
                type: Boolean,
                default: true
            },
            atendiendo:{
                type: Boolean,
                default: false
            },
            terminado:{
                type: Boolean,
                default: false
            }
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model("Pedidos", schemaPedido)
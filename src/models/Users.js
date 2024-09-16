import {Schema , model} from "mongoose"

const User = new Schema({
    Name: {
        type: String,
        required: true,
        trim: true, //Delete spaces
    },
    Surname: {
        type: String,
        trim: true,
    },

    Email: {
        type: String,
        trim: true,
        unique: false, //Unique mails
    },

    Pass: {
        type: String,
        trim: true,
    },

    Verify: {
        type: Boolean,
        trim: true,
    },

    Movimientos: [
        {
          tipo: { type: String },
          cantidad: { type: Number },
          fecha: { type: Date }
        }
      ],

      Estado_Financiero: {
        saldoInicial: { type: Number, default: 0 }
      },



}, {
    timestamps: true,  // when user is created
    versionKey: false , // esto es para evitar los __v de mongoose / nodemon
});

export default model('users',User)






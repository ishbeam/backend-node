import { Schema, model } from 'mongoose';

const OpisSchema = new Schema({

    regular: {
        price: Number
    },

    plus: {
        price: Number
    },

    premium: {
        price: Number
    },

    diesel: {
        price: Number
    }
})

export const Opis = model('Opis', OpisSchema)
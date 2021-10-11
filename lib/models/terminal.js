import { Schema, model, SchemaTypes } from 'mongoose';
import { PointSchema } from '.';

/*
** Terminal schema which can be built out but this is a start.
*/

const TerminalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    location: {
        type: PointSchema,
        required: true
    },
    address: String,
    // address: {
    //     street: String,
    //     city: String,
    //     state: String,
    //     zip: Number
    // },
    
    suppliers: [{
        name: String,
        coId: String,
        fuels: [String]
    }]
})

export const Terminal = model('Terminal', TerminalSchema);
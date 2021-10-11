import { Document, Schema, Model, model } from 'mongoose';


const PriceSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },

    fuels: [
        {
            fuel_type: String,
            price: Number,
            low: Number,
            high: Number
        }
    ]

    // updated_at: {
    //     type: Number
    // }
})

// PriceSchema.pre('update', function(next, docs) {
//     console.log('DOCS', docs)
//     next()
// })

export const PriceRange = model('PriceRange', PriceSchema)
/**
 * The bid is used by the Supplier to Bid on an Order
 */

import { Schema, model } from 'mongoose';


const BidSchema = new Schema({
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },

    // price: {
    //     type: Number,
    //     required: true
    // },

    products: [
        {
            fuel_type: {
                type: String, required: true
            },
            quantity: {
                type: Number, required: true
            },
            // This is OPIC +/-
            plusminus: {
                type: String, required: true
            },
            price: {
                type: String,
                type: Number
            }
        }
    ],

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },

    pickup: {
        type: Schema.Types.ObjectId,
        ref: 'Terminal',
        required: true
    },

    expires: {
        type: Date,
        required: true
    },

    total_price: {
        type: Number,
        default: 0
    },

    total_quantity: {
        type: Number,
        default: 0
    },

    created_at: {
        type: Number,
        default: Date.now
    }
})

// Calc the sum of all the products * price per gallon
const OPIS = 1.17
BidSchema.pre('save', function(next) {
    let total = 0;
    let quantity = 0;
    for(let i = 0; i < this.products.length; i++) {
        total += (Number(this.products[i].price) + OPIS) * Number(this.products[i].quantity)
        quantity += Number(this.products[i].quantity)
    }
    this.total_price = total
    this.total_quantity = quantity

    next()
})

export const Bid = model('Bid', BidSchema)
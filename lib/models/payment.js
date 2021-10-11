import { model, Schema } from 'mongoose';

const PaymentSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        default: null,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },

    retailer: {
        type: Schema.Types.ObjectId,
        ref: 'Retailer',
        required: true
    },

    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },

    status: {
        type: String,
        default: 'pending'
    },

    created_at: {
        type: Date,
        default: Date.now
    }
})

export const Payment = model('Payment', PaymentSchema)
import { model, Schema } from 'mongoose';

const OrderProgressSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    },
    
    payment: {
        id: {
            type: String,
            default: null
        },
        status: {
            type: String,
            default: 'pending'
        }
    },

    pickup: {
        status: String,
        completed: {
            type: Date,
            default: -1
        }
    },

    dropoff: {
        status: String,
        completed: {
            type: Date,
            default: -1
        }
    },

    created_at: {
        type: Date,
        default: Date.now
    }
})

export const OrderProgress = model('OrderProgress', OrderProgressSchema)
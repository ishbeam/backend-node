import { Document, Schema, Model, model } from 'mongoose';

const TripSchema = new Schema({ 
    bol: {
        type: String,
        default: ''
    },

    driver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        unique: true,
        required: true
    },

    pickup: {
        type: Schema.Types.ObjectId,
        ref: 'Terminal',
        required: true
    },

    dropoff: {
        type: Schema.Types.ObjectId,
        ref: 'Terminal',
        required: true
    },

    status: {
        type: String,
        enum: ['pending_start', 'at_pickup', 'en_route', 'at_dropoff', 'complete'],
        default: 'pending_start'
    },

    deadline: {
        type: Date,
        required: true
    }
}, { _id: false })

export const Trip = model('Trip', TripSchema);
import { Schema, Model, model } from 'mongoose';


const OrderSchema = new Schema({
    retailer: {
        type: Schema.Types.ObjectId,
        ref: 'Retailer',
        required: true
    },
    
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        default: null
    },

    driver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    type: {
        type: String,
        enum: ['auction', 'instant'],
        required: true
    },

    // Default expires in 10 mins
    expires: {
        type: Date,
        //default: new Date().setMinutes(new Date().getMinutes() + 10)
    },

    awarded_bid: {
        type: Object,
        default: null
    },

    products: [{
        fuel_type: {
            type: String,
            // enum: [FuelEnum._89, FuelEnum._91, FuelEnum._93, FuelEnum._DIESEL],
            required: true
        },
        quantity: Number
    }],

    deadline: {
        type: Date
    },

    pickup: {
        type: Schema.Types.ObjectId,
        ref: 'Terminal',
        default: null
    },

    dropoff: {
        type: Schema.Types.ObjectId,
        ref: 'Site',
        default: null
    },

    total_price: {
        type: Number,
        default: 0
    },

    total_quantity: {
        type: Number,
        default: 0
    },

    progress: {
        // type: Schema.Types.ObjectId,
        // ref: 'OrderProgress',
        // default: null 
        pickup: {
            enroute: {
                type: Number,
                default: 0
            },
            arrived: {
                type: Number,
                default: 0
            },
            completed: {
                type: Number,
                default: 0
            },
            
        },

        dropoff: {
            enroute: {
                type: Number,
                default: 0
            },
            arrived: {
                type: Number,
                default: 0
            },
            completed: {
                type: Number,
                default: 0
            },
        }
    }
})

// OrderSchema.post('save', function(res, next) {

// })

export const Order = model('Order', OrderSchema)
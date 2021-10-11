import { Schema, model } from 'mongoose';
import { PasswordService } from '../services';


const UserSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: 'abc123',
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    company: {
        id: {
            type: Schema.Types.ObjectId,
        },
        type: {
            type: String,
            enum: ['retailer', 'supplier'],
        },
        role: {
            type: String,
            enum: ['admin', 'member', 'driver'],
        },
        required: false
    },

    created_at: {
        type: Number,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    console.log(this.created)
    // if(!this.created) {
    //     this.password = PasswordService.hash(this.password)
    // }
    next()
})

export const User = model('User', UserSchema);
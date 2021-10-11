import { Document, Schema, model } from 'mongoose';


const InvitationSchema = new Schema({
    email: {
        // email to be invited
        type: String,
        required: true
    },
    company: {
        id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        type: {
            type: String,
            enum: ['retailer', 'supplier'],
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'member'],
            required: true
        },
    },
    user: {
        name: String,
        email: String
    },
    date: {
        // date invite was sent, expires after 1 day
        type: Date,
        default: Date.now,
        expires: '1d'
    }
})

export const Invitation = model('Invitation', InvitationSchema);

import { Document, Schema, model } from 'mongoose';

// // const RetailerSchema = new Schema({
// //     name: {
// //         type: String,
// //         required: true
// //     },
// //     rating: {
// //         type: Number,
// //         required: false,
// //         default: 5
// //     },
// //     sales: {
// //         first_name: {
// //             type: String,
// //             default: ''
// //         },
// //         last_name: {
// //             type: String,
// //             default: ''
// //         },
// //         email: {
// //             type: String,
// //             default: ''
// //         },
// //         phone: {
// //             type: String,
// //             default: ''
// //         },
// //         address: {
// //             type: String,
// //             default: ''
// //         },
// //         second_address: {
// //             type: String,
// //             default: ''
// //         },
// //         city: {
// //             type: String,
// //             default: ''
// //         },
// //         state: {
// //             type: String,
// //             default: ''
// //         },
// //     },
// //     billing: {
// //         first_name: {
// //             type: String,
// //             default: ''
// //         },
// //         last_name: {
// //             type: String,
// //             default: ''
// //         },
// //         email: {
// //             type: String,
// //             default: ''
// //         },
// //         phone: {
// //             type: String,
// //             default: ''
// //         },
// //         address: {
// //             type: String,
// //             default: ''
// //         },
// //         second_address: {
// //             type: String,
// //             default: ''
// //         },
// //         city: {
// //             type: String,
// //             default: ''
// //         },
// //         state: {
// //             type: String,
// //             default: ''
// //         },
// //     },
// // })

// const SupplierSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     rating: {
//         type: Number,
//         required: false,
//         default: 5
//     },
//     sales: {
//         first_name: {
//             type: String,
//             default: ''
//         },
//         last_name: {
//             type: String,
//             default: ''
//         },
//         email: {
//             type: String,
//             default: ''
//         },
//         phone: {
//             type: String,
//             default: ''
//         },
//         address: {
//             type: String,
//             default: ''
//         },
//         second_address: {
//             type: String,
//             default: ''
//         },
//         city: {
//             type: String,
//             default: ''
//         },
//         state: {
//             type: String,
//             default: ''
//         },
//     },
//     billing: {
//         first_name: {
//             type: String,
//             default: ''
//         },
//         last_name: {
//             type: String,
//             default: ''
//         },
//         email: {
//             type: String,
//             default: ''
//         },
//         phone: {
//             type: String,
//             default: ''
//         },
//         address: {
//             type: String,
//             default: ''
//         },
//         second_address: {
//             type: String,
//             default: ''
//         },
//         city: {
//             type: String,
//             default: ''
//         },
//         state: {
//             type: String,
//             default: ''
//         },
//     },
// })

// CarrierSchema.index({ location: "2dsphere" })

// export const Supplier = model('Supplier', SupplierSchema);
// export const Retailer = model('Retailer', RetailerSchema);
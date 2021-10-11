import { Payment, Order, OrderProgress } from '../models/index';

export async function pay(orderId) {
    const existingPayment = await Payment.findOne({ order: orderId })
    if(existingPayment != null) {
        console.log(existingPayment.toObject())
        return existingPayment
    }

    const order = await Order.findById(orderId)

    const _p = {
        retailer: order.retailer,
        supplier: order.supplier,
        order: orderId,
        // amount: order.awarded_bid.total_price,
        status: 'Funds Approved'
    }

    const p = await Payment.create(_p)
    console.log(p.toObject())
    const progress = await OrderProgress.findOneAndUpdate({ order: orderId }, { $set: { payment: { id: p._id, status: p.status }}})

    return p;
}

export async function find(query) {
    return Payment.find({ ...query })
}

export async function getStatus(orderId) {
    const p = await Payment.findOne({ order: orderId })
    console.log(p)
    if(!p) {
        return null
    }

    return p.status
}
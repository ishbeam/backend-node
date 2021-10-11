import { PaymentService } from '../services/index';

export async function pay(req, res, next) {
    const { orderId } = req.body;

    try {
        const payment = await PaymentService.pay(orderId)

        return res.send(payment)
    } catch(e) {
        return next(e)
    }
}

export async function find(req, res, next) {
    const { query } = req

    try {
        const payments = await PaymentService.find({ ...query })

        return res.send(payments)
    } catch(e) {
        return next(e)
    }
}

export async function getStatus(req, res, next) {
    const { orderId } = req.params;
    
    try {
        const status = await PaymentService.getStatus(orderId)

        return res.send(status)
    } catch(e) {
        return next(e)
    }
}
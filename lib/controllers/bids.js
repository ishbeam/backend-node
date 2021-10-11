import { BidService, OrderService } from '../services';

export async function create(req, res, next) {
    const { orderId } = req.params
    const { user } = req.session;

    const bid = {
        ...req.body,
        supplier: user.company.id,
        order: orderId
    }

    try {
        const b = await BidService.create(bid);

        res.status(201).send(b);
    } catch(err) {
        next(err);
    }
}

/**
 * List all bids for an order
 */
export async function list(req, res, next) {
    const { orderId } = req.params;
    
    try {
        const bids = await BidService.list(orderId);
        res.status(200).send(bids);
    } catch(err) {
        next(err);
    }
}

/**
 * Update a bid, by ID.
 */
export async function update(req, res, next) {
    const { orderId } = req.params;
    const fields = req.body;

    try {
        const order = await BidService.update(orderId, fields);
        res.status(200).send(order);
    } catch(err) {
        next(err);
    }
}

/**
 * Delete an order, by orderId .
 */
export async function remove(req, res, next) {
    const { orderId } = req.params;

    try {
        const order = await BidService.remove(orderId);
        res.status(200).send('OK');
    } catch(err) {
        next(err);
    }
}


/**
 * Get an order, by orderId .
 */
export async function get(req, res, next) {
    const { orderId } = req.params;

    try {
        const order = await BidService.get(orderId);
        res.status(200).send(order);
    } catch(err) {
        next(err);
    }
}

// export async function list(req, res, next) {
//     const { orderId } = req.params;

//     try {
//         const bids = await BidService.list(orderId);
//         res.status(200).send(bids);
//     } catch(err) {
//         next(err);
//     }
// }
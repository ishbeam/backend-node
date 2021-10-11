import { Supplier, Order, OrderProgress, PriceRange } from '../models';

import { BidService, PaymentService } from '.';


import OrderEvents from '../listeners/orders.js';
import schedule from 'node-schedule';

const DEFAULT_AUCTION_LENGTH = 4;

/**
 * Creates a new order, called by retailer.
 */
export async function create(order, user) {

    // Set expiration date for when to choose the winning bid
    order.expires = new Date();
    order.expires.setMinutes(order.expires.getMinutes() + DEFAULT_AUCTION_LENGTH);

    let tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    if(order.hasOwnProperty('deadline')) {
        if(order.deadline < tomorrow) {
            throw { status: 404, message: "Order 'deadline' property must be at least 24 hours in advance." };
        }
    } else {
        order.deadline = tomorrow;
    }

    // Assign the retailer 
    order.retailer = user.company.id;
    const _order = await Order.create(order);

    // Start the progress for the order
    await OrderProgress.create({ order: _order._id })

    OrderEvents.emit('created');

    schedule.scheduleJob(order.expires, async function(order_id) {
        OrderEvents.emit('auction_complete', order_id);
        await award(order_id);
        // await update(order_id, { pickup: getPickupTerminal(order_id) })
    }.bind(null, _order._id));

    return _order;
}

export async function update(id, fields) {
    return await Order.findByIdAndUpdate(id, { $set: fields }, { new: true });
}

/**
 * Delete an order, by ID.
 */
export async function remove(id) {
    return await Order.findByIdAndDelete(id);
}

/**
 * Get an order, by ID.
 */
export async function get(id) {
    const payments = await PaymentService.find({ order: id })
    const order = await Order.findById(id).populate('driver').populate('dropoff').populate('pickup');
    order.progress.payment = payments[0] || null;

    return order
}

/**
 * This awards the order to the lowest bid
 * @param id the id of the order
 */
export async function award(id) {
    const bids = await BidService.list(id);
    if(bids.length <= 0) {
        // const order = await get(id);
        // const bid = await getInstantBid(id, order.products);
        // return await update(id, { awarded_bid: bid });
        return await remove(id)
    }


    let lowest = bids[0]
    bids.forEach((b) => {
        if(b.price < lowest.price)
            lowest = b
    })
    console.log('LOWEST', lowest)

    await update(id, { awarded_bid: lowest, supplier: lowest.supplier, pickup: lowest.pickup/*getPickupTerminal(id)*/ })

    return { success: true }
}

export async function listOpen(user) {
    const orders = await Order.find({ deadline: { $gte: new Date() } }).populate('dropoff')

    return orders;
}

/**
 * @param products (list of products and prices on the order)
 * @returns a supplier with all the products on a compatible price range
 * @deprecated only here to show example of $elemMatch query
 */
export async function findSupplier(products) {
    /**
     * Find supplier based on requested products
     */
    const query = products.map((p) => {
        return {
            fuels: {
                $elemMatch: {
                    fuel_type: p.fuel_type,
                    low: { $lte: p.price }
                }
            }
        }
    });

    // Finds first supplier that carries all fuel types
    const pr = await PriceRange.find({ $and: [...query] });
    return pr[0].company;
}


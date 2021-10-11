import { Bid, Order } from '../models';

/**
 * Creates a new Bid, called by retailer.
 * NOTE kinda ridiculous to have to get the order just to put expires prop on bid
 */
export async function create(bid) {
    const order = await Order.findById(bid.order);

    console.log('bidding', bid)
    if(await Bid.exists({ order: bid.order, supplier: bid.supplier }))
        throw { status: 403, message: "Cannot submit multiple bids for the same order." };

    bid.expires = order.expires;

    return await Bid.create(bid);
}

export async function update(id, fields) {

    return await Bid.findByIdAndUpdate(id, { $set: fields }, { new: true });

}

/**
 * Delete an Bid, by ID.
 */
export async function remove(id) {

    return await Bid.findByIdAndDelete(id);

}

/**
 * Get an Bid, by ID.
 */
export async function get(id) {

    return await Bid.findById(id);

}

export async function list(order) {
    return await Bid.find({ order })
}

/**
 * Finds all orders (with bids attached) that the supplier has placed a bid for
 * @param supplier id of the supplier
 */
export async function findActive(supplier) {
    // 1. get all bids that havent expired yet
    // 2. Get orders based off those

    // Get all bids related to me (supplier)
    const bids = await Bid.find({ supplier/*, expires: { $gte: new Date()}*/ })

    // Pull the order id's off the bids
    const orderIds = bids.map(b => b.order)

    // Find all Orders with those id's (this handles duplicates implicitly)
    let orders = await Order.find({ _id: { $in: orderIds } })

    orders = orders.map((o) => {

        // Put the respective bid on the order, we'll likely need to reference it on the app
        let bid = bids.find(b => b.order.toString() == o._id.toString())

        return {
            ...o.toObject(),
            bid: bid.toObject()
        }
    })

    return orders;
}

/**
 * Finds orders that are available/relevant for bidding
 * NOTE this function will likely be moved as it will use a lot of queries like location n other stuff
 * NOTE For now, it just gets all Orders that haven't expired yet. Change it to $lte to get all bids
 * @param supplier id of the supplier
 */
export async function findOpen(supplier) {
    const orders = await Order.find({ expires: { $gte: new Date() } }).populate('dropoff')

    return orders;
}
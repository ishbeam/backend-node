import { OrderService, BidService, RetailerService, SupplierService } from '../services';


/**
 * Creates a new order, called by retailer.
 */
export async function create(req, res, next) {
    const _order = req.body;
    const { user } = req.session;

    try {
        const order = await OrderService.create(_order, user);

        res.status(201).send(order);
    } catch (err) {
        next(err);
    }
}

/**
 * Update an order, by ID.
 */
export async function update(req, res, next) {
    const { orderId } = req.params;
    const fields = req.body;

    try {
        const order = await OrderService.update(orderId, fields);
        res.status(200).send(order);
    } catch (err) {
        next(err);
    }
}

/**
 * Delete an order, by orderId .
 */
export async function remove(req, res, next) {
    const { orderId } = req.params;

    try {
        const order = await OrderService.remove(orderId);
        res.status(200).send('OK');
    } catch (err) {
        next(err);
    }
}


/**
 * Get an order, by orderId .
 */
export async function get(req, res, next) {
    const { orderId } = req.params;

    try {
        const order = await OrderService.get(orderId);
        res.status(200).send(order);
    } catch (err) {
        next(err);
    }
}

export async function listOpen(req, res, next) {
    const { user } = req.session
    
    try {
        const orders = await OrderService.listOpen(user)
        return res.send(orders)
    } catch(e) {
        return next(e)
    }
}

/**
 * This is for finding orders for main dashboards. Either open (available for bidding) or active (orders I've bid on)
 * This function should only be used for suppliers
 * COMBAK Aug 26 Currently behaves the same for both suppliers and retailers, which it shouldn't
 */
export async function find(req, res, next) {
    const { user } = req.session;
    const { query } = req;
    console.log('user', user)
    /**
     * Find Retailer orders
     */
    try {
        if (user.type == 'retailer') {

            if (query.type == 'active') {
                const orders = await RetailerService.Orders.getActive(user.company.id)

                return res.send(orders)
            }
            if (query.type == 'fulfilled') {
                const orders = await RetailerService.Orders.getFulfilled(user.company.id)

                return res.send(orders)
            }
        }

        /**
         * Find Supplier orders
         */
        if (user.type == 'supplier') {

            if (query.type == 'active') {
                const orders = await SupplierService.Orders.getActive(user.company.id)

                return res.send(orders)
            }
            if (query.type == 'fulfilled') {
                const orders = await SupplierService.Orders.getActive(user.company.id)

                return res.send(orders)
            }
        }

        throw 'invalid data in here';

    } catch (err) {
        next(err)
    }
}


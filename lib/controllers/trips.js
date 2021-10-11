import { TripService } from '../services';

/**
 * Creates a new order, called by retailer.
 */
export async function create(req, res, next) {
    const { orderId } = req.params;
    const _trip = req.body;
    const { user } = req.session;
    
    try {
        const trip = await TripService.create(_trip, orderId);
        res.status(201).send(trip);
    } catch(err) {
        next(err);
    }
}

/**
 * Delete an order, by ID.
 */
export async function remove(req, res, next) {
    const { orderId } = req.params;

    try {
        const trip = await TripService.remove(orderId);
        res.status(200).send('OK');
    } catch(err) {
        next(err);
    }
}


/**
 * Get an order, by ID.
 */
export async function get(req, res, next) {
    const { orderId } = req.params;
    
    try {
        const trip = await TripService.get(orderId);
        res.status(200).send(trip);
    } catch(err) {
        next(err);
    }
}
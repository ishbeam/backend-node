import { Trip } from '../models';



/**
 * Creates a new trip.
 */
export async function create(trip, orderId) {

    return await Trip.create(trip);

}

/**
 * Get a trip, by ID.
 */
export async function get(orderId) {

    return await Trip.findOne({ order: orderId });

}

/**
 * Delete a trip, by ID.
 */

export async function update(orderId, fields) {
  
    return await Trip.findOneAndUpdate({ order : orderId }, { $set: fields }, { new: true });

}

/**
 * Delete a trip, by ID.
 */
export async function remove(orderId) {

    return await Trip.findOneAndDelete({ order : orderId });

}


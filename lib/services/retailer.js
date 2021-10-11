import { UserService } from '.';
import { Retailer, Review } from '../models';
import { Order } from '../models';
import { ObjectId } from 'mongodb';

/**
 * Creates a new Retailer.
 */
export async function create(retailer, user) {
    // TODO make this a mongo transaction
    // https://medium.com/cashpositive/the-hitchhikers-guide-to-mongodb-transactions-with-mongoose-5bf8a6e22033
    const _retailer = await Retailer.create(retailer);
    const _company = { id: _retailer._id, type: "retailer", role: "admin"}
    const _user = await UserService.create({ ...user, company: _company });
    
    return { retailer: _retailer, user: _user }
}


export async function update(id, fields) {

    return await Retailer.findByIdAndUpdate(id, { $set: fields }, { new: true });

}

/**
 * Delete an Retailer, by ID.
 */
export async function remove(id) {

    return await Retailer.findByIdAndDelete(id);

}

/**
 * Get an Retailer, by ID.
 */
export async function get(id) {

    return await Retailer.findById(id);

}

export async function createReview(id, user, review) {
    const retailer = await get(id);
    review.user = user._id;
    review.company = retailer._id;
    review.type = "retailer";
    
    const created = await Review.create(review);
    const updated = await updateRating(id);
    return created;
}

export async function listReviews(id) {
    return await Review.find({ company: id });
}

export async function updateRating(id) {
    const reviews = await listReviews(id);
    let total = 0;
    reviews.forEach((review) => total += review.rating);
    const rating = total / reviews.length;
    return await update(id, { rating });
}


export const Orders = {

    async getActive(retailer) {
        const orders = await Order.find({ retailer/*, expires: { $gte: new Date() }*/ }).populate('dropoff').populate('pickup').populate('supplier').populate('retailer')
        
        return orders;
    },

    async getFulfilled(retailer) {
        const orders = await Order.find({ retailer, expires: { $lte: new Date() } }).populate('dropoff').populate('pickup').populate('supplier').populate('retailer')
        
        return orders;
    }

}
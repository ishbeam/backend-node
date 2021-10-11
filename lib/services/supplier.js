import { UserService } from '.';
import { Supplier, Review, Order } from '../models';
import { ObjectId } from 'mongodb';

/**
 * Creates a new Supplier.
 */
export async function create(supplier, user) {
    // TODO make this a mongo transaction
    // https://medium.com/cashpositive/the-hitchhikers-guide-to-mongodb-transactions-with-mongoose-5bf8a6e22033
    const _supplier = await Supplier.create(supplier);
    const _company = { id: _supplier._id, type: "supplier", role: "admin"}
    const _user = await UserService.create({ ...user, company: _company });
    
    return { supplier: _supplier, user: _user }
}

export async function update(id, fields) {

    return await Supplier.findByIdAndUpdate(id, { $set: fields }, { new: true });

}

/**
 * Delete an Supplier, by ID.
 */
export async function remove(id) {

    return await Supplier.findByIdAndDelete(id);

}

/**
 * Get an Supplier, by ID.
 */
export async function get(id) {

    return await Supplier.findById(id);

}

export async function createReview(id, user, review) {
    const supplier = await get(id);
    review.user = user._id;
    review.company = supplier._id;
    review.type = "supplier";
    
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

    async getActive(supplier) {
        const orders = await Order.find({ supplier: supplier }).populate('dropoff').populate('pickup').populate('supplier').populate('retailer')

        return orders;
    },
    
    async getPast(supplier) {
        const orders = await Order.find({ supplier: supplier }).populate('dropoff').populate('pickup').populate('supplier').populate('retailer')

        return orders;
    }
}
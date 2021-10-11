import { UserService, SupplierService, OrderService, MarketService } from '../services';

/**
 * Creates a new supplier, called by user.
 */
export async function create(req, res, next) {
    const { company: _c, user: _u } = req.body;
    
    try {
        const { supplier, user } = await SupplierService.create(_c, _u);
        // Note We resave user on the session bc user now has a company on it
        req.session.user = user;
        req.session.save((err) => console.log('User saved if this is not null -> ', err))

        res.status(201).send(supplier);
    } catch(err) {
        next(err);
    }
}

/**
 * Update an supplier, by ID.
 */
export async function update(req, res, next) {
    const { supplierId  } = req.params;
    const fields = req.body;

    try {
        const supplier = await SupplierService.update(supplierId , fields);
        res.status(200).send(supplier);
    } catch(err) {
        next(err);
    }
}

/**
 * Delete an supplier, by supplierId .
 */
export async function remove(req, res, next) {
    const { supplierId  } = req.params;

    try {
        const supplier = await SupplierService.remove(supplierId );
        res.status(200).send('OK');
    } catch(err) {
        next(err);
    }
}


/**
 * Get an supplier, by supplierId .
 */
export async function get(req, res, next) {
    const { supplierId  } = req.params;
    
    try {
        const supplier = await SupplierService.get(supplierId );
        res.status(200).send(supplier);
    } catch(err) {
        next(err);
    }
}

export async function createReview(req, res, next) {
    const { supplierId } = req.params;
    const { user } = req.session;
    const _review = req.body;

    try {
        const review = await SupplierService.createReview(supplierId, user, _review);
        res.status(201).send(review);
    } catch(err) {
        next(err);
    }
}

export async function listReviews(req, res, next) {
    const { supplierId } = req.params;

    try {
        const reviews = await SupplierService.listReviews(supplierId);
        res.status(200).send(reviews);
    } catch(err) {
        next(err);
    }
}

// export async function getPendingOrders(req, res, next) {
//     const { companyId } = req.params;

//     try {
//         const orders = await OrderService.findPendingOrders(companyId)

//         return res.status(200).send(orders)
//     } catch(e) {
//         return next(e)
//     }
// }

export async function getFuelPrices(req, res, next) {
    try {
        const prices = MarketService.getFuelPrices()

        return res.status(201).send(prices)
    } catch(e) {
        return next(e)
    }
}

// export const Drivers = {

//     async list(req, res, next) {
//         const { user } = req.session;

//         try {
//             const drivers = await UserService.Drivers.list(user.company.id)

//             return res.send(drivers)
//         } catch (e) {
//             return next(e)
//         }
//     },

// }
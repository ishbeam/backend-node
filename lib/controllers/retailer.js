import { RetailerService, UserService } from '../services';


/**
 * Creates a new retailer, called by retailer.
 * @todo needs to use the invitation shit
 */
export async function create(req, res, next) {
    const { company: _c, user: _u } = req.body;
    
    try {
        const { retailer, user } = await RetailerService.create(_c, _u);
        // Note We resave user on the session bc user now has a company on it
        req.session.user = user;
        req.session.save((err) => console.log('User saved if this is not null -> ', err))

        res.status(201).send(retailer);
    } catch(err) {
        next(err);
    }
}

/**
 * Update an retailer, by ID.
 */
export async function update(req, res, next) {
    const { retailerId } = req.params;
    const fields = req.body;

    try {
        const retailer = await RetailerService.update(retailerId , fields);
        res.status(200).send(retailer);
    } catch(err) {
        next(err);
    }
}

/**
 * Delete an retailer, by retailerId .
 */
export async function remove(req, res, next) {
    const { retailerId  } = req.params;

    try {
        const retailer = await RetailerService.remove(retailerId );
        res.status(200).send('OK');
    } catch(err) {
        next(err);
    }
}


/**
 * Get an retailer, by retailerId .
 */
export async function get(req, res, next) {
    const { retailerId  } = req.params;
    
    try {
        const retailer = await RetailerService.get(retailerId );
        res.status(200).send(retailer);
    } catch(err) {
        next(err);
    }
}

export async function createReview(req, res, next) {
    const { retailerId } = req.params;
    const { user } = req.session;
    const _review = req.body;

    try {
        const review = await RetailerService.createReview(retailerId, user, _review);
        res.status(201).send(review);
    } catch(err) {
        next(err);
    }
}

export async function listReviews(req, res, next) {
    const { retailerId } = req.params;

    try {
        const reviews = await RetailerService.listReviews(retailerId);
        res.status(200).send(reviews);
    } catch(err) {
        next(err);
    }
}

// export const Orders = {

//     async get(req, res, next) {

//         const { type } = req.query;
//         const { user } = req.session;
        
//         try {
//             if(type == 'active') {
//                 const orders = await RetailerService.Orders.getActive(user)
                
//                 return res.send(orders)
//             }
//             if(type == 'open') {
//                 const orders = await RetailerService.Orders.getPast(user)

//                 return res.send(orders)
//             }

//             throw 'no type on the query'

//         } catch(e) {
//             console.log(e)
//             return next(e)
//         }
//     }
// }
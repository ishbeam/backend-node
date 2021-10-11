import { UserService } from '../services';


/**
 * Creates a new order, called by retailer.
 */
export async function create(req, res, next) {
    const _user = req.body;
    
    try {
        const user = await UserService.create(_user);

        if(!user) {
            throw 'No user created';
        }
        
        req.session.user = user;
        req.session.save((err) => console.log('User saved to session if this is null ->', err))
        
        res.status(201).send(user);
    } catch(err) {
        next(err);
    }
}

/**
 * Update an order, by ID.
 */
export async function update(req, res, next) {
    const { userId } = req.params;
    const fields = req.body;

    try {
        const order = await UserService.update(userId, fields);
        res.status(200).send(order);
    } catch(err) {
        next(err);
    }
}

/**
 * Delete a user, by user _id .
 */
export async function remove(req, res, next) {
    const { userId } = req.params;

    try {
        await UserService.remove(userId);
        res.status(200).send('OK');
    } catch(err) {
        next(err);
    }
}


/**
 * Get a user by user _id .
 */
export async function get(req, res, next) {
    const { userId } = req.params;
    
    try {
        const user = await UserService.get(userId);
        res.status(200).send(user);
    } catch(err) {
        next(err);
    }
}

export async function find(req, res, next) {
    const { user } = req.session;
    const { query } = req;

    try {
        // Put the user's company id on it so it only grabs them from their company
        const users = await UserService.find({ ...query, 'company.id': user.company.id })

        return res.send(users)
    } catch(e) {
        return next(e)
    }
}

/**
 * @todo make this prod ready, rn it literally just creates a user
 */
export async function invite(req, res, next) {
    const { user } = req.session

    let _user = {
        ...req.body,
        company: {
            ...req.body.company,
            id: user.company.id
        }
    }
    try {
        const u = await UserService.create(_user)
        return res.send(u)
    } catch(e) {
        return next(e)
    }
}

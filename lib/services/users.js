import { PasswordService } from '.'
import { User } from '../models';
/**
 * Creates a new order, called by retailer.
 */
export async function create(user) {

    // if (user.hasOwnProperty('password')) {
    //     user.password = await PasswordService.hash(user.password);
    // }

    return await User.create(user);
}

// export async function authenticate(email, password) {

//     User.find()

// }

export async function update(id, fields) {
    if (fields.hasOwnProperty('password')) {
        fields.password = await PasswordService.hash(fields.password);
    }

    return await User.findByIdAndUpdate(id, { $set: fields }, { new: true });
}

/**
 * Delete an order, by ID.
 */
export async function remove(id) {

    return await User.findByIdAndDelete(id);
}

/**
 * Get an order, by ID.
 */
export async function get(id) {

    return await User.findById(id);
}

export async function find(query) {
    return await User.find(query)
} 

export const Drivers = {
    async list(supplier) {
        const drivers = await User.find({ 'company.id': supplier, 'company.role': 'driver' })

        return drivers;
    }
}

// export async function login(req, res, next) {
//     // COMBAK use basic-auth to pass stuff thru headers

//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user)
//             throw { status: 401, message: 'No user with those credentials.' };

//         // if (!user.confirmed)
//         //     throw { status: 401, message: 'User has not confirmed their e-mail.' };

//         // if (!await PasswordService.comparePassword(password, user.password))
//         //     throw { status: 401, message: 'Password is invalid.' };

//         req.session.user = user;

//         req.session.save((err) => console.log('user saved to session if this value is null ->', err))

//         return res.status(200).send(req.session);
//     } catch (e) {
//         return next(e);
//     }
// }
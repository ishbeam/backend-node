import { Invitation } from '../models';
import { UserService } from '.';

/**
 * Creates a new Invitation
 */
export async function create(invitation) {
    return await Invitation.create(invitation);
}

/**
 * Delete an invitation, by ID.
 */
export async function remove(id) {
    return await Invitation.findByIdAndDelete(id);
}

/**
 * Get an Invitation, by ID.
 */
export async function get(id) {
    return await Invitation.findById(id);
}

export async function accept(id, user) {
    const inv = await get(id);

    if (inv.email != user.email)
        throw { status: 403, message: "This invitation was sent to another user."}

    // TODO make this a mongo transaction
    // https://medium.com/cashpositive/the-hitchhikers-guide-to-mongodb-transactions-with-mongoose-5bf8a6e22033
    const _user = await UserService.update(user._id, { company: inv.company });
    return await remove(id);
}

export async function reject(id, user) {
    const inv = await get(id);

    if (inv.email != user.email)
        throw { status: 403, message: "This invitation was sent to another user."}

        return await remove(id);
}
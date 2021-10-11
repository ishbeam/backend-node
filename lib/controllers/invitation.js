import { InvitationService } from '../services';


/**
 * Creates a new invitation, should be called by company admin.
 * TODO Should send out an email.
 * TODO Create the user with { user.confirmed = false }
 * COMBAK can be called by anyone but should only be able to be called by admin.
 */
export async function create(req, res, next) {
    const _invitation = req.body;
    
    try {
        const invitation = await InvitationService.create(_invitation);

        res.status(201).send(invitation);
    } catch(err) {
        next(err);
    }
}


/**
 * Get an invitation.
 */
export async function get(req, res, next) {
    const { invId } = req.params;
    
    try {
        const invitation = await InvitationService.get(invId);
        res.status(200).send(invitation);
    } catch(err) {
        next(err);
    }
}

/**
 * Accept an invitation, by invId.
 */
export async function accept(req, res, next) {
    const { invId } = req.params;
    const { user } = req.session;

    try {
        const status = await InvitationService.accept(invId, user);
        res.status(200).send('OK');
    } catch(err) {
        next(err);
    }
}

/**
 * Reject an invitation, by invId.
 */
export async function reject(req, res, next) {
    const { invId } = req.params;
    const { user } = req.session;

    try {
        const status = await InvitationService.reject(invId, user);
        res.status(200).send('OK');
    } catch(err) {
        next(err);
    }
}
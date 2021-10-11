import express from 'express';
import * as InvitationController from '../controllers/invitation.js';

const router = express.Router();

// Bids


/**
 * 1) Inits the bid
 * 2) @fires function for finding a compatible supplier
 */
router.route('')
    .post(InvitationController.create)

router.route('/:invId/accept')
    .put(InvitationController.accept)

router.route('/:invId/reject')
    .put(InvitationController.reject)

router.route('/:invId')
    .get(InvitationController.get)


export default router;
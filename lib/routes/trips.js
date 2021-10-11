import express from 'express';
import * as TripController from '../controllers/trips';

const router = express.Router({mergeParams: true});

// Bids

/**
 * 1) Inits the bid
 * 2) @fires function for finding a compatible supplier
 */
router.route('')
    .post(TripController.create)
    .delete(TripController.remove)
    .get(TripController.get)

export default router;
import express from 'express';
import * as RetailerController from '../controllers/retailer';

import TerminalRouter from './terminal';

const router = express.Router();

// Bids


/**
 * 1) Inits the bid
 * 2) @fires function for finding a compatible supplier
 */
router.route('')
    .post(RetailerController.create)

router.route('/:retailerId')
    .delete(RetailerController.remove)
    .get(RetailerController.get)
    .put(RetailerController.update)

router.use('/:retailerId/terminal', TerminalRouter);

export default router;
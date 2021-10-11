import express from 'express';
import TripRouter from './trips';
import * as OrderController from '../controllers/orders';
import * as BidController from '../controllers/bids';

const router = express.Router();


/**
 */
router.route('')
    .post(OrderController.create)
    .get(OrderController.find)
// .get(OrderController.find)


router.route('/open')
    .get(OrderController.listOpen)

router.use('/:orderId/trip', TripRouter);

router.route('/:orderId')
    .delete(OrderController.remove)
    .get(OrderController.get)
    .put(OrderController.update)

router.route('/:orderId/bid')
    .get(BidController.list)
    .post(BidController.create)
// .post(OrderController.Bids.create)


export default router;
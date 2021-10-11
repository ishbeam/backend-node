import express from 'express';
import * as MarketController from '../controllers/markets';

const router = express.Router();


router.route('/prices')
    .get(MarketController.getPrices)

// router.route('/:orderId')
//     .delete(OrderController.remove)
//     .get(OrderController.get)
//     .put(OrderController.update)

// router.route('/:orderId/bid')
//     // .get(BidController.list)
//     .post(BidController.create)


export default router;
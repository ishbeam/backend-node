import express from 'express';

import * as PaymentController from '../controllers/payment';

const router = express.Router()

router.route('/pay')
    .post(PaymentController.pay)

router.route('/status/:orderId')
    .get(PaymentController.getStatus)

export default router;
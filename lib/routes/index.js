import express from 'express';

import AnonRouter from './anon';
import InvitationRouter from './invitation';
import MarketRouter from './market';
import OrderRouter from './orders';
import OpisRouter from './opis';
import PaymentRouter from './payment';
import RetailerRouter from './retailer';
import SiteRouter from './site';
import SupplierRouter from './supplier';
import TerminalRouter from './terminal';
import UserRouter from './user';

import * as Auth from '../middlewares/auth';
import * as ErrorHandlers from '../middlewares/errors.js';

const router = express.Router();

router.route('/check').get((req, res, next) => {
    console.log('we in check')
    return res.send({"asas":"asass"});
});
router.route('/authenticate').get(Auth.authenticate, (req, res, next) => {
    console.log('we in hereeee')
    return res.send(req.session);
});

// router.route('/login').post(Auth.login)

//router.route('/login/:email').get(Auth.login)

router.use(AnonRouter);
//router.use(Auth.authenticate)

// router.use(Auth.authenticate);
router.use('/invitation', InvitationRouter);
router.use('/market', MarketRouter);
router.use('/retailer', RetailerRouter);
router.use('/opis', OpisRouter)
router.use('/order', OrderRouter);
router.use('/payment', PaymentRouter);
router.use('/site', SiteRouter)
router.use('/supplier', SupplierRouter);
router.use('/terminal', TerminalRouter);
router.use('/user', UserRouter)

router.use(ErrorHandlers.generic);

export default router;
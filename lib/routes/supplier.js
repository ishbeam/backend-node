import express from 'express';
import * as SupplierController from '../controllers/supplier';

// import TerminalRouter from './terminal';

const router = express.Router();

// Bids

/**
 * 1) Inits the bid
 * 2) @fires function for finding a compatible supplier
 */

router.route('')
    .post(SupplierController.create)

// router.use('/terminal', TerminalRouter);

router.route('/:supplierId')
    .delete(SupplierController.remove)
    .get(SupplierController.get)
    .put(SupplierController.update)





export default router;
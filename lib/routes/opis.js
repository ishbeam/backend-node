import express from 'express';
import * as OpisController from '../controllers/opis';

const router = express.Router()

router.route('/')
    .get(OpisController.get)
    .post(OpisController.create)
    .put(OpisController.update)



export default router;
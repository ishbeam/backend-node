import express from 'express';
import * as UserController from '../controllers/users';

const router = express.Router();

router.route('')
    .get(UserController.find)
    .post(UserController.create)

router.route('/:userId')
    .get(UserController.get)

router.route('/invite')
    .post(UserController.invite)

export default router;
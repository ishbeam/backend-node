import express from 'express';

import * as UserController from '../controllers/users';
import * as Auth from '../middlewares/auth';
import * as ErrorHandlers from '../middlewares/errors.js';

const router = express.Router();

router.route('/login').post(Auth.login);
router.route('/sign-up').post(UserController.create);
router.route('/logout').post(Auth.logout);
router.route('/status').get(Auth.status);

export default router;
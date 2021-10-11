import express from 'express';
import * as SiteController from '../controllers/site';

const router = express.Router({mergeParams: true});

router.route('')
    .get(SiteController.list)
    .post(SiteController.create)

router.route('/:siteId')
    .delete(SiteController.remove)
    .get(SiteController.get)
    .put(SiteController.update)

export default router;
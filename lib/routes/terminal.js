import express from 'express';
import * as TerminalController from '../controllers/terminal';

const router = express.Router({mergeParams: true});

router.route('')
    .get(TerminalController.list)
    .post(TerminalController.create)

router.route('/:terminalId')
    .delete(TerminalController.remove)
    .get(TerminalController.get)
    .put(TerminalController.update)

export default router;
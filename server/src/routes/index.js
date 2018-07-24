import { Router } from 'express';
import commentsRouter from './comments';
import eventsRouter from './events';
import groupsRouter from './groups';
import authRouter from './auth';
import usersRouter from './users';
import locationsRouter from './locations';
import tagsRouter from './tags';
import stripeDonationsRouter from './stripeDonations';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

router.use('/auth', authRouter);
router.use('/donate', stripeDonationsRouter);

// router.route('*')
//     .post(tokenMiddleware, isLoggedIn)
//     .put(tokenMiddleware, isLoggedIn)
//     .delete(tokenMiddleware, isLoggedIn);

router.use('/comments', commentsRouter);
router.use('/groups', groupsRouter);
router.use('/events', eventsRouter);
router.use('/users', usersRouter);
router.use('/locations', locationsRouter);
router.use('/tags', tagsRouter);

export default router;
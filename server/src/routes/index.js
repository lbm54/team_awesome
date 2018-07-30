import { Router } from 'express';
import commentsRouter from './comments';
import eventsRouter from './events';
import groupsRouter from './groups';
import authRouter from './auth';
import usersRouter from './users';
import locationsRouter from './locations';
import tagsRouter from './tags';
import uploadRouter from './upload';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';
// import rsvpRouter from '../routes/mailguncontact';
let router = Router();

router.use('/auth', authRouter);

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
router.use('/upload', uploadRouter);
// router.use('/rsvp', rsvpRouter);

export default router;
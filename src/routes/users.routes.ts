import {Router} from 'express';
import ctrl from '../controllers/users.controller';
import {check} from 'express-validator';
import auth from '../middlewares/auth.middleware';
import {Signuplimiter} from '../assets/rateLimiter';

const router = Router();
router
  .route('/')
  .get(auth.verifyToken, ctrl.getUser)
  .post(
    [
      check('name', 'The name is required').notEmpty(),
      check('mail', 'Please enter a valid email').normalizeEmail().isEmail(),
      check('password', 'Please enter a password of at least 6 characters').isLength({
        min: 6,
      }),
    ],
    Signuplimiter,
    ctrl.createUser
  );

export default router;

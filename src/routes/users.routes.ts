import {Router} from 'express';
import ctrl from '../controllers/users.controller';
import {check} from 'express-validator';

const router = Router();
router.post(
  '/',
  [
    check('name', 'The name is required').notEmpty(),
    check('mail', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Please enter a password of at least 6 characters').isLength({
      min: 6,
    }),
  ],
  ctrl.createUser
);

export default router;

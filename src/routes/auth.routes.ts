import {Router} from 'express';
import {check} from 'express-validator';
import ctrl from '../controllers/auth.controller';
const router = Router();

router.post(
  '/',
  [
    check('mail', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Please enter a password of at least 6 characters').isLength({
      min: 6,
    }),
  ],
  ctrl.loginUser
);

export default router;

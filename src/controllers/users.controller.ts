import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import {Payload, UserDocument} from '../interfaces/users.interface';

import helpers from '../herlpers/functions';

export default {
  createUser: async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {mail, password} = req.body;
    try {
      const isUser = await User.findOne({mail});

      if (isUser) {
        return res.status(400).json({
          msg: 'The email entered already belongs to another user',
        });
      }

      let user: UserDocument = new User(req.body);
      user.password = await helpers.hashPass(password);

      await user.save();

      const payload: Payload = {
        user: {
          id: user.id,
        },
      };

      const token = await jwt.sign(payload, process.env.SECRET_KEY!, {
        expiresIn: '2h',
      });

      res.status(200).json({
        token,
      });
    } catch (e) {
      next(e);
    }
  },

  getUser: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.status(200).json({user});
    } catch (e) {
      next(e);
    }
  },
};

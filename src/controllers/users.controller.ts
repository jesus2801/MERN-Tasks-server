import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import {UserDocument} from '../interfaces/users.interface';

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
          msg: 'User already exists',
        });
      }

      let user: UserDocument = new User(req.body);
      user.password = await helpers.hashPass(password);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = await jwt.sign(payload, process.env.SECRET_KEY!, {
        expiresIn: 7200,
      });

      res.status(200).json({
        token,
      });
    } catch (e) {
      next(e);
      // res.status(400).send('Sorry, there was an error');
    }
  },
};

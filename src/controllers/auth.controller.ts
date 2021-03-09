import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import {UserDocument} from '../interfaces/users.interface';

import helpers from '../herlpers/functions';

export default {
  loginUser: async function (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const {mail, password} = req.body;
      const user: UserDocument = await User.findOne({mail});
      if (!user) {
        return res.status(400).json({
          msg: 'Username does not exist',
        });
      }

      const isEquals = helpers.comparePass(password, user.password);
      if (!isEquals) {
        return res.status(400).json({
          msg: 'Incorrect password',
        });
      }

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
    }
  },
};

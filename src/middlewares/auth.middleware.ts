import {Response, NextFunction, Request} from 'express';
import jwt from 'jsonwebtoken';
import {Payload} from '../interfaces/users.interface';

export default {
  verifyToken: async function (req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({
        msg: 'access denied',
      });
    }

    try {
      const decoded: Payload = jwt.verify(token!, process.env.SECRET_KEY!) as Payload;
      req.user = decoded.user;
      next();
    } catch (e) {
      res.status(401).json({
        msg: 'access denied',
      });
    }
  },
};

import {Request, Response, NextFunction} from 'express';
import Project from '../models/Project';

export default {
  createProject: function (req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  },
};

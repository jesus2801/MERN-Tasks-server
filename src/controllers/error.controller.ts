import {Request, Response, NextFunction} from 'express';

const errorCtrl = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Sorry an error occurred');
  console.log(err);
};

export default errorCtrl;

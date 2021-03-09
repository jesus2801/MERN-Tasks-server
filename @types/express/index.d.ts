import {reqUser} from '../../src/interfaces/users.interface';

declare global {
  namespace Express {
    interface Request {
      user: reqUser;
    }
  }
}

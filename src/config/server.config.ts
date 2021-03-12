import compression from 'compression';
import express, {urlencoded, Application, json} from 'express';
import helmet from 'helmet';
// import morgan from 'morgan';
import cors from 'cors';

import usersCtrl from '../routes/users.routes';
import authCtrl from '../routes/auth.routes';
import taskCtrl from '../routes/tasks.routes';
import projectsCtrl from '../routes/projects.routes';
import connectDB from './database.config';
import auth from '../middlewares/auth.middleware';
import errorCtrl from '../controllers/error.controller';
import {limiter} from '../assets/rateLimiter';

class App {
  private app: Application;
  constructor(private port?: number) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.extra();
  }

  private settings() {
    connectDB();
    this.app.set('port', process.env.PORT || this.port || 5000);
    if (process.env.STATE! != 'dev') {
      this.app.set('trust proxy', true);
    }
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(
      cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        optionsSuccessStatus: 200,
      })
    );
    this.app.use(compression());
    this.app.use(urlencoded({extended: false, limit: 5242880}));
    this.app.use(json({limit: 5242880}));
    // this.app.use(morgan('dev'));

    this.app.use('/api', auth.verifyToken);
  }

  private routes() {
    this.app.use('/users', usersCtrl);
    this.app.use('/auth', limiter);
    this.app.use('/auth', authCtrl);
    this.app.use('/api/projects', projectsCtrl);
    this.app.use('/api/tasks', taskCtrl);
  }

  private extra() {
    this.app.use(errorCtrl);
  }

  public async listen() {
    const server = await this.app.listen(this.app.get('port'), '0.0.0.0');
    console.log(`server is running on port ${this.app.get('port')}`);
    return server;
  }
}

export default App;

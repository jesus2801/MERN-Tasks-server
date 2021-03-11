import compression from 'compression';
import express, {urlencoded, Application, json} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import usersCtrl from '../routes/users.routes';
import authCtrl from '../routes/auth.routes';
import taskCtrl from '../routes/tasks.routes';
import projectsCtrl from '../routes/projects.routes';
import connectDB from './database.config';
import auth from '../middlewares/auth.middleware';

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
    this.app.set('port', process.env.PORT || this.port || 3000);
    if (process.env.STATE! != 'dev') {
      this.app.set('trust proxy', true);
    }
  }

  private middlewares() {
    // this.app.use(
    //     helmet.contentSecurityPolicy({
    //       directives: {
    //         'default-src': ["'self'", 'https://fonts.googleapis.com'],
    //         'base-uri': ["'self'"],
    //         'block-all-mixed-content': [],
    //         'font-src': ["'self'", 'https://fonts.gstatic.com'],
    //         'img-src': ["'self'"],
    //         'object-src': ["'self'"],
    //         'script-src': [
    //           "'self'",
    //           'https://cdn.jsdelivr.net',
    //           'https://cdnjs.cloudflare.com',
    //         ],
    //         // 'script-src-attr': ["'none'"],
    //         'style-src': ["'self'", 'https:', "'unsafe-inline'"],
    //         'upgrade-insecure-requests': [],
    //       },
    //     })
    //   );
    //   this.app.use(helmet.dnsPrefetchControl());
    //   this.app.use(helmet.expectCt());
    //   this.app.use(helmet.frameguard());
    //   this.app.use(helmet.hidePoweredBy());
    //   this.app.use(helmet.hsts());
    //   this.app.use(helmet.ieNoOpen());
    //   this.app.use(helmet.noSniff());
    //   this.app.use(helmet.permittedCrossDomainPolicies());
    //   this.app.use(helmet.referrerPolicy());
    //   this.app.use(helmet.xssFilter());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: process.env.REACT_ORIGIN!,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        optionsSuccessStatus: 200,
      })
    );
    this.app.use(compression());
    this.app.use(urlencoded({extended: false, limit: 5242880}));
    this.app.use(json({limit: 5242880}));
    this.app.use(morgan('dev'));

    this.app.use('/api', auth.verifyToken);
  }

  private routes() {
    this.app.use('/users', usersCtrl);
    this.app.use('/auth', authCtrl);
    this.app.use('/api/projects', projectsCtrl);
    this.app.use('/api/tasks', taskCtrl);
  }

  private extra() {
    //error controller
  }

  public async listen() {
    const server = await this.app.listen(this.app.get('port'));
    console.log(`server is running on port ${this.app.get('port')}`);
    return server;
  }
}

export default App;

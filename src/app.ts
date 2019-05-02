
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as cors from 'cors';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import { Database } from './database';
import { tokenMiddleware } from './middlewares/token';
import { authMiddleware } from './middlewares/auth';
import { notFoundMiddleware } from './middlewares/not-found';
import { internalErrorMiddleware } from './middlewares/internal-error';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { insuranceRouter } from './routes/insurance';
import { testRouter } from './routes/test';



// MUST be first instruction
// load .env file
//dotenv.config({path: ".env.prod" });
dotenv.config();

// Create database object
const database = new Database(
   process.env.DB_URI,
   process.env.DB_USER,
   process.env.DB_PASS,
);

database
   .connect()
   .then(() => {
      // Constants
      const PORT = +process.env.PORT;
      const HOST = process.env.HOST;

      // Create App
      const app = express();

      // middlewares
      // use Helmet to help secure Express apps with various HTTP headers
      app.use(helmet())
         //.use(express.json())
         // use morgan to log requests to the console
         .use(morgan('dev'))
         // use HPP to protect against HTTP Parameter Pollution attacks
         .use(hpp())
         // enable gzip compression
         .use(compress())
         // cross domain origin
         .use(cors({ optionsSuccessStatus: 200 }))
         // limiting the length of request body (imgur limited: 20mb)
         .use(bodyParser.json({ limit: '20mb' }))
         .use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
         // parse cookies
         .use(cookieParser())
         // add token
         .use(tokenMiddleware);

      // routes
      app.get('/', (req, res) => res.json({ message: 'Please use /api/' }))
         .use('/api/test', testRouter)
         .use('/api/auth', authRouter)
         .use('/api/insurances', insuranceRouter)
         .use(authMiddleware)
         .use('/api/users', userRouter)


      // add error handlers
      app.use(internalErrorMiddleware)
         .use(notFoundMiddleware);

      // start server
      console.log(`Connection to ${HOST}:${PORT}...`);
      const server = app.listen(PORT, HOST);

      // manage error
      server.on('error', (err: any) => {
         switch (err.code) {
            case 'EACCES':
               console.error(`${HOST}:${PORT} requires elevated privileges`);
               break;
            case 'EADDRINUSE':
               console.error(`${HOST}:${PORT} is already in use`);
               break;
            default:
               console.error('Error connecting ' + err);
               break;
         }
         // gracefully stop database connection
         database.disconnect()
            .then(() => console.log('Database connection closed'))
            .catch(err => console.error('Database disconnection error ' + err))
            .then(() => {
               console.error('Exiting with code 1');
               process.exit(1);
            });
      });

      const closeServers = (sig: string) => {
         console.log(`Closing servers (${sig}) ...`);
         // close both express server and db connnection without care
         server.close(_ => console.log('Express server closed'));
         database.disconnect()
            .then(_ => console.log('Database connection closed'))
            .catch(err => console.log('Database disconnection error ' + err));
      };

      // gracefully stop the server in case of SIGINT (Ctrl + C) or SIGTERM (Process stopped)
      process.on('SIGTERM', () => closeServers('SIGTERM'));
      process.on('SIGINT', () => closeServers('SIGINT'));
      process.on('uncaughtException', () => closeServers('uncaughtException'));

   })
   .catch(err => {
      console.error('An error occurs while running express:');
      console.error(err);
      console.error('Exiting with code 1');
      process.exit(1);
   });
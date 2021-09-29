import express, { Request, Response, NextFunction } from 'express';


import  i18next  from 'i18next'
import  middleware    from 'i18next-express-middleware'
import  FsBackend  from 'i18next-fs-backend';

import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import createHttpError, { HttpError } from 'http-errors';
import { urlencoded, json } from 'body-parser';

import routers from './routers';
import {Logger} from './lib/logger/index';
import { clientHandler, deviceHandler } from './handlers';

const app = express();

const logger = new Logger();



///  hqandle  with     multi  language  /
// i18next.use(middleware.LanguageDetector).init({
//   preload: ['en', 'ar',],
//  defaultNS:"en",
//  load:'languageOnly',
//  saveMissing: true,
//  debug: true,
//  backend: {
//   loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
  
// },
// nsSeparator: '#||#',
// keySeparator: '#|#'
// })



app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());
app.use(compression());
app.use(helmet());

app.use(logger.getRequestLogger());




app.get('/health', (req, res) => res.json({ status: true, message: 'Health OK!' }));


app.use(routers);

/**
 * Handles 404 requests
 */

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = createHttpError(404, 'Page not found');

  next(error);
});

/**
 * Default error handler
 */
app.use(
  (error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error'
      }
    });
  }
);




// app.use('/locales', express.static('locales'));


/***
 * 
 * cheack  if  the  server  is  working  fine  or  not  
 * 
 */

app.use(logger.getRequestErrorLogger());

  
const server = new http.Server(app);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  // logger.info(`Express application is running on port ${port}.`);
});

const io = new socketIO.Server(server, { transports: ['websocket'] });
const deviceNamespace = io.of('');
const clientNamespace = io.of('/client');

deviceHandler(deviceNamespace, io);
clientHandler(clientNamespace, io);

import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { Roles } from '../index';

declare module 'express-serve-static-core' {
  interface Request {
    user: any;
    headers: IncomingHttpHeaders & {
      token: string;
    };
  }
}

import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import logger from '../logger';
import firebase from '../db/firebase';

/**
 * @function authenticationMiddleware
 * @param req
 * @param res
 * @param next
 * @returns
 */
const authenticationMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { token, authorization } = req.headers;
    let tokenToUse: any;

    // Use either the token header or the authorization header to look for the
    // Bearer token - the team originally used token in the web/mobile apps, but the proper place is authorization
    // and that is what swagger uses, so support both.
    if (!token) {
      if(!authorization) {
        logger.error('No token provided');

        const error = createError(401, 'No token provided');

        next(error);
      }
      else {
        tokenToUse = authorization;
      }
    }
    else {
      tokenToUse = token;
    }

    if (tokenToUse && tokenToUse.split(' ')[0] !== 'Bearer') {
      logger.error('Invalid token');

      const error = createError(401, 'Invalid token');

      next(error);
    }

    const idToken = token?.split(' ')[1] as string;
    
    // Comment this out for our local firebase emulator development.
    // https://github.com/firebase/firebase-tools/issues/2764
    //await firebase.auth().verifyIdToken(idToken);

    next();
  } catch (err) {
    logger.error(err);

    const error = createError(401, 'Could not authenticate');

    next(error);
  }
};

export default authenticationMiddleware;

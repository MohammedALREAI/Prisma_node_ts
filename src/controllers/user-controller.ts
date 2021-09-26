import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/user-service';
import _ from 'lodash';
import logger from '../logger';

/**
 * @function getUser
 * @description
 * @param req
 * @param res
 * @param next
 */
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await UserService.getUser(id);

    res.send(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @function getUserFleet
 * @description
 * @param req
 * @param res
 * @param next
 */
export const getUserFleet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req.params;
    const fleet = await UserService.getBoatsByUserUID(uid);
    res.send(fleet);
  } catch (err) {
    next(err);
  }
};

interface UpdateUserNameBody {
  name: string;
}

/**
 * @function updateUserName
 * @description
 * @param req
 * @param res
 * @param next
 */
export const updateUserName = async (
  req: Request<{}, {}, UpdateUserNameBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const { name } = req.body;

    const user = await UserService.updateUserName(id, name);

    res.send(user);
  } catch (err) {
    next(err);
  }
};

interface UpdateUserEmailBody {
  email: string;
}

/**
 * @function updateUserEmail
 * @description
 * @param req
 * @param res
 * @param next
 */
export const updateUserEmail = async (
  req: Request<{}, {}, UpdateUserEmailBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const { email } = req.body;

    const user = await UserService.updateUserName(id, email);

    res.send(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @function verifyUserToken
 * @description
 * @param req
 * @param res
 * @param next
 */
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;
    const user = await UserService.verifyUser(token);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @function createFirebaseUser
 * @description
 * @param req
 * @param res
 * @param next
 */
export const createFirebaseUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    const user = await UserService.createFirebaseUser(userData);
    res.send(user);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

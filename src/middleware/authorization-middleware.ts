import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma';
import createError from 'http-errors';
import logger from '../logger';

const authorizationMiddleware = () => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const { id } = req.user;

    console.log(id);

    const roles = await prisma.userRole.findMany({ where: { userId: id } });

    if (roles.length === 0) {
      const error = createError('401', 'Authorization failed');

      return next(error);
    }

    console.log(roles);

    next();
  };
};

export default authorizationMiddleware;

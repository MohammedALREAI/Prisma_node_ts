import { Request, Response, NextFunction } from 'express';
import * as DealershipService from '../services/dealership-service';

/**
 * @function addBoatGuest
 * @param req
 * @param res
 * @param next
 */
export const getAllDealerships = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dealerships = await DealershipService.getAllDealerships();
    res.send(dealerships);
  } catch (err) {
    next(err);
  }
};

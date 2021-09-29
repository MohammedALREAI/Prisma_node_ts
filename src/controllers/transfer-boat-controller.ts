import { Request, Response, NextFunction } from 'express';
import TransferBoatService from '../services/transfer-boat-service';


export  default class  TransferBoatFromController{
  


/**
 * @function transferBoat
 * @param req
 * @param res
 * @param next
 */
static transferBoatFromApp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { hin } = req.params;
    const { email, dealershipName } = req.body;

    const resMessage = await TransferBoatService.transferBoatFromApp(
      hin,
      email,
      dealershipName
    );
    res.send(resMessage);
  } catch (err) {
    next(err);
  }
};

/**
 * @function transferBoat
 * @param req
 * @param res
 * @param next
 */
static transferBoatFromDealersCircle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { hin } = req.params;
  const componentData = req.body;
  try {
    const resMessage = await TransferBoatService.transferBoatFromDealersCircle(
      hin,
      componentData
    );
    res.send(resMessage);
  } catch (err) {
    next(err);
  }
}
}
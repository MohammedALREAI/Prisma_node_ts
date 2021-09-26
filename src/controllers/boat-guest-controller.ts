import { Request, Response, NextFunction } from 'express';
import  BoatGuestService from '../services/boat-guest-service';



export default  class BoatGuestController{


/**
 * @function addBoatGuest
 * @param req
 * @param res
 * @param next
 */
static addBoatGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const boatId = Number(req.params.id);
    const newGuestEmail = req.params.email;
    const boat = await BoatGuestService.addBoatGuest(boatId, newGuestEmail);
    res.send(boat);
  } catch (err) {
    next(err);
  }
};

/**
 * @function removeBoatGuest
 * @param req
 * @param res
 * @param next
 */
static removeBoatGuest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const boatId = Number(req.params.id);
    const userId = Number(req.params.userid);
    const boat = await BoatGuestService.removeBoatGuest(boatId, userId);
    res.send(boat);
  } catch (err) {
    next(err);
  }
};
}
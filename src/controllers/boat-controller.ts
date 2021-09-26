import { Request, Response, NextFunction } from 'express';
import  BoatService from '../services/boat-service';
import  BoatValidation from  '../middleware/express-validator/Boat/index'
/**
 * @function getAllBoats
 * @param req
 * @param res
 * @param next
 */



type TRoute={
  req: Request,
  res: Response,
  next: NextFunction
}

export  default  class  BootController{
 
static getAllBoats = async({req,res,next}:TRoute) => {
  try {
    const  data=  await  BoatService.getAllBoats()
    res.send(data);

  } catch (err) {
    next(err);
  }
};

/**
 * @function getBoat
 * @param req
 * @param res
 * @param next
 */
static  getBoat = async({req,res,next}:TRoute) => {
  try {
    const  data=await BoatService.getBoat(req.body.boatId)

  } catch (err) {
    next(err);
  }
};

/**
 * @function updateBoatName
 * @param req
 * @param res
 * @param next
 */
static updateBoatName = async({req,res,next}:TRoute) => {
  try {
    const boatId = Number(req.params.id);
    const { name } = req.params;
    const boat = await BoatService.updateBoatName(boatId, name);
    res.send(boat);
  } catch (err) {
    next(err);
  }
};

/**
 * @function createBoat
 * @param req
 * @param res
 * @param next
 */
static createBoat = async({req,res,next}:TRoute) => {
  try {
    const boat = await BoatService.createBoat(req.body);

    res.send(boat);
  } catch (err) {
    next(err);
  }
}
}
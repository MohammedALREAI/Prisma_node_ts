import { NextFunction,Request,Response} from 'express'
import { body, validationResult,param,  query } from 'express-validator'
const checkForErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = simpleValidationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped())
    }
    next()
  }
  

export const  getDevices= [
  query('provisioned').toBoolean()
    .withMessage('boatId must not be empty')
    .withMessage('Must be a valid boatId address number'),
  query('sim').isString()
    .withMessage('boatId must not be empty')
    .withMessage('Must be a valid boatId address number'),
  query('serial').isString()
    .withMessage('serial must not be empty')
    .withMessage('Must be a valid boatId serial '),
    
    
    checkForErrors]

const simpleValidationResult = validationResult.withDefaults({
  formatter: (err) => err.msg,
})




export const  updateBoatName= [
    param('name').notEmpty().exists().isString()
      .isLength({ min: 1 })
      .withMessage('name must not be empty')
      .withMessage('Must be a valid boatId address number'),
      
    param('id').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      .withMessage('id must not be empty')
      .withMessage('Must be a valid id  number'),
      
      
      checkForErrors]

export const  addBoatGuest= [
    param('email').notEmpty().exists().isString().isEmail()
      .isLength({ min: 1 })
      .withMessage('name must not be empty')
      .withMessage('Must be a valid boatId address number'),
      
    param('id').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      .withMessage('id must not be empty')
      .withMessage('Must be a valid id  number'),
      
      
      checkForErrors]

export const  removeBoatGuest= [
 
      
    param('id').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      .withMessage('id must not be empty')
      .withMessage('Must be a valid id  number'),

    param('userid').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      .withMessage('userid must not be empty')
      .withMessage('Must be a valid userid  number'),
      
      
      checkForErrors]


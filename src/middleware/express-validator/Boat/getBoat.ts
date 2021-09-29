import { NextFunction,Request,Response} from 'express'
import { body, validationResult,param } from 'express-validator'
import { checkForErrors } from '../helperValidation'

  
export const  getBoatById= [
  body('boatId').isNumeric()
    .isLength({ min: 1 })
    .withMessage('Must be a valid boatId address number'),checkForErrors]




export const  updateBoatName= [
    param('name').notEmpty().exists().isString()
      .isLength({ min: 1 })
      .withMessage('name must not be empty'),

    param('id').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      .withMessage('id must not be empty'),      
      
      checkForErrors]

export const  addBoatGuest= [
    param('email').notEmpty().exists().isString().isEmail().trim().escape()
      .isLength({ min: 1 })
      .withMessage('name must not be empty'),
      
    param('id').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      .withMessage('id must not be empty'),
      
      
      checkForErrors]

export const  removeBoatGuest= [
 
      
    param('id').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      .withMessage('id must not be empty'),
    param('userid').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      .withMessage('userid must not be empty'),      
      
      checkForErrors]


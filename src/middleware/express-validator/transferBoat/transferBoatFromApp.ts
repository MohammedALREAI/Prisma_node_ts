import { NextFunction,Request,Response} from 'express'
import { body, validationResult,param,  query } from 'express-validator'
import { checkForErrors } from '../helperValidation'

export const  transferBoatFromApp= [
  param('hin').isBoolean(),
      body('email').isEmail().trim()
    // .withMessage('Must be a valid boatId address number'),
    ,
    body('dealershipName').isString(),
    // .withMessage('Must be a valid dealershipName '),
    checkForErrors
    
    ]


export const  transferBoatFromDealersCircle= [
  param('hin').toBoolean()
    .withMessage('boatId must not be empty')
    .withMessage('Must be a valid boatId address number'),
    body('componentData').notEmpty().exists().isObject().isEmail().trim().escape()
    .withMessage('eamil must not be empty')
    .withMessage('Must be a valid boatId address number'),


    checkForErrors]










    
import { NextFunction,Request,Response} from 'express'
import { body, validationResult,param,  query } from 'express-validator'
import { checkForErrors } from '../helperValidation'

export const  getUser= [
  param('id').isNumeric().notEmpty()
    .withMessage('id must not be empty')
    .withMessage('Must be a valid boatId address number'),
    checkForErrors]
export const  getUserFleet= [
  param('uid').isString().notEmpty()
    .withMessage('id must not be empty')
    .withMessage('Must be a valid boatId address number'),
    checkForErrors]
export const  updateUserName= [
  body('name').isString()
    .withMessage('boatId must not be empty')
    .withMessage('Must be a valid boatId address number'),
    body('componentData').notEmpty().exists().isObject().isEmail().trim().escape()
    .withMessage('eamil must not be empty')
    .withMessage('Must be a valid boatId address number'),

    checkForErrors]
export const  updateUserEmail= [
  body('email').isString().isEmail().trim()
    .withMessage('boatId must not be empty')
    .withMessage('Must be a valid boatId address number'),
    checkForErrors]

export const  verifyUser= [
  body('token').isString().notEmpty()
    .withMessage('boatId must not be empty')
    .withMessage('Must be a valid boatId address number'),
  
    checkForErrors];

export const  createFirebaseUser= 
  [
    body('email').isEmail(),
    body('name', 'Name is required')
      .not()
      .isEmpty(),
    body('password', 'Password is required')
      .not()
      .isEmpty(),
    body('uid', 'UID is required')
      .not()
      .isEmpty(),
    checkForErrors]
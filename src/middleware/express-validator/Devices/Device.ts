import { NextFunction,Request,Response} from 'express'
import { body,param,  query } from 'express-validator'
import { checkForErrors } from '../helperValidation'





export const  getDevices= [
  query('provisioned').toBoolean().optional()
    .withMessage('boatId must not be empty')
    .withMessage('Must be a valid boatId address number')
    ,
  query('sim').isString().optional()
    .withMessage('boatId must not be empty')
    // .withMessage('Must be a valid boatId address number')
    ,
  query('serial').isString().optional()
    .withMessage('serial must not be empty')
    .withMessage('Must be a valid boatId serial ')
    ,    
    checkForErrors]

    export const  getDeviceById= [
      param('id').isNumeric().notEmpty()
        .withMessage('id must not be empty')
        .withMessage('Must be a valid boatId address number'),
        checkForErrors]

export const  deleteDevice= [
  param('id').isString()
    .withMessage('boatId must not be empty')
    // .withMessage('Must be a valid boatId address number'),
    ,

    
    checkForErrors]
export const  createDevice= [
      body('serial').isString()
      // .withMessage('boatId must not be empty')
      .withMessage('Must be a valid boatId address number'),
    body('sim').isString()
      // .withMessage('serial must not be empty')
      .withMessage('Must be a valid boatId serial '),
    body('region').isString()
      // .withMessage('serial must not be empty')
      .withMessage('Must be a valid boatId serial '),
    
    checkForErrors]

export const  updateDeviceBoat= [
      body('id').isString()
      // .withMessage('boatId must not be empty')
      .withMessage('Must be a valid boatId address number'),
    body('hin').isString()
      // .withMessage('serial must not be empty')
      .withMessage('Must be a valid boatId serial '),
    
    checkForErrors]

export const  updateDeviceSim= [
      body('id').isString()
      // .withMessage('boatId must not be empty')
      .withMessage('Must be a valid boatId address number'),
    body('sim').isString()
      // .withMessage('serial must not be empty')
      .withMessage('Must be a valid boatId serial '),
    
    checkForErrors]







export const  updateBoatName= [
    param('name').notEmpty().exists().isString()
      .isLength({ min: 1 })
      // .withMessage('name must not be empty')
      .withMessage('Must be a valid boatId address number'),
      
    param('id').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      // .withMessage('id must not be empty')
      .withMessage('Must be a valid id  number'),
      
      
      checkForErrors]

export const  addBoatGuest= [
    param('email').notEmpty().exists().isString().isEmail()
      .isLength({ min: 1 })
      // .withMessage('name must not be empty')
      .withMessage('Must be a valid boatId address number'),
      
    param('id').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      // .withMessage('id must not be empty')
      .withMessage('Must be a valid id  number'),
      
      
      checkForErrors]

export const  removeBoatGuest= [
 
      
    param('id').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      // .withMessage('id must not be empty')
      .withMessage('Must be a valid id  number'),

    param('userid').notEmpty().exists().isNumeric()
      .isLength({ min: 1 })
      // .withMessage('userid must not be empty')
      .withMessage('Must be a valid userid  number'),
      
      
      checkForErrors]


  
      
      export const  getTelemetry= [
 
      
        param('id').notEmpty().exists().isNumeric()
          .isLength({ min: 1 })
          // .withMessage('id must not be empty')
          .withMessage('Must be a valid id  number'),
          checkForErrors]    







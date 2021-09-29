import { checkForErrors } from './../middleware/express-validator/helperValidation';
import {Router} from 'express';
import { authenticationMiddleware as authenticate } from '../middleware';


import  DeviceController from '../controllers/device-controller';
import { body, param } from 'express-validator';

const router = Router();


export const  getDeviceById= [
    param('id').isNumeric().notEmpty()
      .withMessage('id must not be empty')
      .withMessage('Must be a valid boatId address number'),
      checkForErrors]

       const  updateDeviceSim= [
        body('id').isString()
        // .withMessage('boatId must not be empty')
        .withMessage('Must be a valid boatId address number'),
      body('sim').isString()
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

router.get('/:id',authenticate,getDeviceById,DeviceController.getDevice);
router.get('/',authenticate,DeviceController.getDevices);
router.post('/:id/sim',authenticate,updateDeviceSim, DeviceController.updateDeviceSim);

router.post('/:id/boat',updateDeviceBoat,DeviceController.updateDeviceBoat);

const  createDevice= [
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

router.post('/create-device',authenticate,createDevice ,DeviceController.createDevice);


export const  deleteDevice= [
    param('id').isString()
      .withMessage('boatId must not be empty')
      .withMessage('Must be a valid boatId address number'),
      checkForErrors]


router.delete('/:id',authenticate,deleteDevice, DeviceController.deleteDevice);

export default router;

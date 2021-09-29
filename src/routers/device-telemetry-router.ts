import express from 'express';
import { checkForErrors } from '../middleware/express-validator/helperValidation';
import * as DeviceTelemetryController from '../controllers/device-telemetry-controller';
import { authenticationMiddleware as authenticate } from '../middleware';
import { param } from 'express-validator';

const router = express.Router();
  
export const  getTelemetry= [
 
      
  param('id').notEmpty().isNumeric()
    .isLength({ min: 1 })
    .withMessage('id must not be empty')
    .withMessage('Must be a valid id  number'),
    checkForErrors]    

router.get(
  '/get-telemetry/:id',
  authenticate,
  getTelemetry,
  DeviceTelemetryController.getTelemetry
);

export default router;

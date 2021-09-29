import { checkForErrors } from './../middleware/express-validator/helperValidation';
import { Router } from 'express';
import { body, param } from 'express-validator';
import  TransferBoatFromController from '../controllers/transfer-boat-controller';
import { authenticationMiddleware as authenticate } from '../middleware';

 const  transferBoatFromApp= [
  param('hin').isBoolean(),
      body('email').isEmail().trim()
    // .withMessage('Must be a valid boatId address number'),
    ,
    body('dealershipName').isString(),
    // .withMessage('Must be a valid dealershipName '),
    checkForErrors
    
    ]






    export const  transferBoatFromDealersCircle= [
      param('hin').isBoolean()
        .withMessage('boatId must not be empty')
        .withMessage('Must be a valid boatId address number'),
        body('componentData').notEmpty().exists().isObject().isEmail().trim().escape()
        .withMessage('eamil must not be empty')
        .withMessage('Must be a valid boatId address number'),
    
    
        checkForErrors]


    

const router = Router ();





    /**  post  test   */

router.post(
  '/:hin/transfer-boat-from-app',
  authenticate,
  transferBoatFromApp,
  TransferBoatFromController.transferBoatFromApp
);



/***  ROUTER  FIR  BOAT  
 *MUST  BE  AUTH  AND  CHEACK  VALIDATION  ERROR  
 *  
 * 
 */

router.post(
  '/boat/:hin/transfer-boat-from-dealers-circle',
  authenticate,
  transferBoatFromDealersCircle,
  TransferBoatFromController.transferBoatFromDealersCircle
);

export default router;








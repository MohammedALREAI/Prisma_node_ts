import { Router, NextFunction,Request,Response } from 'express';
import { sendTechEmailValidation } from '../middleware/express-validator/Email';
import * as EmailController from '../controllers/email-controller';
// import { body } from 'express-validator';
// import { checkForErrors } from '../middleware/express-validator/Devices/Device';

const router = Router();


//do not need to authenticate this one

//  to  run  this  route   this  route  
// @/email/send-tech-email
router.post(
  '/send-tech-email',sendTechEmailValidation,EmailController.sendTechEmail
);








export default router;

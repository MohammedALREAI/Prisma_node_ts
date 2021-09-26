import express from 'express';
import * as EmailController from '../controllers/email-controller';
import { body } from 'express-validator';

const router = express.Router();

//do not need to authenticate this one
router.post(
  '/send-tech-email',
  [
    body('fullName', 'Full name is required')
      .not()
      .isEmpty(),
    body('email', 'Email is required')
      .not()
      .isEmpty(),
    body('subject', 'Subject is required')
      .not()
      .isEmpty(),
    body('message', 'Message is required')
      .not()
      .isEmpty()
  ],
  EmailController.sendTechEmail
);

export default router;

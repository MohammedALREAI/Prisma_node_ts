import { body, validationResult,param,  query } from 'express-validator'
import { checkForErrors } from '../helperValidation'






export const sendTechEmailValidation = [
  body('email')
    .isLength({ min: 1 })
    .withMessage('Email must not be empty')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('fullName').isLength({ min: 4 }).withMessage('fullName must not be empty'),
  body('subject').isLength({ min: 5 }).withMessage('subject must not be empty'),
  body('message').isLength({ min: 5 }).withMessage('message must not be empty'),
  
    checkForErrors
]





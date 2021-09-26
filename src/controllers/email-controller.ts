import { Request, Response, NextFunction } from 'express';
import * as EmailService from '../services/email-service';

/**
 * @function sendTechEmail
 * @param req
 * @param res
 * @param next
 */
export const sendTechEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fullName, email, subject, message } = req.body;
  try {
    await EmailService.sendTechEmail(fullName, email, subject, message);
    res.send('Tech support email was sent');
  } catch (err) {
    next(err);
  }
};

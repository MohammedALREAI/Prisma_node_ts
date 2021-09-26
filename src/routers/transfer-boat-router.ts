import express from 'express';
import * as TransferBoatController from '../controllers/transfer-boat-controller';
import { authenticationMiddleware as authenticate } from '../middleware';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/:hin/transfer-boat-from-app',
  [
    body('email').isEmail(),
    body('dealershipName', 'Dealership name is required')
      .not()
      .isEmpty()
  ],
  authenticate,
  TransferBoatController.transferBoatFromApp
);

router.post(
  '/boat/:hin/transfer-boat-from-dealers-circle',
  [body('email').isEmail()],
  authenticate,
  TransferBoatController.transferBoatFromDealersCircle
);

export default router;

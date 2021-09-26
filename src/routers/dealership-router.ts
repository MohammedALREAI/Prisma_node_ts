import express from 'express';
import * as DealershipController from '../controllers/dealership-controller';
import { authenticationMiddleware as authenticate } from '../middleware';

const router = express.Router();

router.get(
  '/get-all-dealerships',
  authenticate,
  DealershipController.getAllDealerships
);

export default router;

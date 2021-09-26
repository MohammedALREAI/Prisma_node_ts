import express from 'express';
import * as BoatGuestController from '../controllers/boat-guest-controller';
import { authenticationMiddleware as authenticate } from '../middleware';

const router = express.Router();

router.post(
  '/:id/:email/add-boat-guest',
  authenticate,
  BoatGuestController.addBoatGuest
);

router.post(
  '/:id/:userid/remove-boat-guest',
  authenticate,
  BoatGuestController.removeBoatGuest
);

export default router;

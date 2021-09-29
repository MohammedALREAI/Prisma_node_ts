import {Router} from 'express';
import { addBoatGuest, removeBoatGuest } from '../middleware/express-validator/Boat/getBoat';
import  BoatGuestController from '../controllers/boat-guest-controller';
import { authenticationMiddleware as authenticate } from '../middleware';

const router = Router();



router.post(
  '/:id/:email/add-boat-guest',
  authenticate,
  addBoatGuest,
  BoatGuestController.addBoatGuest
);

router.post(
  '/:id/:userid/remove-boat-guest',
  authenticate,
  removeBoatGuest,
  BoatGuestController.removeBoatGuest
);

export default router;

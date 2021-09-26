import express from 'express';
import * as BoatController from '../controllers/boat-controller';
import { authenticationMiddleware as authenticate } from '../middleware';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', BoatController.getAllBoats);

router.get('/:id', BoatController.getBoat);

router.post('/', BoatController.createBoat);

router.patch(
  '/:id/:name/update-name',
  authenticate,
  BoatController.updateBoatName
);

export default router;

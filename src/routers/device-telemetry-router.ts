import express from 'express';
import * as DeviceTelemetryController from '../controllers/device-telemetry-controller';
import { authenticationMiddleware as authenticate } from '../middleware';
import { body } from 'express-validator';

const router = express.Router();

router.get(
  '/get-telemetry/:id',
  authenticate,
  DeviceTelemetryController.getTelemetry
);

export default router;

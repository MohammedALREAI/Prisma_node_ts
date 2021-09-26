import { Request, Response, NextFunction } from 'express';
import * as DeviceTelemetryService from '../services/device-telemetry-service';
import _ from 'lodash';
import logger from '../logger';

/**
 * @function getTelemetry
 * @description
 * @param req
 * @param res
 * @param next
 */
export const getTelemetry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const deviceTelemetry = await DeviceTelemetryService.getDeviceTelemetry(id);
    res.send(deviceTelemetry);
  } catch (err) {
    next(err);
  }
};

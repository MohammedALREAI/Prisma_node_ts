import { Request, Response, NextFunction } from 'express';

import {
  CreateDeviceReqBody,
  DeleteDeviceReqBody,
  UpdateDeviceBoatReqBody,
  UpdateDeviceSimReqBody
} from '../@types';
import  DeviceService from '../services/device-service';

interface GetDevicesRequestQuery {
  provisioned?: boolean;
  sim?: string;
  serial?: string;
}

export  default class  DeviceController{

static getDevice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const device = await DeviceService.getDevice(id);

    res.send(device);
  } catch (err) {
    next(err);
  }
};


static getDevices = async (
  req: Request<{}, {}, {}, GetDevicesRequestQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { provisioned, sim, serial } = req.query;

    if (provisioned) {
      const provisionedDeviceList = await DeviceService.getAllProvisionedDevices();

      return res.send(provisionedDeviceList);
    }

    if (sim) {
      const device = await DeviceService.getDeviceBySim(sim);

      return res.send(device);
    }

    if (serial) {
      const device = await DeviceService.getDeviceBySerial(serial);

      return res.send(device);
    }

    const devices = await DeviceService.getAllDevices();

    res.send(devices);
  } catch (err) {
    next(err);
  }
};

static updateDeviceBoat = async (
  req: Request<{}, {}, UpdateDeviceBoatReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const device = await DeviceService.updateDeviceBoat(req.body);

    res.send(device);
  } catch (err) {
    next(err);
  }
};

static updateDeviceSim = async (
  req: Request<{}, {}, UpdateDeviceSimReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const device = await DeviceService.updateDeviceSim(req.body);

    res.send(device);
  } catch (err) {
    next(err);
  }
};

static createDevice = async (
  req: Request<{}, {}, CreateDeviceReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const device = await DeviceService.createDevice(req.body);

    res.send(device);
  } catch (err) {
    next(err);
  }
};

static deleteDevice = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    console.log(id);

    const device = await DeviceService.deleteDevice(id);

    console.log(device);

    res.send(device);
  } catch (err) {
    next(err);
  }
};

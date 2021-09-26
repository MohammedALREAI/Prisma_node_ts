import { Device, DeviceTelemetry, ProvisionedDevice } from '@prisma/client';
import createError from 'http-errors';
import P from 'pino';

import prisma from '../db/prisma';
import logger from '../logger';

/**
 * @class DeviceService
 */


export  default class DeviceService{
  
  /**
   *  @function getDevice 
   * @param deviceId 
   * @returns Device
   */

static getDevice = async (deviceId: string): Promise<(Device & {}) | null> => {
  try {
    const device = await prisma.device.findUnique({
      where: { id: Number(deviceId) }
    });

    if (!device) {
      throw createError(`Device ${deviceId} does not exist`);
    }

    return device;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};



/**
 * @function getDeviceBySerial
 * @param deviceSerial 
 * @returns 
 */
static getDeviceBySerial = async (deviceSerial: string) => {
  try {
    const device = await prisma.device.findUnique({
      where: { serial: deviceSerial }
    });

    if (!device) {
      throw createError(`Device serial ${deviceSerial} does not exist`);
    }

    return device;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};



/**
 * 
 * @param deviceSim 
 * 
 * @returns 
 */
static getDeviceBySim = async (deviceSim: string) => {
  try {
    const device = await prisma.device.findFirst({ where: { sim: deviceSim } });

    if (!device) {
      throw createError(`Device sim id ${deviceSim} does not exist`);
    }

    return device;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

/**
 * @function getAllDevice
 */
static getAllDevices = async (): Promise<Device[]> => {
  try {
    const devices = await prisma.device.findMany();
    if(!devices){
      throw createError(`there  is  no  data  like  does not exist`);
    }

    return devices;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

/**
 * @function getAllDevice
 */
static getAllProvisionedDevices = async () => {
  try {
    const devices = await prisma.device.findMany({
      select: {
        id: true,
        sim: true,
        serial: true,
        provisionedDevice: {
          select: {
            createdOn: true,
            boat: {
              select: {
                hin: true,
                id: true,
                dealership: {
                  select: {
                    dealerName: true,
                    code: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return devices;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

static updateDeviceBoat = async ({
  id,
  hin
}: {
  id: number;
  hin: string;
}) => {
  try {
    const boat = await prisma.boat.findFirst({
      where: { hin },
      include: {
        provisionedDevice: {}
      }
    });

    if (!boat) {
      throw createError('400', `Boat ${hin} does not exist`);
    }

    let device = await prisma.device.findUnique({
      where: { id },
      include: { provisionedDevice: {} }
    });

    if (!device) {
      throw createError('400', `Device ${id} does not exist`);
    }

    if (boat.provisionedDevice) {
      const deleteProvisionedDevice = prisma.provisionedDevice.delete({
        where: {
          boatId: boat.id
        }
      });

      if (!device.provisionedDevice) {
        const provisionedDevice = prisma.provisionedDevice.create({
          data: { boatId: boat.id, deviceId: device.id }
        });

        const [_, { id: provisionedDeviceId }] = await prisma.$transaction([
          deleteProvisionedDevice,
          provisionedDevice
        ]);

        return await prisma.provisionedDevice.findUnique({
          where: {
            id: provisionedDeviceId
          },
          select: {
            boat: {
              select: {
                hin: true
              }
            },
            device: {
              select: {
                serial: true
              }
            }
          }
        });
      }

      const provisionedDevice = prisma.provisionedDevice.update({
        where: { deviceId: id },
        data: { boatId: boat.id }
      });

      const [_, { id: provisionedDeviceId }] = await prisma.$transaction([
        deleteProvisionedDevice,
        provisionedDevice
      ]);

      return await prisma.provisionedDevice.findUnique({
        where: {
          id: provisionedDeviceId
        },
        select: {
          boat: {
            select: {
              hin: true
            }
          },
          device: {
            select: {
              serial: true
            }
          }
        }
      });
    }

    if (!device.provisionedDevice) {
      const provisionedDevice = await prisma.provisionedDevice.create({
        data: { boatId: boat.id, deviceId: device.id }
      });

      return await prisma.provisionedDevice.findUnique({
        where: {
          id: provisionedDevice.id
        },
        select: {
          boat: {
            select: {
              hin: true
            }
          },
          device: {
            select: {
              serial: true
            }
          }
        }
      });
    }

    const provisionedDevice = await prisma.provisionedDevice.update({
      where: { deviceId: id },
      data: { boatId: boat.id }
    });

    return await prisma.provisionedDevice.findUnique({
      where: {
        id: provisionedDevice.id
      },
      select: {
        boat: {
          select: {
            hin: true
          }
        },
        device: {
          select: {
            serial: true
          }
        }
      }
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

/**
 * @function updateDeviceBoat
 */
static updateDeviceSim = async ({
  id,
  sim
}: {
  id: number;
  sim: string;
}) => {
  try {
    let device = await prisma.device.findFirst({ where: { sim } });

    if (device) {
      await prisma.device.update({
        where: { id: device.id },
        data: { sim: null }
      });
    }

    device = await prisma.device.update({
      where: { id },
      data: { sim }
    });

    return device;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};


/**
 * 
 * @param serial
 * @param sim
 * @param region
 * @returns 
 */
static createDevice = async ({
  serial,
  sim,
  region
}: {
  serial: string;
  sim: string;
  region: string;
}) => {
  try {
    let device = await prisma.device.findFirst({
      where: {
        serial
      }
    });

    if (device) {
      throw createError(400, `Device serial ${serial} already exists`);
    }

    device = await prisma.device.findFirst({
      where: {
        sim
      }
    });

    if (device) {
      throw createError(400, `Sim id${sim} already exists`);
    }

    return await prisma.device.create({
      data: {
        serial,
        sim,
        region
      }
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }
};



/**
 * @function  deleteDevice
 * @param deviceId 
 * @returns 
 * 
 */
static deleteDevice = async (deviceId: string) => {
  try {
    const id = Number(deviceId);

    let device = await prisma.device.findUnique({
      where: { id },
      include: { provisionedDevice: { select: { id: true } } }
    });

    if (!device) {
      throw createError(400, `${deviceId} does not exist`);
    }

    let ignitionOnLogs = await prisma.ignitionOnLog.findMany({
      where: { deviceId: id },
      take: 1
    });

    console.log(ignitionOnLogs);

    let t1;
    let t2;

    if (device.provisionedDevice) {
      t1 = prisma.provisionedDevice.delete({ where: { deviceId: id } });
    }

    if (!ignitionOnLogs.length) {
      t2 = prisma.device.delete({ where: { id } });
    } else {
      t2 = prisma.device.update({
        where: { id },
        data: { sim: null, isDisabled: true }
      });
    }

    console.log(t1, t2);

    if (t1) {
      const [_, device] = await prisma.$transaction([t1, t2]);

      return device;
    }

    [device] = await prisma.$transaction([t2]);

    return device;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}
}

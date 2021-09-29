import createError from 'http-errors';
import prisma from '../db/prisma';
import logger from '../lib/logger';



/**
 * @function getDeviceTelemetry
 * @param deviceId 
 * @returns 
 */
export const getDeviceTelemetry = async deviceId => {
  try {
    return await prisma.deviceTelemetry.findUnique({
      where: {
        deviceId: deviceId
      }
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

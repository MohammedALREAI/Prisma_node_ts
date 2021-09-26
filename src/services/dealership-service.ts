import prisma from '../db/prisma';
import {} from '../@types';
import logger from '../logger';
import { Prisma } from '@prisma/client';

/**
 * @function getAllDealerships
 */

/***getAllDealerships */

export const getAllDealerships = async () => {
  try {
    const dealerships = await prisma.dealership.findMany();
    console.log(dealerships);
    return dealerships;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

    logger.error(err);}

    throw err;
  }
};

import {  Prisma } from '@prisma/client'
import createError from 'http-errors';
import logger from '../lib/logger';
import prisma from '../db/prisma';

/**
 * @class BootService
 */



export  default class BootService{

  /**
   *  @function  getBoat
   * @param boatId 
   * @returns 
   */
static getBoat = async (boatId:number) => {
  try {
    const  isFound= await prisma.boat.findUnique({
      where: {
        id: boatId
      }
    });
    if(!isFound){
      throw createError(400, `${boatId} already exists`);

    }
    return isFound;

  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

      logger.error(err);}
    throw err;
  }
};

static getAllBoats = async () => {
  try {
    const  boats= await prisma.boat.findMany();
    if(!boats ||boats.length<1){
      throw createError(400, `boat not  found exists`);

    }
    return boats;

  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

      logger.error(err);}
    throw err;
  }
};


/**
 * @function updateBoatName
 */
static updateBoatName = async (boatId:number, name:string) => {
  try {
    const updatedBoat = await prisma.$transaction(async (prisma) => {
      await prisma.boat.update({
        where: {
          id: boatId
        },
        data: {
          name: name
        }
      });
      console.log(`BoatId: ${boatId} updated to ${name}`);
      return prisma.boat.findUnique({
        where: {
          id: boatId
        },
        include: {
          boatOwner: true,
          provisionedDevice: {
            include: {
              device: {
                include: {
                  deviceTelemetry: true
                }
              }
            }
          }
        }
      });
    });
    return updatedBoat;
  } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
    logger.error(err);
    throw err;
  }
}
}





/**@function createBoat
 * 
 * 
 */

static createBoat = async (boatData: {
  hin:string,
  dealershipCode:string |number,
  gelDate:Date | string,
  model:string,
  modelYear:string,
  engineModel:string
}) => {
  const {
    hin,
    dealershipCode,
    gelDate,
    model,
    modelYear,
    engineModel
  } = boatData;

  try {
    const dealership = await prisma.dealership.findFirst({
      where: {
        code: Number(dealershipCode)
      }
    });

    if (!dealership) {
      throw createError(400, `Dealership ${dealershipCode} does not exist`);
    }

    // find  hit
    const boat = await this.getBoatByHin(hin)
    
    if (boat) {
      throw createError(400, `${hin} already exists`);
    }

    return await prisma.boat.create({
      data: {
        dealershipId: dealership.id,
        gelDate,
        model,
        modelYear,
        engineModel,
        hin
      }
    });
  } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {

    logger.error(err);}

    throw err;
  }
}




/** 
@getBoatByHin

*/


static getBoatByHin = async (hin:string) => {
  try {
    const boat = await prisma.boat.findFirst({
      where: { hin }
    });
    if(!boat){
      logger.error(` There is  no  item  like  that ${hin}`)
    }
    return boat;
  } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {

    logger.error(err);
    }
    throw err;
  }
}


/**
 * function  setBoatsNewDealerId
 * @param boat 
 * @param dealership 
 */

static setBoatsNewDealerId = async (boat:{id:number}, dealership:{id:number}) => {
  try {
     const  isFound=await prisma.boat.update({
      where: {
        id: boat.id
      },
      data: {
        dealershipId: dealership.id
      }
    });
    if(!isFound){
      logger.error(`there  is  no  item  like  that ${boat.id}not  found  `);


    }
    logger.info(`Boat ${isFound.hin} dealership ID updated to ${dealership.id}`);
  } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {

    logger.error(err);
    }

    throw err;
  }
}
}




export function setBoatsNewDealerId(boat: any, dealership: any, prisma: any) {
  throw new Error('Function not implemented.');
}

import prisma from '../db/prisma';
import logger from '../lib/logger';
import { Prisma } from '@prisma/client'











/**
 * @interface ICreateBoatOwner
 */
interface ICreateBoatOwner{
  owner:{
    id:string
  },
  boat:{
    id:string
  }

}





/**
 * @class  BootOwner
 */
export  default  class BootOwner{



  /**
   *  @function  deleteAndReturnPreviousBoatOwner
   * @param boat 
   * @returns 
   */
static deleteAndReturnPreviousBoatOwner = async (boat:{id:number}) => {
  try {
    const boatOwner = await prisma.boatOwner.findUnique({
      where: {
        boatId: boat.id
      }
    });

    if (boatOwner) {
      logger.info('boat has previous boat owner, deleting boatOwner');
      await prisma.boatOwner.delete({
        where: {
          boatId: boat.id
        }
      });
    }
    return boatOwner;
  } catch (err:any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error(err);
    
    }
    throw err;
  }
};

static checkIfPreviousBoatOwnerStillABoatOwner = async (ownerId:number) => {
  try {
    const boatOwner = await prisma.boatOwner.findFirst({
      where: {
        ownerId: ownerId
      }
    });
    return boatOwner;
  } catch (err:any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
    logger.error(err);
    throw err;
  }
  }
}







 
static createBoatOwner = async (owner:{id:number}, boat:{id:number,hin:string}) => {
  try {
    console.info(
      `creating boatOwner for owner ${owner.id} and boat ${boat.hin}`
    );
    await prisma.boatOwner.create({
      data: {
        ownerId: owner.id,
        boatId: boat.id
      }
    });
  } catch (err:any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

    logger.error(err);}
    throw err;
  }
}
}




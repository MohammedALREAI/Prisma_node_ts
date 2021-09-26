import  createError  from 'http-errors';
import prisma from '../db/prisma';
import {} from '../@types';
import logger from '../logger';




/**
 * @class OwnerService
 */


export default class  OwnerService{
static getOwner = async (ownerId) => {
  try {
    const owner = await prisma.owner.findFirst({
      where: {
        id: ownerId
      }
    });
    if(!owner){
      throw createError(400, `${ownerId} you  are  not  access  to  the  app `);
    }
    return owner;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

/**
 *  @function createOwner
 * @param user 
 * @returns 
 */

static createOwner = async (user) => {
  try {
    console.info(`creating owner for ${user.email}`);
    const owner = await prisma.owner.create({
      data: {
        userId: user.id
      }
    });

    if(!owner){
      throw createError(400, `${user.email} you  are  not  access  to  the  app `);
    }    return owner;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};


/**
 * @function deleteOwner
 * @param ownerId 
 */
static deleteOwner = async (ownerId) => {
  try {
    logger.info('previous owner is no longer a boat owner, deleting owner');
    console.log(ownerId);
    await prisma.owner.delete({
      where: {
        id: ownerId
      }
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }

}
}






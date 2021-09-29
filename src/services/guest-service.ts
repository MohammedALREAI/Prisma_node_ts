import prisma from '../db/prisma';
import {} from '../@types';
import logger from '../lib/logger';


export  class  GuestService{
  constructor(){

  }

  /**
   *  function getGuestByUserId
   * @param userId 
   * @returns 
   */
  
static getGuestByUserId = async (userId) => {
  try {
    const guest = await prisma.guest.findUnique({
      where: {
        userId: userId
      }
    });
    return guest;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};


/**function
 * createGuest
 * 
  */
static createGuest = async (user) => {
  try {
    console.info(`creating guest for ${user.email}`);
    const guest = await prisma.guest.create({
      data: {
        userId: user.id
      }
    });
    return guest;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

/**
 * @function deleteGuestAndReturnGuest
 * @param guestId 
 * @returns 
 */

static deleteGuestAndReturnGuest = async (guestId) => {
  try {
    logger.info('Existing boat guest is no longer a guest, deleting guest');
    const guest = await prisma.guest.findUnique({
      where: {
        id: guestId
      }
    });
    if (guest) {
      await prisma.guest.delete({
        where: {
          id: guestId
        }
      });
    }
    return guest;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}
}

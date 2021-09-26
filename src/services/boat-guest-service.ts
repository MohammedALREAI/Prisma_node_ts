import prisma from '../db/prisma';
import {} from '../@types';
import logger from '../logger';
import UserService from '../services/user-service';
import  UserRoleService from '../services/user-role-service';
import  {GuestService} from '../services/guest-service';
import * as UserTokenService from '../services/user-token-service';
import  EmailService from '../services/email-service';
import * as BoatService from '../services/boat-service';
import { Prisma } from '.prisma/client';

/**
 * class  Boot
 */



export  default class  BootGuest {



/**
 *  addBoatGuest
 * @param boatId 
 * @param newGuestEmail 
 * @returns 
 */

static addBoatGuest = async (boatId, newGuestEmail) => {
  try {
    const updatedBoatWithGuests = await prisma.$transaction(async (prisma) => {
      const userWhoIsBoatOwner = await UserService.getUserWhoIsBoatOwner(boatId);
      let userStatus = 'existingUser';
      let user = await prisma.user.findFirst({
        where: { email: newGuestEmail }
      });
      let token = '';
      if (!user) {
        userStatus = 'newUser';
        user = await UserService.createUser({ email: newGuestEmail });
        const userToken = await UserTokenService.createUserToken(user);
        token = userToken.token;
      }

      await UserRoleService.createUserRoleAsGuest(user);
      const guest = await GuestService.createGuest(user);
      await this.createBoatGuest(guest, boatId);

      const emailBodyData = {
        email: newGuestEmail,
        inviter: userWhoIsBoatOwner.email,
        code: token
      };
      await EmailService.sendGuestUserInviteEmail(userStatus, emailBodyData);

      return prisma.boat.findUnique({
        where: {
          id: boatId
        },
        include: {
          boatOwner: true,
          boatGuests: {
            include: {
              guest: {
                include: {
                  user: true
                }
              }
            }
          },
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
    return updatedBoatWithGuests;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

      logger.error(err);}
          throw err;
  }
}



/**
 *  @function removeBoatGuest
 * @param boatId 
 * @param userId 
 * @returns 
 */




static removeBoatGuest = async (boatId, userId) => {
  try {
    const updatedBoatWithGuestRemoved = await prisma.$transaction(
      async (prisma) => {
        const guest = await GuestService.getGuestByUserId(userId);
        await this.deleteBoatGuest(guest.id, boatId);
        const isGuestStillABoatGuest = await this.checkIfNotABoatGuestAnymore(
          guest.id);
        if (!isGuestStillABoatGuest) {
          await GuestService.deleteGuestAndReturnGuest(guest.id);
          await UserRoleService.deleteUserRoleAsGuest(guest);
          
        }

        return await prisma.boat.findUnique({
          where: {
            id: boatId
          },
          include: {
            boatOwner: true,
            boatGuests: {
              include: {
                guest: {
                  include: {
                    user: true
                  }
                }
              }
            },
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
      }
    );
    logger.info('Boat guest removed');
    return updatedBoatWithGuestRemoved;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

      logger.error(err);}
          throw err;
  }
}

/**
 *  function createBoatGuest
 * @param guest 
 * @param boatId 
 */
 static createBoatGuest = async (guest, boatId) => {
  try {
    console.info(
      `creating boatGuestfor guest ${guest.id} and boatId ${boatId}`
    );
    await prisma.boatGuest.create({
      data: {
        guestId: guest.id,
        boatId: boatId
      }
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

      logger.error(err);}
          throw err;
  }
}


/**
 *  function  deleteBoatGuest
 * @param guestId 
 * @param boatId 
 */
static deleteBoatGuest = async (guestId, boatId) => {
  try {
    const boatGuest = await prisma.boatGuest.findFirst({
      where: {
        guestId,
        boatId
      }
    });
    if (boatGuest) {
      await prisma.boatGuest.delete({
        where: {
          id: boatGuest.id
        }
      });
        logger.error(` there  is  no  item  like ${boatGuest} `)
      
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

      logger.error(err);}
          throw err;
  }
};

/**
 *  function  deleteBoatGuests
 * @param boat 
 */
static deleteBoatGuests = async (boat) => {
  try {
    const boatGuests = await  this.getAllBoatGuests(boat);
    await  this.deleteAllBoatGuestsForBoat(boat);
    for (let i = 0; i < boatGuests.length; i++) {
      //this checks if still a guest to another boat, if not delete guest row
      const isStillABoatGuest = await this.checkIfNotABoatGuestAnymore(
        boatGuests[i].guestId,
      );
      console.log(isStillABoatGuest);
      if (!isStillABoatGuest) {
        const guest = await GuestService.deleteGuestAndReturnGuest(boatGuests[i].guestId);
        await UserRoleService.deleteUserRoleAsGuest(guest);
      }
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

      logger.error(err);}
          throw err;
  }
};

/**
 * getAllBoatGuests
 * @param boat 
 * @returns 
 */

static getAllBoatGuests = async (boat) => {
  try {
    const boatGuests = await prisma.boatGuest.findMany({
      where: {
        boatId: boat.id
      }
    });
    return boatGuests;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

    logger.error(err);}
    throw err;
  }
};



/**
 * deleteAllBoatGuestsForBoat
 * @param boat 
 */
static deleteAllBoatGuestsForBoat = async (boat) => {
  try {
    logger.info('deleting boat guests');
    await prisma.boatGuest.deleteMany({
      where: {
        boatId: boat.id
      }
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

      logger.error(err);}
          throw err;
  }
};

/**
 *  @function checkIfNotABoatGuestAnymore
 * @param guestId 
 * @returns 
 */
static  checkIfNotABoatGuestAnymore = async (guestId) => {
  try {
    const boatGuest = await prisma.boatGuest.findFirst({
      where: {
        id: guestId
      }
    });
    return boatGuest ? true : false;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {

      logger.error(err);}
          throw err;
  }
}
}



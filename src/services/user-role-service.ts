import prisma from '../db/prisma';
import {} from '../@types';
import logger from '../logger';

/**
 * @class UserRolesServices
 * 
 */

export  default  class  UserRolesServices{

  /** 
   * @function createUserRoleAsOwner
   * @param user 
   */

static createUserRoleAsOwner = async (user) => {
  try {
    const userRoleAsOwner = await prisma.userRole.findFirst({
      where: {
        userId: user.id,
        roleId: 1
      }
    });
    if (!userRoleAsOwner) {
      console.info(`creating user role as owner(1) for ${user.email}`);
      await prisma.userRole.create({
        data: { roleId: 1, userId: user.id }
      });
    }
  } catch (err) {
    logger.error(err);
    throw err;
  }
};


/**
 * @function deleteUserRoleAsOwner
 * @param owner 
 */
static deleteUserRoleAsOwner = async (owner) => {
  try {
    console.log(`deleting user role as owner(1) for userID: ${owner.userId}`);
    const userRole = await prisma.userRole.findFirst({
      where: { roleId: 1,
         userId: owner.userId }
    });
    if (userRole) {
      await prisma.userRole.delete({
        where: { id: userRole.id }
      });
    }
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

/**
 * @function createUserRoleAsGuest
 * @param user 
 */
static createUserRoleAsGuest = async (user) => {
  try {
    const userRoleAsGuest = await prisma.userRole.findFirst({
      where: {
        userId: user.id,
        roleId: 2
      }
    });
    if (!userRoleAsGuest) {
      console.info(`creating user role as guest(2) for ${user.email}`);
      await prisma.userRole.create({
        data: { roleId: 2, userId: user.id }
      });
    }
  } catch (err) {
    logger.error(err);
    throw err;
  }
};


/**
 * @function deleteUserRoleAsGuest
 * @param guest 
 */
static deleteUserRoleAsGuest = async (guest) => {
  try {
    logger.info(
      'Existing boat guest is no longer a guest, deleting user role as guest'
    );
    if (guest) {
      const userRole = await prisma.userRole.findFirst({
        where: { roleId: 2, userId: guest.userId }
      });
      await prisma.userRole.delete({
        where: {
          id: userRole.id
        }
      });
    }
  } catch (err) {
    logger.error(err);
    throw err;
  }
}
}
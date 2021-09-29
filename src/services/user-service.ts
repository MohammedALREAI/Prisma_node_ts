import firebase from '../db/firebase';
import prisma from '../db/prisma';
import generateRandomToken from '../helpers/generateRandomToken';
import {} from '../@types';
import logger from '../lib/logger';

import createError from 'http-errors';


/**
 * @class  UserService
 */


export  default  class  UserService{



/**
 * @function getUser
 * @param id
 * @returns
**/



static getUser = async (uid: string) => {
  const user = prisma.user.findUnique({
    where: { uid },
    include: {
      userRoles: {
        select: {
          role: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  if(!user){
    throw createError(400, `${uid} there  is  no  user  like  that   `);
  }
  return user;
};

/**
 * @function updateUserEmail
 * @param id
 * @returns
 */
static updateUserEmail = async (id: number, email: string) => {

const  user= await prisma.user.update({
  where:{
    id    
  },
    data:{
      email
    }
});
  if(!user){
      throw createError(401, `${id} you  are  not  have  authorization  to  access  to  this  section  `);
    }
    
    return  user;

};

/**
 * @updateUserEmail
 * @param id
 * @param name
 */
static updateUserName = async (id: number, name: string) => {
 
      const  userFound=await  prisma.user.update({
        where:{
          id
        },
        data:{
          name
        }
      })
      if(!userFound){
        throw createError(401, `${id} there  are  no  user  like that  `);

      }

      return  userFound;

};




/**
 * @function verifyUser
 * @param token 
 * @returns 
 */

static verifyUser = async token => {
  try {
    const user = await prisma.$transaction(async prisma => {
      const userToken = await this.getUserToken(token);
      if (!userToken) {
        throw new Error('Invalid token');
      }
      const user = await this.getUserByUserId(userToken.userId);
      return user;
    });
    return user;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};




static getUserToken = async (token:string) => {
  try {
    const userToken = await prisma.userToken.findUnique({
      where: {
        token: token
      }
    });
    return userToken;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

static getUserByUserId = async (userId:number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        userToken: true
      }
    });
    return user;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

static createUser = async (userData) => {
  try {
    console.info(`creating user for ${userData.email}`);
    const uid = generateRandomToken(16);
    userData.uid = uid;
    const user = await prisma.user.create({ data: userData });
    return user;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};




static createFirebaseUser = async userData => {
  try {
    const user = await firebase.auth().createUser({
      uid: userData.uid,
      email: userData.email,
      password: userData.password
    });

    if (user && user.uid) {
      const userToUpdate = await prisma.user.findFirst({
        where: {
          email: user.email
        }
      });
      if (userToUpdate) {
        await prisma.user.update({
          where: {
            id: userToUpdate.id
          },
          data: {
            name: userData.name,
            isRegistered: true
          }
        });
        return user;
      } else {
        throw new Error('Error updating registered user');
      }
    } else {
      throw new Error('Error creating Firebase user');
    }
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

static getUserByEmail = async (email:string, inclusion:{}) => {
  try {
    const user= prisma.user.findUnique({
      where: {
        email: email
      },
      include: inclusion
    });

    if(!user){
      logger.error("there  is  no  user  in the  data  ");
    }
    return  user;

  } catch (err) {
    logger.error(err);
    throw err;
  }
};

static getUserWhoIsBoatOwner = async (boatId) => {
  try {
    const boatOwner = await prisma.boatOwner.findUnique({
      where: {
        boatId: boatId
      },
      include: {
        owner: true
      }
    });
    if (boatOwner.owner) {
      const user = prisma.user.findFirst({
        where: {
          id: boatOwner.owner.userId
        }
      });
      return user;
    } else {
      throw new Error('Error with Owner/BoatOwner in sql');
    }
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

static getBoatsByUserUID = async uid => {
  try {
    const user = await prisma.user.findUnique({
      where: { uid },
      include: {
        userRoles: {
          select: {
            role: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      throw createError(404, 'User not found');
    }

    const roleList = user.userRoles.map(value => value.role.name);

    const isAdmin = roleList.includes('admin');
    const isOwner = roleList.includes('owner');
    const isGuest = roleList.includes('guest');
    const isDealer = roleList.includes('dealer');

    let userBoats: Array<any> = [];

    if (isOwner) {
      const owner = await prisma.owner.findUnique({
        where: { userId: user.id }
      });

      if (!owner) {
        throw createError('Unauthorized');
      }

      const boatOwners = await prisma.boatOwner.findMany({
        where: {
          ownerId: owner.id
        }
      });

      const ownerBoats: Array<any> = [];

      for (let i = 0; i < boatOwners.length; i++) {
        const ownerBoat = await prisma.boat.findUnique({
          where: {
            id: boatOwners[i].boatId
            
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
        ownerBoats.push(ownerBoat);
      }
      userBoats = [...userBoats, ...ownerBoats];
    }

    if (isDealer) {
      const dealer = await prisma.dealer.findUnique({
        where: { userId: user.id }
      });

      if (!dealer) {
        throw createError('Unauthorized');
      }

      const dealerBoats = await prisma.boat.findMany({
        where: { dealershipId: dealer.dealershipId },
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
      const dealerBoatsNotSold: Array<any> = [];
      dealerBoats.forEach(boat => {
        if (!boat.boatOwner) {
          dealerBoatsNotSold.push(boat);
        }
      });
      userBoats = [...userBoats, ...dealerBoatsNotSold];
    }

    if (isAdmin) {
      const admin = await prisma.admin.findUnique({
        where: { userId: user.id }
      });

      if (!admin) {
        throw createError('Unauthorized');
      }

      const boatAdmins = await prisma.boatAdmin.findMany({
        where: {
          adminId: admin.id
        }
      });

      const adminBoats: Array<any> = [];

      for (let i = 0; i < boatAdmins.length; i++) {
        const adminBoat = await prisma.boat.findUnique({
          where: {
            id: boatAdmins[i].boatId
          },
          include: {
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
        adminBoats.push(adminBoat);
      }
      userBoats = [...userBoats, ...adminBoats];
    }

    if (isGuest) {
      const guest = await prisma.guest.findUnique({
        where: { userId: user.id }
      });

      if (!guest) {
        throw createError('Unauthorized');
      }

      const boatGuests = await prisma.boatGuest.findMany({
        where: {
          guestId: guest.id
        }
      });

      const guestBoats: Array<any> = [];

      for (let i = 0; i < boatGuests.length; i++) {
        const guestBoat = await prisma.boat.findUnique({
          where: {
            id: boatGuests[i].boatId
          },
          include: {
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
        guestBoats.push(guestBoat);
      }
      userBoats = [...userBoats, ...guestBoats];
    }
    console.log(userBoats);
    return userBoats;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}
}
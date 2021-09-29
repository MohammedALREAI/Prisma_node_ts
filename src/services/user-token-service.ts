import prisma from '../db/prisma';
import generateRandomToken from '../helpers/generateRandomToken';
import {} from '../@types';
import logger from '../lib/logger';

export const createUserToken = async (user) => {
  try {
    logger.info(`Creating new userToken for userId: ${user.id}`);
    const token = generateRandomToken(8);
    const userToken = await prisma.userToken.create({
      data: {
        userId: user.id,
        token: token
      }
    });
    return userToken;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

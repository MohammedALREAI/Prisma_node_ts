import crypto from 'crypto';

const generateRandomToken = (size: number): string => {
  return crypto.randomBytes(size).toString('hex');
};

export default generateRandomToken;

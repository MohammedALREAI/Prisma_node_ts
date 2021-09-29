import {Router} from 'express';

import userRouter from './user-router';
import deviceRouter from './device-router';
import deviceTelemetryRouter from './device-telemetry-router';
import provisionRouter from './provision-router';
import boatRouter from './boat-router';
import dealershipRouter from './dealership-router';
import boatGuestRouter from './boat-guest-router';
import transferBoatRouter from './transfer-boat-router';
import emailRouter from './email-router';

const router = Router();



/***
 * fix handlwe  all  route  
 * setup  the  language  
 * 
 */
router.use('/user', userRouter);
router.use('/device', deviceRouter);
router.use('/device-telemetry', deviceTelemetryRouter);
router.use('/provision', provisionRouter);
router.use('/boat', boatRouter);
router.use('/dealership', dealershipRouter);
router.use('/boat-guest', boatGuestRouter);
router.use('/transfer-boat', transferBoatRouter);
router.use('/email', emailRouter);


/**
 * 
 */

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
 
/**
   * @swagger
   * components:
   *   securitySchemes:
   *     bearerAuth:
   *        type: http
   *        scheme: bearer
   *        bearerFormat: Firebase Auth Token 
   * 
   */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Osmosis APIs',
      version: '1.0.0',
    },
  },
  //apis: ['./dist/routers/*.js'], // Maybe something like this may need to be used if we ever want to use swagger in dev or staging envionments?
  apis: ['./src/routers/*.ts'],
};

const isDev = process.env.NODE_ENV !== 'production';

if(isDev) {
    // Only enable swagger in the dev environments. We don't want this running on production.
    const swaggerSpec = swaggerJsdoc(options);
    router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default router;

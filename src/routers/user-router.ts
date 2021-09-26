import express from 'express';
import * as UserController from '../controllers/user-controller';
import { authenticationMiddleware as authenticate } from '../middleware';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and user details
 * 
 */


/**
 * @swagger
 * /user/{id}:
 *    get:
 *      summary: Retrieve the details of a user by user id (uid).
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: User ID (uid) that is shared between firebase auth and SQL Server
 *          required: true
 *          schema:
 *             type: string
 *      responses:
 *         '200':
 *            description: Details of the specific user.
 *            content:
 *               application/json:
 *                  schema:
 *                     type: object
 */
router.get('/:id', authenticate, UserController.getUser);

/**
 * @swagger
 * /user/fleet/{id}:
 *    get:
 *      summary: Retrieve the entire fleet for the specified user id (uid).
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: User ID (uid) that is shared between firebase auth and SQL Server
 *          required: true
 *          schema:
 *             type: string
 *      responses:
 *         '200':
 *            description: The fleet of boats for the specified user.
 *            content:
 *               application/json:
 *                  schema:
 *                     type: object
 */
router.get('/fleet/:uid', authenticate, UserController.getUserFleet);

//do not need to authenticate this one
router.post('/verify-user/:token', UserController.verifyUser);

//do not need to authenticate this one
router.post(
  '/create-firebase-user',
  [
    body('email').isEmail(),
    body('name', 'Name is required')
      .not()
      .isEmpty(),
    body('password', 'Password is required')
      .not()
      .isEmpty(),
    body('uid', 'UID is required')
      .not()
      .isEmpty()
  ],
  UserController.createFirebaseUser
);

router.patch('/edit/name', authenticate, UserController.updateUserName);

router.patch('/edit/email', authenticate, UserController.updateUserEmail);

export default router;

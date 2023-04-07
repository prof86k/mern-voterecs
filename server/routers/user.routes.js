import express from 'express';
import { createUser, listUsers, updateUser, removeUser, readUser, findById } from '../controllers/user.controller';
import loginMiddleware from '../../middlewares/login.middleware';
const userRouter = express.Router();

userRouter.route('/api/users')
    .get(listUsers)
    .post(createUser);

userRouter.get('/api/users/:userId')
    .get(readUser, loginMiddleware.requireSignIn)
    .put(updateUser, loginMiddleware.requireSignIn, loginMiddleware.hasAuthorization)
    .delete(removeUser, loginMiddleware.requireSignIn, loginMiddleware.hasAuthorization);

userRouter.param('userId', findById);

export default userRouter;
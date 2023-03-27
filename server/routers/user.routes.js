import express from 'express';
import { createUser, listUsers, updateUser, removeUser, readUser, findById } from '../controllers/user.controller';
import { hasAuthorization,requireSignIn } from '../controllers/auth.controller';

const userRouter = express.Router();

userRouter.route('/api/users')
    .get(listUsers)
    .post(createUser);

userRouter.get('/api/users/:userId')
    .get(readUser,requireSignIn)
    .put(updateUser,requireSignIn, hasAuthorization)
    .delete(removeUser, requireSignIn, hasAuthorization);

userRouter.param('userId',findById);

export default userRouter;
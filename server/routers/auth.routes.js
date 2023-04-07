import express from 'express';
import { signIn, signOut } from '../controllers/auth.controller';
import loginMiddleware from '../../middlewares/login.middleware';

const router = express.Router();

router.route('/auth/login')
    .post(signIn);

router.route('/auth/logout', loginMiddleware.requireSignIn)
    .get(signOut);

export default router;
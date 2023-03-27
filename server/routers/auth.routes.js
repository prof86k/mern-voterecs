import express from 'express';
import { signIn, signOut , requireSignIn} from '../controllers/auth.controller';

const router = express.Router();

router.route('/auth/sign-in')
    .post(signIn);

router.route('/auth/sign-out',requireSignIn)
    .get(signOut);

export default router;
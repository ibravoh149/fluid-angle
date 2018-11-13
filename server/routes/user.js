import express from 'express';

import passport from 'passport';

import { User, ForgetPassword } from '../controllers';


const router = express.Router();

// user signup
router.post('/signup', User.signup);

// user signin
router.post('/signin', User.login);

// reset password request
router.put('/local/password/request-reset', ForgetPassword.resetPasswordRequest);

// reset password
router.put('/local/password/reset/:token', ForgetPassword.resetPassword);


export default router;
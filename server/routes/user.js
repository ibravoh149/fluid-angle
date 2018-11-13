import express from 'express';

import passport from 'passport';

import { User } from '../controllers';


const router = express.Router();

router.post('/signup', User.signup);
router.post('/signin', User.login);

export default router;
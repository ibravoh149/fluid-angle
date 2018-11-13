import express from 'express';

import passport from 'passport';

import { Contact } from '../controllers';
const passportConfg = require('../middleware/passport');

const router = express.Router();

// create a new contact
router.post('/', passport.authenticate('jwt', {session:false}), Contact.createContact)

export default router;
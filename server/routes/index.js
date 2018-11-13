// imort express module
import express from 'express';
import contact from './contact';
import user from './user';


//import indivdual routes

const router = express.Router();

// user route
router.use('/user', user);

// contact route
router.use('/contact', contact)



export default router;
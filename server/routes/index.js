// imort express module
import express from 'express'
import user from './user'


//import indivdual routes

const router = express.Router();

// user route
router.use('/user', user);





export default router;
'use strict'
import bcrypt from 'bcrypt-nodejs';

import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';

import db from '../models';

import validate from '../middleware/validate';



const nodemailer = require('nodemailer');


const secretKey = process.env.JWT_SECRET_KEY;
const expireIn = Number(process.env.JWT_EXPIRATION);


class User{


    /**
     *
     *
     * @static
     * @param {*} req
     * @param {*} res
     * @returns {object} user object and token
     * @memberof User
     */

    static async signup(req, res){

        // validate fields
        validate.validateSignup(req, res);
            const errors = req.validationErrors();
            if (errors) {
                res.status(400).json({
                    message: errors
                });
                return;
            }
    
           try {
            const { body: { username, email, password } } = req;
    
            let existingUser = await db.user.findOne({where:{email}});
            if(existingUser){
                return res.status(409).json({message:`user with email ${email} already exist`});
            }
            else{
                const salt = bcrypt.genSaltSync(8);
                let user = await db.user.create({
                    username, email, password: bcrypt.hashSync(password, salt),
                });
    
                
                const token = jwt.sign({
                    sub: user.id,
                    email: user.email,
                }, secretKey,{expiresIn:expireIn});
    
                return res.status(201).json({user,token});
            }
    
           } catch (error) {
               console.log(error)
               return res.status(500).json({message:'something bad happened'})
           }
            
        }

        static async login(req, res){
            validate.validateLogin(req, res);
            const errors = req.validationErrors();
            if (errors) {
                return res.status(400).json({
                    message: errors
                });
            }
    
            try {
                const { email, password } = req.body;
                let user = await db.user.findOne({where:{email}});
                if (user && password
                    && validate.comparePassword(password, user.password)
                ) {
                    
                    const token = jwt.sign({
                        sub: user.id,
                        email: user.email,
                    }, secretKey,{expiresIn:expireIn});
    
                    return res.status(200).json({
                        token,
                        user
                    });
                }else {
                    res.status(401).json({
                        message: 'Email or Password Incorrect'
                    });
                }
            } catch (error) {
               console.log(error)
                
            }
        }
}
export default User
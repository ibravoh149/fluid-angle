'use strict'
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';
import db from '../models';

import validate from '../middleware/validate';
import crypto from 'crypto';

const nodemailer = require('nodemailer');

dotenv.config();
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS
    }
});



/**
 *
 *@description a class definition to handle password reset
 * @class ForgetPassword
 */
class ForgetPassword{


    /**
     *
     *
     * @static
     * @param {*} req
     * @param {*} res
     * @returns { object } a message showing a showing confirmation or error
     * @memberof ForgetPassword
     */
    static async resetPasswordRequest(req, res){
        validate.validateResetPasswordEmail(req, res)
        const errors = req.validationErrors();

        if (errors) {
            return res.status(400).json({
                message: errors
            });
        } 

        let userEmail = req.body.email;
        const email = userEmail.toLowerCase();
        const user = await db.user.findOne({where:{email}});
        if(user===null){
            return res.status(404).json({message:'user with this email does not exit'})
        }else{
            try {

                let token = crypto.randomBytes(20).toString('hex');
                const updateInfo={
                    resetPasswordToken:token,
                    resetPasswordExpires:Date.now() + 86400000  // 1 hour
                }
                const updatedUser = await user.update(updateInfo);
                let mailOptions = {
                    from: '"fluid angle "'+ '<' + 'fluid-angle.com' + '>', // sender address (who sends)
                    to: email, // list of receivers (who receives)
                    subject: 'Password Reset ', // Subject line
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'https://' + host + '/user/password/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'

                };

                transporter.sendMail(mailOptions, (error, info)=>{
                    if(error){
                        return console.log(error);
                    }
                
                    res.status(200).json({
                        message:`An e-mail has been sent to ${email} with further instructions`
                    });
                });
            } catch (error) {
                console.log(error);
                return res.status(501).json({message:'internal server error'});
            }
        }

    }


    /**
     *
     *
     * @static
     * @param {*} req
     * @param {*} res
     * @returns { object } a message showing confirmatioon or error
     * @memberof ForgetPassword
     */
    static async resetPassword(req, res){
        validate.validateResetPassword(req, res)
        const errors = req.validationErrors();

        if (errors) {
            return res.status(400).json({
                message: errors
            });
        } 

        const { newPassword } = req.body 

        try {
            const user = await db.user.findOne({
                where:{
                    resetPasswordToken:req.params.token,
                    resetPasswordExpires:{$gt:Date.now()}
                }
            });
            
            if(user === null){
                return res.status(400).json({message:'Password reset token is invalid or has expired'})
            }

            const salt = bcrypt.genSaltSync(8);

            const hashedPassword =  bcrypt.hashSync(newPassword, salt);

            const updateInfo = {
                password:hashedPassword,
                resetPasswordToken:null,
                resetPasswordExpires:null
            }

            await user.update(updateInfo);

            let mailOptions = {
                from: '"Fluid Angle "'+ '<' + 'fluid-angle.com' + '>', // sender address (who sends)
                to: user.email, // list of receivers (who receives)
                subject: 'Your password has been changed', // Subject line
                text:'Hello,\n\n' +
                ' - This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'

            };

            transporter.sendMail(mailOptions, (error, info)=>{
                if(error){
                    return console.log(error);
                }
            
                res.status(200).json({
                    message:`Password for this account ${user.email} has been changed`
                });
            });


        } catch (error) {
            console.log(error);
            return res.status(501).json({message:'internal server error'})
        }

    }
}

export default ForgetPassword;
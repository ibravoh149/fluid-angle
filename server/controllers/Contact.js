'use strict'
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';
import db from '../models';

import validate from '../middleware/validate';

class Contact{

    static async createContact(req, res){
        const userId = req.user.id;
        validate.validateAddContact(req, res)
        const errors = req.validationErrors();

        if (errors) {
            return res.status(400).json({
                message: errors
            });
        }
        
        try {
            const { contactName, phone } = req.body;
            let existingContact = await db.contact.findOne({where:{phone}});
            if(existingContact){
                return res.status(409).json({message:"This contact already exists"});
            }
           
            let contact = await db.contact.create({contactName, phone, userId,isStarred:false});

            if(contact){
                return res.status(201).json({contact})
            }   
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"internal server error"})
        }
    }

    static async getMyContacts(req, res){
        const userId = req.user.id;

        try {
            let contacts = await db.contact.findAll({where:{userId}});
            if(contacts.length < 1){
                return res.status(404).json({message:"You have no contacts saved"})

            }

            return res.status(200).json({contacts})

        } catch (error) {
             console.log(error)
            return res.status(500).json({message:"internal server error"})
        }

    }

    
}
export default Contact;
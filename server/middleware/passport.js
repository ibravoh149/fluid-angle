import { ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
import passport from 'passport';
import db from '../models';
//import validate from '../middleware/validate';
const JwtStrategy = require('passport-jwt').Strategy;
const GoolgePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
//const LocalStrategy = require('passport-local').Strategy;
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

// jwt strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey:secretKey 
}, (payload, done)=>{
    //get the user from token 
  return db.Users.findById(payload.sub) 
    .then((user)=>{
        //return false if user not found
        if(!user){
            return done(null, false);
        }
        //return user if found
      
        return done(null, user);
    })
    .catch((error)=>{
       return done(error, false)
    });
}));


// google oAuth strategy 
passport.use('googleToken', new GoolgePlusTokenStrategy({
    clientID: process.env.google_clientId,
    clientSecret:process.env.google_clientSecret

}, (accessToken, refreshToken, profile, done)=>{
// search database for existing users with google accounts

return db.Users.findOne({
    where:{
        googleId:profile.id
    }
    }).then((user)=>{
        if(user){
            return done(null, user);
        }
            const newUser = {
                method:'google',
                fullName:profile.displayName,
                googleEmail:profile.emails[0].value,
                googleId :profile.id,
                user:'user',
                active:true,
                imageUrl:profile.photos[0].value
            };

           return db.Users.create(newUser)
            .then((createdUser)=>{
                done(null, createdUser);
            })
            .catch((error)=>{
                return done(false, error.message);
            });

    }).catch((error)=>{
        return done(error, false);
    });

}));


//google oAuth strategy signin
// passport.use('googleTokenSignin', new GoolgePlusTokenStrategy({
//     clientID: process.env.google_clientId,
//     clientSecret:process.env.google_clientSecret

// }, (accessToken, refreshToken, profile, done)=>{
// // search database for existing users with google accounts

// return db.Users.findOne({
//     where:{
//         google_id:profile.id
//     }
//     }).then((user)=>{
//         if(!user){
//             return done(null, false);
//         }

//         return done(null, user);

//     }).catch((error)=>{
//         return done(error, false);
//     });

// }));


//facebook Oauth strategy 
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID:process.env.facebook_clientId,
    clientSecret:process.env.facebook_clientSecret

},(accessToken, refreshToken, profile, done)=>{
 
    return db.Users.findOne({
        where:{
            facebookId:profile.id
        }
    }).then((user)=>{
        if(user){
            
            return done(null, user);
        }
            const newUser = {
                method:'facebook',
                fullName:profile.displayName,
                facebookEmail:profile.emails[0].value,
                facebookId :profile.id,
                user:'user',
                imageUrl:profile.photos[0].value,
                active:true
            };

           return db.Users.create(newUser)
            .then((createdUser)=>{
               
                done(null, createdUser);
            })
            .catch((error)=>{


                return done(false, error.message);
            });

    }).catch((error)=>{
       
        return done(error, false);
    });
}));

//facebook Oauth strategy signin
// passport.use('facebookTokenSignin', new FacebookTokenStrategy({
//     clientID:process.env.facebook_clientId,
//     clientSecret:process.env.facebook_clientSecret

// },(accessToken, refreshToken, profile, done)=>{
 
//     return db.Users.findOne({
//         where:{
//             facebook_id:profile.id
//         }
//     }).then((user)=>{
//         if(!user){
//             return done(null, false);
//         }

//         return done(null, user);

//     }).catch((error)=>{
       
//         return done(error, false);
//     });
// }));



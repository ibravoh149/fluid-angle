import jwt_decode from 'jwt-decode';
import ValidatePassword from 'validate-password';
import bcrypt from 'bcrypt-nodejs';
import * as dotenv from 'dotenv';
import db from '../models';
dotenv.config();

const options = {
  enforce: {
    lowercase: true,
    uppercase: true,
    specialCharacters: true,
    numbers: true
  }
};

const passwordValidator = new ValidatePassword(options);

const validator = {
  // validates login
  validateLogin(request, response) {
    request
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
    request
      .checkBody("password", "Password can't be empty.")
      .notEmpty();
  },

  // validates signup
  validateSignup(request, response) {
    request
      .checkBody("firstName",
        "First name can't be less than 3 or more than 25 characters and must not contain numbers or spaces."
      )
      .matches(/^[a-zA-Z.]{3,25}$/);
    request
      .checkBody("lastName",
        "Last name can't be less than 3 or more than 25 characters and must not contain numbers or spaces."
      )
      .matches(/^[a-zA-Z.]{3,25}$/);
    request
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
    // request
    //   .checkBody("phone",
    //   "Phone number must be a valid phone number and must not contain spaces."
    //   )
    //   .matches(/^[0-9\-.]{8,15}$/);

    request
      .checkBody("password",
        "Password can't be less than 8 characters and must not contain spaces."
      )
      .matches(/^[a-zA-Z0-9!@#$%^&*()_\-.]{8,32}$/);
    request
      .checkBody("confirmPassword",
        "Password confirmation field can't be empty."
      )
      .notEmpty();
    request
      .checkBody("password", "Password didn't match")
      .equals(request.body.confirmPassword);
  },

  // validates sending vericode
  validateVerificationCode(request, response) {
    request
      .checkBody("verificationCode", "Please, provide verification Code.")
      .notEmpty();
  },

  // validates resending verification codes
  validateResendVeriCode(request, response) {
    request
      .checkBody("email", "Please enter a valid email.")
      .isEmail();
  },

  //validates reset password request email
  validateResetPasswordEmail(request, response) {
    request
      .checkBody("email", "Please enter a valid email.")
      .isEmail();
  },

  // validates reset password
  validateResetPassword(request, response) {
  request
    .checkBody("newPassword",
      "Password can't be less than 8 characters and must not contain spaces."
    )
    .matches(/^[a-zA-Z0-9!@#$%^&*()_\-.]{8,32}$/);

  request
    .checkBody("confirmPassword",
      "Password confirmation field can't be empty."
    )
    .notEmpty();
  request
    .checkBody("newPassword", "Password didn't match")
    .equals(request.body.confirmPassword);
  },

  // validates adding new user
  validateAddUser(request, response) {
    request
      .checkBody("email", "Enter a valid email address.")
      .isEmail();
  },

  // validates password change
  validateChangePassword(request, response) {

    request
      .checkBody("oldPassword",
        "you must enter your current password."
      ).notEmpty();

    request
      .checkBody("newPassword",
        "Password can't be less than 8 characters and must not contain spaces."
      )
      .matches(/^[a-zA-Z0-9!@#$%^&*()_\-.]{8,32}$/);

    request
      .checkBody("confirmPassword",
        "Password confirmation field can't be empty."
      )
      .notEmpty();
    request
      .checkBody("newPassword", "Password didn't match")
      .equals(request.body.confirmPassword);
  },


  // validates manager signup
  validateManagerSignup(request, response) {

    request
      .checkBody("email", "Enter a valid email address.")
      .isEmail();

    request
      .checkBody("password",
        "Password can't be less than 8 characters and must not contain spaces."
      )
      .matches(/^[a-zA-Z0-9!@#$%^&*()_\-.]{8,32}$/);
    request
      .checkBody("confirmPassword",
        "Password confirmation field can't be empty."
      )
      .notEmpty();
    request
      .checkBody("password", "Password didn't match")
      .equals(request.body.confirmPassword);
  },

  // validates profile edit
  validateProfileEdit(request, response) {
    request
      .checkBody("fullName",
        "Name can't be less than 3 or more than 50 characters"
      )
      .matches(/^[a-zA-Z. ]{3,50}$/);
  },

  // validates adding events
  validateAddEvents(request, response) {
    request
      .checkBody("title", "Title can't be less than 5 characters.")
      .isLength({ min: 5 });

    request
      .checkBody("imageUrl", "Please, select an image.")
      .notEmpty();

    request
      .checkBody("description", "Description can't be less than 10 characters.")
      .isLength({ min: 10 });

    request
      .checkBody("organiser", "Organiser can't be empty.")
      .notEmpty();

    request
      .checkBody("city", "City cannot be empty")
      .notEmpty();

    request
      .checkBody("venue", "Venue cannot be empty.")
      .notEmpty();

    request
      .checkBody("stateId", "you must select a state.")
      .notEmpty();

    request
      .checkBody("address", "Address cannot be empty.")
      .notEmpty();

    request
      .checkBody("startDate", "you must select a start date.")
      .notEmpty();

    request
      .checkBody("endDate", "you must select an end date.")
      .notEmpty();

    request
      .checkBody("startTime", "you must select a start time.")
      .notEmpty();

    request
      .checkBody("endTime", "you must select an end time.")
      .notEmpty();

    request
      .checkBody('isPublished', "you must specify publish status")
      .notEmpty();

    request
      .checkBody("ticketDetails", "you must add one or more ticket detail(s)")
      .isArray()
      .notEmptyArray();
  },
  // validates updating events
  validateEditEvents(request, response) {
    request
      .checkBody("title", "Title can't be less than 5 characters.")
      .isLength({ min: 5 });

    request
      .checkBody("imageUrl", "Please, select an image.")
      .notEmpty();

    request
      .checkBody("description", "Description can't be less than 10 characters.")
      .isLength({ min: 10 });

    request
      .checkBody("organiser", "Organiser can't be empty.")
      .notEmpty();

    request
      .checkBody("city", "City cannot be empty")
      .notEmpty();

    request
      .checkBody("venue", "Venue cannot be empty.")
      .notEmpty();

    request
      .checkBody("stateId", "you must select a state.")
      .notEmpty();

    request
      .checkBody("address", "Address cannot be empty.")
      .notEmpty();

    request
      .checkBody("startDate", "you must select a start date.")
      .notEmpty();

    request
      .checkBody("endDate", "you must select an end date.")
      .notEmpty();

    request
      .checkBody("startTime", "you must select a start time.")
      .notEmpty();

    request
      .checkBody("endTime", "you must select an end time.")
      .notEmpty();

    request
      .checkBody('isPublished', "you must specify publish status")
      .notEmpty();

  },

  // validate add event ticket
  validateAddTicketDetail(request, response) {
    request
      .checkBody("ticketCategoryId", "you must select an ticket category.")
      .notEmpty();

    request
      .checkBody("ticketTypeId", "you must select a ticket type.")
      .notEmpty();

    request
      .checkBody("quantity", "quantity cannot be empty.")
      .notEmpty();

    request
      .checkBody('qrcodeText', "qrCode Text must be set")
      .notEmpty();
  },

  // validates updating ticket details
  validateUpdateTicketDetail(request, response) {
    request
      .checkBody("ticketCategoryId", "you must select an ticket category.")
      .notEmpty();

    request
      .checkBody("ticketTypeId", "you must select a ticket type.")
      .notEmpty();

    request
      .checkBody("quantity", "quantity cannot be empty.")
      .notEmpty();

    request
      .checkBody('qrcodeText', "qrCode Text must be set")
      .notEmpty();
  },

  // validates event notification sending
  validateSendNotification(request, response) {
    request
      .checkBody("title", "Title can't be empty.")
      .notEmpty();

    request
      .checkBody("body", "body can't be empty.")
      .notEmpty();
  },

  // validates adding busness
  validateAddBusiness(request, response) {

    request
      .checkBody("businessCategoryId", "you must select a category.")
      .notEmpty();

    request
      .checkBody("name", "Name can't be empty.")
      .notEmpty();

    request
      .checkBody("description", "Description can't be less than 10 characters.")
      .isLength({ min: 10 });

    request
      .checkBody("openingHours", "Opening Hour must be selected")
      .notEmpty();

    request
      .checkBody("closingHours", "Closing Hour must be selected.")
      .notEmpty();

    request
      .checkBody("stateId", "you must select a state.")
      .notEmpty();

    request
      .checkBody("address", "Address cannot be empty.")
      .notEmpty();

    request
      .checkBody("city", "city cannot be empty.")
      .notEmpty();

  },

  // validates edit business
  validateEditBusiness(request, response) {

    request
      .checkBody("businessCategoryId", "you must select a category.")
      .notEmpty();

    request
      .checkBody("name", "Name can't be empty.")
      .notEmpty();

    request
      .checkBody("description", "Description can't be less than 10 characters.")
      .isLength({ min: 10 });

    request
      .checkBody("openingHours", "Opening Hour must be selected")
      .notEmpty();

    request
      .checkBody("closingHours", "Closing Hour must be selected.")
      .notEmpty();

    request
      .checkBody("stateId", "you must select a state.")
      .notEmpty();

    request
      .checkBody("address", "Address cannot be empty.")
      .notEmpty();

    request
      .checkBody("city", "city cannot be empty.")
      .notEmpty();

  },
  // validate adding state
  validateAddState(request, response) {
    request
      .checkBody('countryId', 'you must select a country')
      .notEmpty();

    request
      .checkBody('stateName', 'Name of State cannot be empty')
      .notEmpty();
  },


  // validates a new transaction
  validateNewtransactionRef(request, response) {
    request
      .checkBody('referenceNumber', 'Transaction reference Number cannot be empty')
      .notEmpty();

    // request
    // .checkBody('userEmail', 'User Email is not set!')
    // .notEmpty();
  },

  validateSendEmailFields(request, response){
    request
    .checkBody('to', "Enter a valid email address.")
    .isEmail()

    request
    .checkBody('subject', 'subject cannot be empty')
    .notEmpty();

    request
    .checkBody('body', 'body cannot be empty')
    .notEmpty()
  },


  // validates id
  validateId(id) {
    if (isNaN(id)) {
      return false
    }
    return true
  },

  // validate strings
  validateString(string) {
    if (isNaN(string)) {
      return true;
    }
    return false;
  },

  // validate password strength
  validateStrengthPasswrod(password, request, response) {
    const validatedPassword = passwordValidator.checkPassword(password);
    return validatedPassword;
  },


  // capitalize First letter
  capitalizeFirst(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
  },


  // compared password
  comparePassword(password1, hashedPassword) {
    if (bcrypt.compareSync(password1, hashedPassword)) {
      return true;
    }
    return false;
  },


  // hash password
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
  },

  // convert string to title case
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },

  // validates adding event ticket details at event creation
  validateAddTicketAtEventCreation:{
    validateCategory(array) {
    if (array.length >= 1) {
      let first = array[0];
      return array.every((element) => {
        return Number(element.ticketCategoryId) === Number(first.ticketCategoryId);
      })
    }
    return;
  },
  validateType(array){
    if(array.length >=1){
     for(let i = 0; i<array.length; i++){
       for(let j =0; j<array.length; j++){
            if(array[i].ticketTypeId == array[j].ticketTypeId && i !=j){
                return true;
            }
       }
     }
     return false
    }
    return
  }
},

  // validates adding event ticket at event update
  validateAddTicketAtEventUpdate: {
    validateCategory(array, item) {
      if (array.length >= 1) {
        return array.every((element) => {
          return Number(element.ticketCategoryId) === Number(item);
        })
      }
    },
    validateType(array, item) {
      if (array.length >= 1) {
        for (let i = 0; i < array.length; i++) {
          if (Number(array[i].ticketTypeId) === Number(item)) {
            return true;
          }
        }
        return false;
      }
    }
  },
  

}





export default validator;
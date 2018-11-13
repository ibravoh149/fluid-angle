import jsonwebtoken from 'jsonwebtoken';
import db from '../.././server/models';

const {
 user, contact
} = db;

const users = [
  
  {
   
    email: 'convictmusic@gmail.com',
    username: 'randomuser',
    password: 'simple',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
];

const contacts = [
  {
    userId:1,
    phone:"80948447",
    contactName:'de don',
    isStarred:true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    userId:1,
    phone:"80948447",
    contactName:'de don',
    isStarred:false,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];




/**
 * @description Insert seed data in user model
 *
 * @returns {void} Nothing
 */
export const insertUserSeed = () => {
  user.bulkCreate(users);
};

/**
 * @description Insert seed data in contact model
 *
 * @returns {void} Nothing
 */
export const insertContactSeed = () => {
  contact.bulkCreate(contacts);
};


/**
 * @description Generates token from seed data
 *
 * @param {Number} id - User object
 *
 * @returns {string} token - Generated token
 */

const generateToken = (id, email) => {
 const {JWT_SECRET_KEY, JWT_EXPIRATION } = process.env;
  const token = jsonwebtoken.sign({
    sub: id,
    email: email,
}, JWT_SECRET_KEY,{expiresIn:Number(JWT_EXPIRATION)});
  return token;
};

export const user1token = generateToken(1, 'convicmusic@gmail.com');
export const user2token = generateToken(3,'convictmusic@gmail.com');

export const validUser = {
  
	email: 'convicmusic@gmail.com',
	username: 'randomuser',
  confirmPassword: 'simple',
	password: 'simple',
	createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const validContact = {
	phone:"809484476",
	contactName:'de don',
	isStarred:false,
	createdAt: Date.now(),
  updatedAt: Date.now(),
  userId:1
  
};

export const contactWithNoContactName = {
		phone:"80948447",
		contactName:'',
		isStarred:false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    userId:2
 };

 export const contactWithNoPhone = {

	phone:"",
	contactName:'ifueniwfo',
	isStarred:false,
	createdAt: Date.now(),
  updatedAt: Date.now(),
  userId:2
  
};



export const userWithNoEmail = {
	email: '',
	username: 'randomuser',
	password: 'simple',
  confirmPassword: 'niceone',
	createdAt: Date.now(),
	updatedAt: Date.now(),
};

export const userWithNoUsername = {
  email: 'convictmusic@gmail.com',
	username: '',
  confirmPassword: 'niceone',
	password: 'simple',
	createdAt: Date.now(),
	updatedAt: Date.now(),
};

export const userWithNoPassword = {
  email: 'convictmusic@gmail.com',
	username: 'random user',
	password: '',
  confirmPassword: 'niceone',
	createdAt: Date.now(),
	updatedAt: Date.now(),
};

export const badEmail = {
	email: 'convictmusic@',
	username: 'random user',
	password: 'simple',
  confirmPassword: 'niceone',
	createdAt: Date.now(),
	updatedAt: Date.now(),
};

export const duplicateEmail = {
  email: 'convicmusic@gmail.com',
	username: 'randomuser',
  confirmPassword: 'niceone',
	password: 'simple',
	createdAt: Date.now(),
	updatedAt: Date.now(),
};

export const checkPassword = {
	email: 'convictmusic@gmail.com',
	username: 'randomuser',
	password: 'simple',
  confirmPassword: 'niceone',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
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
export const insertEventSeed = () => {
  contact.bulkCreate(contacts);
};


/**
 * @description Generates token from seed data
 *
 * @param {Number} id - User object
 *
 * @returns {string} token - Generated token
 */
const generateToken = (id) => {
 const {JWT_SECRET_KEY } = process.env;
  const token = jsonwebtoken.sign({
    iss : 'grooveng',
    sub:id,
    expiresIn:84640
  }, JWT_SECRET_KEY);
  return token;
};

export const user1token = generateToken(2);
export const user2token = generateToken(3);

export const validUser = {
  
	email: 'convicmusic@gmail.com',
	username: 'randomuser',
  confirmPassword: 'simple',
	password: 'simple',
	createdAt: Date.now(),
	updatedAt: Date.now(),
};

export const validContact = {
	phone:"80948447",
	contactName:'de don',
	isStarred:false,
	createdAt: Date.now(),
	updatedAt: Date.now()
};

export const contactWithNoContactName = {
		phone:"80948447",
		contactName:'',
		isStarred:false,
    createdAt: Date.now(),
    updatedAt: Date.now()
 };

 export const contactWithNoPhone = {

	phone:"",
	contactName:'ifueniwfo',
	isStarred:false,
	createdAt: Date.now(),
	updatedAt: Date.now()
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
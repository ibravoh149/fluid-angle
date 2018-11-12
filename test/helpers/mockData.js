import jsonwebtoken from 'jsonwebtoken';
import db from '../.././server/models';

const {
  Users, Events, Locations, Dates, TicketDetails, Countries, States
} = db;

const users = [
  // {
  //   method:'local',
  //   fullName: 'mike tyson',
  //   email: 'mayemusic@gmail.com',
  //   phone: '08067143161',
  //   password: 'mikehey@gmail.com',
  //   role:'user',
  //   imageUrl:'http://image.jpg',
  //   createdAt: Date.now(),
  //   updatedAt: Date.now(),
  // },
  {
    method:'local',
    fullName: 'ibrahim declan',
    email: 'convictmusic@gmail.com',
    phone: '07067143141',
    password: 'ibravoh149@ymail.com',
    role:'user',
    imageUrl:'http://image.jpg',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
];

const events = [
  {
    userId:1,
    title:"another event watch me!",
    imageUrl:"http://some-image/jpg",
    description:"a very simple description",
    organiser:"wale ade",
    venue:"my house",
    address:"andela",
    isVerified:true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    userId:2,
    title:"another event watch me!",
    imageUrl:"http://some-image/jpg",
    description:"a very simple description",
    organiser:"wale ade",
    venue:"my house",
    address:"andela",
    isVerified:true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

const points= {
	type: 'Point',
	coordinates: [34.75994-123.764498]
}

const locations = [
  {
    stateId:2,
    eventId:1,
    address:"shoprite",
    points:points,
    type:1,
    createdAt:Date.now(),
    updatedAt:Date.now()
  },
  {
    stateId:1,
    eventId:2,
    address:"shoprite",
		points:points,
    type:1,
    createdAt:Date.now(),
    updatedAt:Date.now()
  }
  
];

const dates = [
    {
      eventId:1,
      start_date:'2018-10-09',
      end_date:'2018-10-09',
      start_time:"11:34:07",
      end_time:"11:34:07",
      createdAt:Date.now(),
      updatedAt:Date.now()
    },
    {
      eventId:2,
      start_date:'2018-10-09',
      end_date:'2018-10-09',
      start_time:"11:34:07",
      end_time:"11:34:07",
      createdAt:Date.now(),
      updatedAt:Date.now()
    }
];

const ticketDetails = [
  {
    eventId:1,
    ticketCategoryId:2,
    amount:100,
    quantity:5,
    ticketTypeId:2,
    other:"",
    createdAt:Date.now(),
    updatedAt:Date.now()
  },
  {
    eventId:1,
    ticketCategoryId:2,
    amount:100,
    quantity:5,
    ticketTypeId:1,
    other:"",
    createdAt:Date.now(),
    updatedAt:Date.now()
  },
  {
    eventId:2,
    ticketCategoryId:2,
    amount:100,
    quantity:5,
    ticketTypeId:2,
    other:"hello something",
    createdAt:Date.now(),
    updatedAt:Date.now()
  },
 ];


 const countries= [
   {
     name:'Ghana',
     createdAt:Date.now(),
     updatedAt:Date.now()
   },
   
   {
    name:'America',
    createdAt:Date.now(),
    updatedAt:Date.now()
  }
 ];

 const states = [
  {
    name:'Enugu',
    createdAt:Date.now(),
    updatedAt:Date.now()
  },
  
  {
   name:'Imo',
   createdAt:Date.now(),
   updatedAt:Date.now()
 }
]

/**
 * @description Insert seed data in user model
 *
 * @returns {void} Nothing
 */
export const insertUserSeed = () => {
  Users.bulkCreate(users);
};

/**
 * @description Insert seed data in events model
 *
 * @returns {void} Nothing
 */
export const insertEventSeed = () => {
  Events.bulkCreate(events);
};

/**
 * @description Insert seed data in locations model
 *
 * @returns {void} Nothing
 */
export const insertLocationSeed = ()=>{
  Locations.bulkCreate(locations);
}

/**
 * @description Insert seed data in date model
 *
 * @returns {void} Nothing
 */
export const insertDateSeed = ()=>{
  Dates.bulkCreate(dates);
}

/**
 * @description Insert seed data in TicketDetails model
 *
 * @returns {void} Nothing
 */
export const insertTicketDetailseed = ()=>{
  TicketDetails.bulkCreate(ticketDetails);
}

/**
 * @description Insert seed data in TicketDetails model
 *
 * @returns {void} Nothing
 */
export const insertCountrySeed = ()=>{
  Countries.bulkCreate(countries);
}


/**
 * @description Insert seed data in states model
 *
 * @returns {void} Nothing
 */
export const insertStateSeed = ()=>{
  States.bulkCreate(states);
}


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
  firstName: 'Adam',
  lastName:'smith',
  email: 'adamsmith@yahoo.com',
  phone: '07069143164',
  confirmPassword: 'BioHazard@1',
  password: 'BioHazard@1',
  image: ''
};

export const validEvent = {
	title: "valid event",
	imageUrl: "http://some-image/jpg",
	description:"a very simple description",
	organiser:"wale ade",
	venue:"my house",
	stateId:3,
	latitude:23.8896547,
	longitude:123.4728894,
	address:"andela",
	startDate:"2018-10-09",
	startTime:"11:34:07",
	endDate:"2018-10-10",
	endTime:"11:34:07",
	ticketDetails:[
		{
			ticketCategoryId:2,
			amount:100,
			quantity:5,
			ticketTypeId:2,
			other:""
		},	{
			ticketCategoryId:2,
			amount:1000,
			quantity:5,
			ticketTypeId:3,
			other:""
		},
	
	]
	
};

export const eventWithNoTitle = {

  title: '',
	imageUrl:"http://some-image/jpg",
	description:"a very simple description",
	organiser:"wale ade",
	venue:"my house",
	stateId:3,
	latitude:23.8896547,
	longitude:123.4728894,
	address:"andela",
	startDate:"2018-10-09",
	startTime:"11:34:07",
	endDate:"2018-10-10",
	endTime:"11:34:07",
	ticketDetails:[
		{
			ticketCategoryId:2,
			amount:100,
			quantity:5,
			ticketTypeId:2,
			other:""
		},
		{
			ticketCategoryId:2,
			amount:1000,
			quantity:5,
			ticketTypeId:3,
			other:""
		},
	],
    createdAt: Date.now(),
    updatedAt: Date.now()
 };

 export const eventWithNoDescription = {

  title: 'somenfidb',
	imageUrl:"http://some-image/jpg",
	description:"",
	organiser:"wale ade",
	venue:"my house",
	stateId:3,
	latitude:23.8896547,
	longitude:123.4728894,
	address:"andela",
	startDate:"2018-10-09",
	startTime:"11:34:07",
	endDate:"2018-10-10",
	endTime:"11:34:07",
	ticketDetails:[
		{
			ticketCategoryId:2,
			amount:100,
			quantity:5,
			ticketTypeId:2,
			other:""
		},
		{
			ticketCategoryId:2,
			amount:1000,
			quantity:5,
			ticketTypeId:3,
			other:""
		},
	],
    createdAt: Date.now(),
    updatedAt: Date.now()
};

export const eventWithNoOrganiser = {

  title: 'somenfidb',
	imageUrl:"http://some-image/jpg",
	description:"knsdhuiriehhioehofnlk",
	organiser:"",
	venue:"my house",
	stateId:3,
	address:"andela",
	latitude:23.8896547,
	longitude:123.4728894,
	startDate:"2018-10-09",
	startTime:"11:34:07",
	endDate:"2018-10-10",
	endTime:"11:34:07",
	ticketDetails:[
		{
			ticketCategoryId:2,
			amount:100,
			quantity:5,
			ticketTypeId:2,
			other:""
		},
		{
			ticketCategoryId:2,
			amount:1000,
			quantity:5,
			ticketTypeId:3,
			other:""
		},
	],
    createdAt: Date.now(),
    updatedAt: Date.now()
};

export const eventWithNoVenue = {

  title: 'somenfidb',
	imageUrl:"http://some-image/jpg",
	description:"knsdhuiriehhioehofnlk",
	organiser:"nknsdfnijfpot",
	venue:"",
	stateId:3,
	address:"andela",
	latitude:23.8896547,
	longitude:123.4728894,
	startDate:"2018-10-09",
	startTime:"11:34:07",
	endDate:"2018-10-10",
	endTime:"11:34:07",
	ticketDetails:[
		{
			ticketCategoryId:2,
			amount:100,
			quantity:5,
			ticketTypeId:2,
			other:""
		},
		{
			ticketCategoryId:2,
			amount:1000,
			quantity:5,
			ticketTypeId:3,
			other:""
		},
	],
    createdAt: Date.now(),
    updatedAt: Date.now()
};

export const eventWithNoStateId = {

  title: 'somenfidb',
	imageUrl:"http://some-image/jpg",
	description:"knsdhuiriehhioehofnlk",
	organiser:"nknsdfnijfpot",
	venue:"grhththttyjytjyjjyt",
	stateId:'',
	address:"andela",
	latitude:23.8896547,
	longitude:123.4728894,
	startDate:"2018-10-09",
	startTime:"11:34:07",
	endDate:"2018-10-10",
	endTime:"11:34:07",
	ticketDetails:[
		{
			ticketCategoryId:2,
			amount:100,
			quantity:5,
			ticketTypeId:2,
			other:""
		},
		{
			ticketCategoryId:2,
			amount:1000,
			quantity:5,
			ticketTypeId:3,
			other:""
		},
	],
    createdAt: Date.now(),
    updatedAt: Date.now()
};

export const eventWithNoAddress = {
 
  title: 'somenfidb',
	imageUrl:"http://some-image/jpg",
	description:"knsdhuiriehhioehofnlk",
	organiser:"nknsdfnijfpot",
	venue:"grhththttyjytjyjjyt",
	stateId:1,
	address:"",
	latitude:23.8896547,
	longitude:123.4728894,
	startDate:"2018-10-09",
	startTime:"11:34:07",
	endDate:"2018-10-10",
	endTime:"11:34:07",
	ticketDetails:[
		{
			ticketCategoryId:2,
			amount:100,
			quantity:5,
			ticketTypeId:2,
			other:""
		},
		{
			ticketCategoryId:2,
			amount:1000,
			quantity:5,
			ticketTypeId:3,
			other:""
		},
	],
    createdAt: Date.now(),
    updatedAt: Date.now()
};

export const eventWithNoStartDate = {

  title: 'somenfidb',
	imageUrl:"http://some-image/jpg",
	description:"knsdhuiriehhioehofnlk",
	organiser:"nknsdfnijfpot",
	venue:"grhththttyjytjyjjyt",
	stateId:1,
	address:"soidnodn",
	latitude:23.8896547,
	longitude:123.4728894,
	startDate:"",
	startTime:"11:34:07",
	endDate:"2018-10-10",
	endTime:"11:34:07",
	ticketDetails:[
		{
			ticketCategoryId:2,
			amount:100,
			quantity:5,
			ticketTypeId:2,
			other:""
		},
		{
			ticketCategoryId:2,
			amount:1000,
			quantity:5,
			ticketTypeId:3,
			other:""
		},
	],
    createdAt: Date.now(),
    updatedAt: Date.now()
};

export const eventWithNoStartTime = {

  title: 'somenfidb',
	imageUrl:"http://some-image/jpg",
	description:"knsdhuiriehhioehofnlk",
	organiser:"nknsdfnijfpot",
	venue:"grhththttyjytjyjjyt",
	stateId:1,
	address:"soidnodn",
	latitude:23.8896547,
	longitude:123.4728894,
	startDate:"2018-10-10",
	startTime:"",
	endDate:"2018-10-10",
	endTime:"11:34:07",
	ticketDetails:[
		{
			ticketCategoryId:2,
			amount:100,
			quantity:5,
			ticketTypeId:2,
			other:""
		},
		{
			ticketCategoryId:2,
			amount:1000,
			quantity:5,
			ticketTypeId:3,
			other:""
		},
	],
    createdAt: Date.now(),
    updatedAt: Date.now()
};

export const eventWithNoEndTime = {

  title: 'somenfidb',
	imageUrl:"http://some-image/jpg",
	description:"knsdhuiriehhioehofnlk",
	organiser:"nknsdfnijfpot",
	venue:"grhththttyjytjyjjyt",
	stateId:1,
	address:"soidnodn",
	latitude:23.8896547,
	longitude:123.4728894,
	startDate:"2018-10-10",
	startTime:"11:34:07",
	endDate:"2018-10-10",
	endTime:"",
	ticketDetails:[
		{
			ticketCategoryId:2,
			amount:100,
			quantity:5,
			ticketTypeId:2,
			other:""
		},
		{
			ticketCategoryId:2,
			amount:1000,
			quantity:5,
			ticketTypeId:3,
			other:""
		},
	],
    createdAt: Date.now(),
    updatedAt: Date.now()
};

export const eventWithNoEndDate = {

  title: 'somenfidb',
	imageUrl:"http://some-image/jpg",
	description:"knsdhuiriehhioehofnlk",
	organiser:"nknsdfnijfpot",
	venue:"grhththttyjytjyjjyt",
	stateId:1,
	address:"soidnodn",
	latitude:23.8896547,
	longitude:123.4728894,
	startDate:"2018-10-10",
	startTime:"11:34:07",
	endDate:"",
	endTime:"11:34:07",
	ticketDetails:[
		{
			ticketCategoryId:2,
			amount:100,
			quantity:5,
			ticketTypeId:2,
			other:""
		},
		{
			ticketCategoryId:2,
			amount:1000,
			quantity:5,
			ticketTypeId:3,
			other:""
		},
	],
    createdAt: Date.now(),
    updatedAt: Date.now()
};

export const eventWithNoTicketDetails = {

  title: 'somenfidb',
	imageUrl:"http://some-image/jpg",
	description:"knsdhuiriehhioehofnlk",
	organiser:"nknsdfnijfpot",
	venue:"grhththttyjytjyjjyt",
	stateId:1,
	address:"soidnodn",
	latitude:23.8896547,
	longitude:123.4728894,
	startDate:"2018-10-10",
	startTime:"11:34:07",
	endDate:"2018-10-10",
	endTime:"11:34:07",
	ticketDetails:"",
    createdAt: Date.now(),
    updatedAt: Date.now()
};


// export const reviewWithNoContent = {
//   comment: '',
//   recipeId: 1,
//   userId: 1
// };

// export const validVote = {
//   recipeId: 1,
//   userId: 1
// };

// export const validFavorite = {
//   recipeId: 1,
//   userId: 1
// };

// export const inValidRecipeId = {
//   recipeId: 453,
//   userId: 1
// };

// export const inValidUserId = {
//   recipeId: 1,
//   userId: 203
// };

export const userWithNoEmail = {
  firstName: 'Robinson',
  lastName: 'James',
  email: '',
  phone: '07067143161',
  password: '@Faker1',
  confirmPassword: 'Faker1@',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const userWithNoFirstName = {
  firstName: '',
  lastName: 'James',
  email: 'james@gmail.com',
  phone: '07067143161',
  password: 'jade@gmail.com',
  confirmPassword: 'jade@gmail.com',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const userWithNoLastName = {
  firstName: 'Robinson',
  lastName: '',
  email: 'james@gmail.com',
  phone: '07067143161',
  password: 'jade@gmail.com',
  confirmPassword: 'jade@gmail.com',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
export const userWithNoPassword = {
  firstName: 'Robinson',
  lastName: 'James',
  email: 'james@gmail.com',
  phone: '07067143161',
  password: '',
  confirmPassword: 'niceone',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const badEmail = {
  firstName: 'Robinson',
  lastName: 'James',
  email: 'james@',
  phone: '07067143161',
  password: 'Oti4live@',
  confirmPassword: 'niceone',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const duplicateEmail = {
  firstName: 'Robinson',
  lastName: 'James',
  email: 'ibravoh149@gmail.com',
  phone: '07067143161',
  password: 'Oti4live@',
  confirmPassword: 'niceone',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const checkPassword = {
  firstName: 'Robinson',
  lastName: 'James',
  email: 'james@gmail.com',
  phone: '07067143161',
  password: 'niceone',
  confirmPassword: 'niceone',
  image: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
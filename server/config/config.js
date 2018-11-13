const dotenv = require('dotenv');

dotenv.config();

const config = {
  "development": {
    "username":process.env.DEV_DB_USERNAME,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "dcdpzxei",
    "password": "tDrHpXo4Kf217Mut4Rpglx38CSo8KBil",
    "database": "dcdpzxei",
    "host": "elmer.db.elephantsql.com",
    "dialect": "postgres",
    "port":5432,
    // // "extra": {
    //   "ssl": true,
    // // },
    // use_env_variable: '',
    // dialect: 'postgres',
    logging: false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }

}

module.exports=config;
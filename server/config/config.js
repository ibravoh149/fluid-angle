const dotenv = require('dotenv');

dotenv.config();

const config = {
  "development": {
    "username":process.env.DEV_DB_USERNAME,
    "password": null,
    "database": process.env.DEV_DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
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
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
//  Name of database we want to connect to
 process.env.DB_NAME,
//  Which user do we want to connect as
  process.env.DB_USER,
//  What is the password of the user that we want to connect as
  process.env.DB_PASSWORD,
//  configuration object for the database we want to connect to
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);
module.exports = sequelize;
const { Sequelize } = require('sequelize');
const process = require('process');
require('dotenv').config(); // Load environment variables from .env file

// Create a Sequelize instance
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',          // Specify the database dialect
  logging: console.log,      // Set to false to disable logging, or use your custom logger
  define: {
    timestamps: false,       // Disable timestamps if not needed
  },
  pool: {
    max: 10,                  // Maximum number of connections in pool
    min: 0,                  // Minimum number of connections in pool
    acquire: 30000,          // Maximum time (in ms) to wait for a connection
    idle: 10000              // Maximum time (in ms) that a connection can be idle
  }
});

// Optionally, export the sequelize instance and connection test function
module.exports = {
  sequelize,
};

const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(

    // À compléter

);


sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((err) => console.log('Unable to connect to the database:', err));


module.exports = sequelize;
global.sequelize = sequelize;
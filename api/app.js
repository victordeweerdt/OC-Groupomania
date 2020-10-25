// Imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// Init serveur
const app = express();

require('dotenv').config();

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');


// Configure routes
app.use('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// BodyParser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;

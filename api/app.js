// Imports
const express = require('express');
const bodyParser = require('body-parser');

// Init serveur
const app = express();

// const postsRoutes = require('./routes/posts');
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

app.use('/api/', usersRoutes);

module.exports = app;

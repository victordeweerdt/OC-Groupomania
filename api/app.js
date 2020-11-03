// Imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// Init serveur
const app = express();

const cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments')


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

app.use(cors());
app.use(helmet());

app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/posts', commentsRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;

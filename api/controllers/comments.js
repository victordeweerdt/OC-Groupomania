// IMPORTS
const fs = require('fs');
const regex = /[a-zA-Z0-9 _.,'’(Ééèàû)&]+$/;
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models/index.js');

// const { hasUncaughtExceptionCaptureCallback } = require('process');
// const { REPL_MODE_SLOPPY } = require('repl');
// const { json } = require('sequelize/types');

// CONSTANTES
const db = require('../models/index.js');




// Poster un commentaire
exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    const Comments = db.Comments;
    const Users = db.Users;

    Users.findOne({
        where: {
            id: userId
        }
    })
    .then(user => res.status(200).json( user ))
    .catch(error => res.status(500).json( error ))

    const newComment = Comments.create({
        user_id: userId,
        post_id: req.params.id,
        content: req.body.commentContent
    })
    .then(newComment => res.status(200).json({ 'newComment': newComment, 'user': user }))
    .catch(error => res.status(500).json( error ))
};

exports.getAllComments = (req, res, next) => {
    
    const Comments = db.Comments;

    Comments.findAll({
        where: {
            post_id: req.params.id
        }
    }).then(comments => res.status(200).json( comments ))
    .catch(error => res.status(400).json({ error: "Pas de commentaires correspondants.", error: error }))
}

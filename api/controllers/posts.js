// IMPORTS
const fs = require('fs');
const regex = /[a-zA-Z0-9 _.,'’(Ééèàû)&]+$/;
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models/index.js');

// CONSTANTES
const db = require('../models/index.js');


// CRÉATION D'UN POST
exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    const User = db.Users;

    User.findOne({
        where: {
            id: userId
        }
    })
    .then(user => {
        if (user == null) {
            return res.status(400).json({ error: 'Utilisateur non trouvé !'});
        }
    })
    .catch(err => res.status(500).json({ err }));

    const Posts = db.Posts;

    if (!regex.test(Posts.content)) {
        return res.status(500).json({ error: 'Des caractères invalides se trouvent dans vos champs.' });
    } else {
        console.log('titi');
        const newPost = Posts.create({
            user_id: userId,
            content: req.body.content,
            attachments: req.body.content && req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
            comments: req.body.comments
        })
        .then(newPost => res.status(201).json( newPost ))
        .catch(error => res.status(400).json({ error }));
    }
};


// AFFICHER TOUS LES POSTS
exports.getAllPosts = (req, res, next) => {
    
    const Posts = db.Posts;

    Posts.findAll({
        order: sequelize.literal('updatedAt DESC'),
        include: [ {
            model:db.Users,
            attributes: ['firstName', 'lastName', 'photo']
        }, {
            model:db.Comments,
            include: {
                model:db.Users
            }
        } ]
    }).then(posts => res.status(200).json( posts ))
    .catch(error => res.status(400).json({ error: "Pas de publications correspondantes.", error: error }))
};


// Afficher un post
exports.getOnePost = (req, res, next) => {
    
    const Posts = db.Posts;

    Posts.findOne({
        where: {
            id: req.params.id
        },
        include: [ {
            model:db.Users,
            attributes: ['firstName', 'lastName', 'photo']
        }, {
            model:db.Comments,
            attributes: ['content', 'user_id']
        } ]
    }).then(post => res.status(200).json( post ))
    .catch(error => res.status(400).json({ error: "Pas de publication correspondante.", error: error }))
};


// Modifier un post
exports.modifyPost = (req, res, next) => {

    const Posts = db.Posts;

    Posts.update({
        content: req.body.content,
        attachments: req.body.attachments,
        comments: req.body.comments},
        {where: { id: req.params.id }
    })
    .then(newPost => res.status(200).json( {message: 'Post mis à jour!'}, newPost ))
    .catch(error => json.status(500).json( error ))
};


// Supprimer un post
exports.deletePost = (req, res, next) => {

    const Posts = db.Posts;

    Posts.findOne({
        where: {
            id: req.params.id
        }
    }).then(post => {
        if (post.attachments !== null) {
            const filename = post.attachments.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => { // Je supprimer l'image en lien grâce à la méthode unlink du package fs
            Posts.destroy({ where: {id: req.params.id} }) // On supprime l'objet
                .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                .catch(error => res.status(400).json({ error }));
            });
        }
        Posts.destroy({ where: {id: req.params.id} }) // On supprime l'objet
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error: "Pas de publication correspondante.", error: error }))

};
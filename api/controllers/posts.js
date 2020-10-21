const fs = require('fs');
const regex = /[a-zA-Z0-9 _.,'’(Ééèàû)&]+$/;
const jwt = require('jsonwebtoken');


const db = require('../models/index.js');
const users = require('../models/users.js');


// Création d'un post
exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    console.log(userId);

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

    const Posts = db.Posts;
    
    if (!regex.test(Posts.content)) {
        return res.status(500).json({ error: 'Des caractères invalides se trouvent dans vos champs.' });
    } else {
        const post = new Posts({ // Je crée ensuite mon nouveau post
            user_id: userId,
            content: req.body.content,
            attachments: req.body.attachments,
            comments: "",
        });
        post.save() // J'enregistre mon post
        .then(() => res.status(201).json({ message: 'Post créé !' }))
        .catch(error => res.status(400).json({ error }));
    }
  };
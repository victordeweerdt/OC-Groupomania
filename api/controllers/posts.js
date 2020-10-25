// IMPORTS
const fs = require('fs');
const regex = /[a-zA-Z0-9 _.,'’(Ééèàû)&]+$/;
const jwt = require('jsonwebtoken');
const { REPL_MODE_SLOPPY } = require('repl');
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
        const newPost = Posts.build({
            user_id: userId,
            content: req.body.content,
            attachments: req.body.attachments
        })
        console.log(newPost);
        // post.save() // J'enregistre mon post
        // .then(() => res.status(201).json({ message: 'Post créé !' }))
        // .catch(error => res.status(400).json({ error }));
    }
  };



  // AFFICHER TOUS LES POSTS
  exports.getAllPosts = (req, res, next) => {
      
      const Posts = db.Posts;

      Posts.findAll({
          order: sequelize.literal('updatedAt DESC'),
          include: {
              model: db.Users,
              attributes: ['email']
          }
      }).then(messages => res.status(200).json(messages))
      .catch(error => res.status(400).json({ error: "Pas de publications correspondantes.", error: error }))
  };
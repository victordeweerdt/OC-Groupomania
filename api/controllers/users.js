// On déclare les plugins que nous allons utiliser

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/index.js');

// Import du model User

const Users = require('../models/users');

//Je crée la fonction qui va concerner mon inscription
exports.signup = (req, res, next) => {

  const Users = db.Users;

    bcrypt.hash(req.body.password, 10) // je hash mon mot de passe et le sale 10 fois
      .then(hash => {
            const user = new Users({ // Je crée ensuite mon nouvelle utilisateur
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: req.body.email,
            password: hash,
            permission: req.body.permission,
            photo: null
        });

        user.save() // J'enregistre mon utilisateur
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {

  const Users = db.Users;

  Users.findOne({ 
    where: { 
      email: req.body.email 
    }
  }) // Je récupère l'adresse mail saisie
    .then(user => {
      if (!user) { // Je cherche si un tulisateur correspondant existe dans ma DB
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // Je cherche ensuite si le mot de passe associé crypté, peut correspondre au mot de passe crypté de ma DB
        .then(valid => {
          if (!valid) {
            console.log('good');
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ // On va créer ici un token avec le package jwt
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'NEW_TOKEN',
              { expiresIn: '24h' }
              )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
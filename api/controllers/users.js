// On déclare les plugins que nous allons utiliser

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import du model User

const User = require('../models/users');

// Je crée la fonction qui va concerner mon inscription

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // je hash mon mot de passe et le sale 10 fois
      .then(hash => {
            const user = new User({ // Je crée ensuite mon nouvelle utilisateur
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: req.body.email,
            password: hash,
            permission: true,
            photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

        });
        user.save() // J'enregistre mon utilisateur
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
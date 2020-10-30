// PLUGINS UTILISÉS
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index.js');

// CONSTANTES
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;




// INSCRIPTION D'UN USER
exports.signup = (req, res, next) => {

  const lastname = req.body.lastName;
  const firstname = req.body.firstName;
  const email = req.body.email;
  const password = req.body.password;

  if (lastname == null || firstname == null || email == null || password == null) {
    return res.status(400).json({ error: "Vous n'avez pas rempli tous les champs obligatoires."})
  } else if (password.length <= 5) {
    return res.status(400).json({ error: "Mot de passe trop court."})
  } else if (password.length >= 15) {
    return res.status(400).json({ error: "Mot de passe trop long."})
  } else if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Email non valide." })
  }
  
  const Users = db.Users;

    bcrypt.hash(req.body.password, 10) // je hash mon mot de passe et le sale 10 fois
      .then(hash => {
            const user = new Users({ // Je crée ensuite mon nouvelle utilisateur
            lastName: lastname,
            firstName: firstname,
            email: email,
            password: hash,
            permission: false,
            photo: null
        });

        user.save() // J'enregistre mon utilisateur
          .then(user => res.status(201).json( user ))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};




// CONNEXION D'UN USER EXISTANT
exports.login = (req, res, next) => {

  const Users = db.Users;

  Users.findOne({ 
    where: { 
      email: req.body.email 
    }
  }) // Je récupère l'adresse mail saisie
    .then(user => {
      console.log(user);
      if (!user) { // Je cherche si un tulisateur correspondant existe dans ma DB
        return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // Je cherche ensuite si le mot de passe associé crypté, peut correspondre au mot de passe crypté de ma DB
        .then(valid => {
          if (!valid) {
            return res.status(400).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ // On va créer ici un token avec le package jwt
            user,
            token: jwt.sign(
              { userId: user.id },
              process.env.SECRET_TOKEN,
              { expiresIn: '24h' }
              )
          });
          console.log(user._id);
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};




// SUPPRESSION D'UN USER
exports.delete = (req, res, next) => {

  const Users = db.Users;

  Users.destroy({ 
    where: { 
      id: req.params.id
    }
  })
  .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
  .catch(error => res.status(500).json({ error }));
};




// AFFICHAGE D'UN USER
exports.getOneUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // On récupère tout ce qui se trouve après l'espace dans le header
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); // On le décode
  const userId = decodedToken.userId;

  const Users = db.Users;

  Users.findOne({ 
    attributes: [ 'id', 'firstName', 'lastName', 'email', 'photo' ],
    where: { id: userId },
  })
  .then((user) => res.status(200).json({ user }))
  .catch(error => res.status(500).json({ error }));
};




// MODIFICATION D'UN USER
exports.modifyUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; // On récupère tout ce qui se trouve après l'espace dans le header
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); // On le décode
  const userId = decodedToken.userId;

  const Users = db.Users;

  Users.update({ 
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email},
    {where: { id: userId }
  })
  .then(() => { res.status(201).json({ message: "Utilisateur modifié avec succès." })})
  .catch(error => res.status(500).json({ error }));
};


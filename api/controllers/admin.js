const db = require('../models/index.js');



// GET TOUS LES UTILISATEURS
exports.getAllUsersAdmin = (req, res, next) => {
    const Users = db.Users;

    Users.findAll()
        .then(users => res.status(200).json( users ))
        .catch(error => res.status(400).json( error ))
};



// GET UN UTILISATEUR
exports.getOneUserAdmin = (req, res, next) => {
    const Users = db.Users;
    console.log('titi')

    Users.findOne({ 
        attributes: [ 'id', 'firstName', 'lastName', 'email', 'photo', 'permission' ],
        where: { id: req.params.id },
    })
    .then((user) => res.status(200).json({ user }))
    .catch(error => res.status(500).json({ error }));
}



// SUPPRIMER UN UTILISATEUR
exports.deleteOneUserAdmin = (req, res, next) => {
    const Users = db.Users;
    const Posts = db.Posts;
    const Comments = db.Comments;

    Comments.destroy({
        where: {
        user_id: req.params.id
        }
    })
    
    Posts.destroy({
        where: {
        user_id: req.params.id
        }
    })

    Users.destroy({ 
        where: { 
        id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
    .catch(error => res.status(500).json({ error }));
}



// MODIFIER UN UTILISATEUR
exports.modifyUserAdmin = (req, res, next) => {
  
    const Users = db.Users;
    Users.update({ 
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      permission: req.body.permission
    },
      {where: { id: req.params.id }
    })
    .then(() => { res.status(201).json({ message: "Utilisateur modifié avec succès." })})
    .catch(error => res.status(500).json({ error }));
  };
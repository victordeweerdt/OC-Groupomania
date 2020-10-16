// On déclare notre framework Express

const express = require('express');
const router = express.Router();

// On fait le lien avec notre controller

const userCtrl = require('../controllers/users');

// Puis on crée nos différentes routes liées aux utilisateurs
// En spécifiant qu'on a uniquement à faire ici à des requètes de type POST

router.post('/users/signup', userCtrl.signup);
router.post('/users/login', userCtrl.login);
// router.delete('/:id', userCtrl.delete);

// On exporte le module.

module.exports = router;
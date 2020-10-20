// On déclare notre framework Express

const express = require('express');
const router = express.Router();

// On fait le lien avec notre controller

const userCtrl = require('../controllers/users');

const auth = require('../middleware/auth');

// Puis on crée nos différentes routes liées aux utilisateurs
// En spécifiant qu'on a uniquement à faire ici à des requètes de type POST

router.post('/users/signup', userCtrl.signup);
router.post('/users/login', userCtrl.login);
router.delete('/users/:id', userCtrl.delete);
router.get('/users/:id', auth, userCtrl.getOneUser);

// On exporte le module.

module.exports = router;
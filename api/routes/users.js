// On déclare notre framework Express

const express = require('express');
const router = express.Router();

// On fait le lien avec notre controller

const userCtrl = require('../controllers/users');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Puis on crée nos différentes routes liées aux utilisateurs
// En spécifiant qu'on a uniquement à faire ici à des requètes de type POST

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/me/', userCtrl.modifyUser);
router.delete('/:id', userCtrl.delete);
router.get('/me/', auth, userCtrl.getOneUser);

// On exporte le module.

module.exports = router;
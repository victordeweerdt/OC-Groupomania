// On déclare notre framework Express

const express = require('express');
const router = express.Router();

// On déclare les middlewares qu'on va utiliser dans ce fichier

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const admin = require('../middleware/admin');

// On fait le lien avec notre controller

const adminCtrl = require('../controllers/admin');

// Puis on crée nos différentes routes liées aux sauces
// En spécifiant les types de requètes (POST, GET, PUT & DELETE)

router.get('/users', admin, adminCtrl.getAllUsersAdmin);
router.get('/users/:id', admin, adminCtrl.getOneUserAdmin);
router.delete('/users/:id', admin, adminCtrl.deleteOneUserAdmin);
router.put('/users/:id', admin, adminCtrl.modifyUserAdmin);

// On exporte le module.

module.exports = router;
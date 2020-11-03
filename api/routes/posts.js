// On déclare notre framework Express

const express = require('express');
const router = express.Router();

// On déclare les middlewares qu'on va utiliser dans ce fichier

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// On fait le lien avec notre controller

const postCtrl = require('../controllers/posts');

// Puis on crée nos différentes routes liées aux sauces
// En spécifiant les types de requètes (POST, GET, PUT & DELETE)

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, postCtrl.createPost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

// On exporte le module.

module.exports = router;
// On déclare notre framework Express

const express = require('express');
const router = express.Router();

// On déclare les middlewares qu'on va utiliser dans ce fichier

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// On fait le lien avec notre controller

const commentCtrl = require('../controllers/comments');

// Puis on crée nos différentes routes liées aux sauces
// En spécifiant les types de requètes (POST, GET, PUT & DELETE)

router.post('/:id/comments', auth, commentCtrl.createComment);
router.get('/:id/comments', auth, commentCtrl.getAllComments);
router.delete('/:post_id/comments/:id', commentCtrl.deleteComments);

// On exporte le module.

module.exports = router;
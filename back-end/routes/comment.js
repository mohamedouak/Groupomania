const express = require('express');
const commentsCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const edditComment = require('../middleware/edditComment');

// Utilisation d'un router
const router = express.Router();

// Création des routes commentaires
router.get('/:postId', auth, commentsCtrl.getCommentsByPost);
router.post('/', auth, commentsCtrl.newComment);
router.delete('/:id', auth, edditComment, commentsCtrl.deleteComment);

module.exports = router;
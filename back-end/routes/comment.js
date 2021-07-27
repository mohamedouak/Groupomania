const express = require('express');
const commentsCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

// Utilisation d'un router
const router = express.Router();

// Création des routes commentaires
router.get('/:postId', auth, commentsCtrl.getCommentsByPost);
router.get('/', auth, commentsCtrl.getAllComments);
router.post('/', auth, commentsCtrl.newComment);
router.put('/:id', auth, commentsCtrl.updateComment);
router.delete('/:id', auth, commentsCtrl.deleteComment);

module.exports = router;
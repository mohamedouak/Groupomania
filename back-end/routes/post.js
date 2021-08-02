const express = require('express');
const postsCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const edditPost = require('../middleware/edditPost');

router.post('/', auth, multer, postsCtrl.createPost);
router.get('/:id', auth, postsCtrl.getOnePost);
router.get('/', auth, postsCtrl.getAllPosts)
router.put('/:id', auth, multer, edditPost, postsCtrl.updatePost);
router.delete('/:id', auth, edditPost, postsCtrl.deletePost);

module.exports = router;
const express = require('express');
const postsCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

router.post('/', auth, multer, postsCtrl.createPost);
router.get('/:id', auth, postsCtrl.getOnePost);
router.get('/', auth, postsCtrl.getAllPosts)
router.put('/:id', auth, multer, postsCtrl.updatePost);
router.delete('/:id', auth, postsCtrl.deletePost);

module.exports = router;
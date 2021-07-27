const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/user');


// Création des routes utilisateur
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.delete('/:id', usersCtrl.deleteAccount);
router.get('/:id', usersCtrl.getOneUser);
router.get('/', usersCtrl.getAllUsers);
router.post('/jwt', usersCtrl.getUserByJwt);

module.exports = router;
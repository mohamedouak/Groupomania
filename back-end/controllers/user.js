const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Post, Comment} = require('../sequelize');

const schema = new passwordValidator;

// Spécification des règles à respecter pour la création du mot de passe
schema
.is().min(8)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.has().not().symbols()

// Création d'un nouvel utilisateur
exports.signup = (req, res) => {
    console.log(req.body);
    if (!req.body.email || !req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Tous les champs doivent être remplis' });
    }

    if (emailValidator.validate(req.body.email)) {
        if(schema.validate(req.body.password)) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = {
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                    };
                    User.create(user)
                        .then(user => {
                            res.status(201).json('Utilisateur crée');
                        })
                        .catch(error => res.status(400).json({ error }));
                    })
                .catch(error => res.status(500).json({ error }));
        } else {
            res.status(401).json({ error: "Le mot de passe doit contenir au minimum 8 caractères, comprendre au moins un caractère majuscule, un caractère minuscule et un chiffre et ne doit pas contenir d'espace ni de caractères spéciaux" });
        }
    } else {
        res.status(401).json({ error: 'E-mail invalide' });
    }
};

// Connexion de l'utilisateur à son compte
exports.login = (req, res) => {
    console.log(req);
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Tous les champs doivent être remplis' });
    }
    
    if (schema.validate(req.body.password)) {
        User.findOne({ where: { username: req.body.username } })
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                res.status(401).json({ error: 'Mot de passe incorrect' });
                            } else {
                                res.status(200).json({
                                    token: jwt.sign({ userId: user.id }, '7fa4efcef04a839925bf05fb227487cc', { expiresIn: '24h' }) 
                                });
                            }
                        })
                        .catch(error => res.status(500).json({ error }));
                } else {
                    res.status(401).json({ error: 'Connexion refusée' });
                }
            })
            .catch(error => res.status(500).json({ error }))
    } else {
        res.status(401).json({ error: 'Mot de passe incorrect' });
    }
};

exports.deleteAccount = (req, res) => {
    const id = req.params.id;
    User.destroy({where: {id:id}})
    .then(user => {
        if(user){
            res.status(200).json({
                message: 'Utilisateur supprimé'
            });
        }else{
            res.status(404).json({
                message: 'Utilisateur non trouvé'
            })
        }
    })
    .catch(error => {
        res.status(500).json ({
            message: 'Utilisateur non supprimé',
            error: error
        })
    })
};

exports.getOneUser = (req, res) => {
    const id = req.params.id
    User.findOne({
        where: {id:id}
    })
    .then(user => {
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({
                message: 'Utilisateur non trouvé'
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: error
        })
    })
};

exports.getAllUsers = (req, res) => {
	User.findAll()
		.then((users) => res.status(200).json({
			users            
		}))
		.catch((err) => res.status(401).json({
			err
		}));
};

exports.getUserByJwt = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '7fa4efcef04a839925bf05fb227487cc');
    const userId = decodedToken.userId;
    if (userId) {
        User.findOne({
            where:{id:userId}
        })
        .then(user => {
            if(user){
                res.status(200).json(user);
            }else{
                res.status(404).json({
                    message: 'Utilisateur non trouvé'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        })
    }
    
};


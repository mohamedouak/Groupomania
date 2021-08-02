const jwt = require('jsonwebtoken');
const {User, Comment} = require('../sequelize');
require('dotenv').config();

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    let userId = decodedToken.userId;


    Comment.findOne({ where : { id : req.params.id }})
    .then((comment)=> {
        const commentUserId = comment.userId;

        User.findOne({
            where: { id: userId }
        })
        .then((user) => {
            if (userId === commentUserId || user.isAdmin === 1) {
                next();
            } else {
                res.status(401).json({ message: "L'utilisateur ne peut pas supprimer ce commentaire"});
            }
        })
        .catch((err)=> {res.status(404).json({ message: "Utilisateur non trouvé", err }); })
    })
    .catch((err) => {res.status(401).json({ error });})
}
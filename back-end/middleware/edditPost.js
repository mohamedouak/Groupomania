const jwt = require('jsonwebtoken');
const {User, Post} = require('../sequelize');
require('dotenv').config();

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    let userId = decodedToken.userId;


    Post.findOne({ where : { id : req.params.id }})
    .then((post)=> {
        const postUserId = post.userId;

        User.findOne({
            where: { id: userId }
        })
        .then((user) => {
            if (userId === postUserId || user.isAdmin === 1) {
                next();
            } else {
                res.status(401).json({ message: "L'utilisateur n'a pas accés à cette fonction"});
            }
        })
        .catch((err)=> {res.status(404).json({ message: "Utilisateur non trouvé", err }); })
    })
    .catch((err) => {res.status(401).json({ error });})
}
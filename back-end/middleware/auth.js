//Token d'authentification 
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Fonction qui gère l'authentification
module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'User id non valide';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: 'Requête non authentifiée !'
      });
    }
  };
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUserIdByJwt = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    return userId
}
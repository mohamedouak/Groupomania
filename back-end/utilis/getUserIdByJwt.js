const jwt = require('jsonwebtoken');

exports.getUserIdByJwt = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '7fa4efcef04a839925bf05fb227487cc');
    const userId = decodedToken.userId;
    return userId
}
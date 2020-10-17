// On déclare le plugin qui nous intéresse

const jwt = require('jsonwebtoken');

// On crée le middleware qui va authentifié 
// le token présent dans notre header

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'NEW_TOKEN');
        const userId = decodedToken.userId;

        console.log(userId)

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            req.userId = userId
            next();
        }
    } catch (error) {

      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
};
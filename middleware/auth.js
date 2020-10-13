
const jwt = require('jsonwebtoken');
const config = require('config');


function auth(req, res, next) {
    const token  = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No auth token provided');


    try {
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      console.log('token: ',decoded);
      req.user = decoded;
      next();
    } 
    catch(ex) {
        console.log('an error occured while verifying token:',ex);
        res.status(400).send('invalid token');
    }
};

module.exports = auth;
const winston = require('winston');

module.exports = function (err, req, res, next) {
    console.error('an error occured in a route',err);
    
    //possible logging levels for winston:
    //error
    //warn
    //info
    //verbose
    //debug
    //silly

    winston.error(err.message, err);
    res.status(500).send('Something failed: ' + err.message);
};
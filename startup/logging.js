
require('express-async-errors'); //monkey pathes the routes with error catching
const { transports } = require('winston');
const winston = require('winston');

module.exports = function () {
    
    winston.add(new winston.transports.File({filename: 'vidly.log', handleExceptions: true, handleRejections: true }));
    winston.add(new winston.transports.Console({
        format: winston.format.combine(
                            winston.format.colorize(),
                            winston.format.simple()),
        handleExceptions: true,
        handleRejections: true
    }));
};
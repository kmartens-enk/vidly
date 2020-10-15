const winston = require('winston');
const config = require('config');
const express = require("express");
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/db')();
require('./startup/validation')();
require('./startup/prod')(app);
//start webservice
const port = config.get('port');
const server = app.listen(port, () => winston.info(`Listening on port ${port}`));

module.exports = server;

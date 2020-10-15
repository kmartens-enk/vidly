
const winston = require('winston');
const mongoose = require("mongoose");
const config = require('config');


module.exports = function () {
    const db = config.get('connectionString');
    //connect to db
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => winston.info(`Connected to mongodb ${db}...`));
};

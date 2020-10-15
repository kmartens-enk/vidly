const express = require("express");
const genresRoute = require("../routes/genres");
const customersRoute = require("../routes/customers");
const moviesRoute = require('../routes/movies');
const rentalsRoute = require('../routes/rentals');
const userRoute = require('../routes/users');
const homepage = require("../routes/home");
const authRoute = require('../routes/auth');
const errorHandler = require('../middleware/error');



module.exports = function (app) {

    //app.use(express.json());
    //setup express middleware for views
    //app.set("view engine", "pug");
    //app.set("views", "./views");
    //Setup routes
    app.use("/api/genres", genresRoute);
    app.use("/api/customers", customersRoute);
    app.use('/api/movies', moviesRoute);
    app.use('/api/rentals', rentalsRoute);
    app.use('/api/users', userRoute);
    app.use('/api/auth', authRoute);
    app.use("/", homepage);
    //define error handling middleware
    app.use(errorHandler);

}
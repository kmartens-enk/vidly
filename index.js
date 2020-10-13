require('express-async-errors'); //monkey pathes the routes with error catching
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const genresRoute = require("./routes/genres");
const customersRoute = require("./routes/customers");
const moviesRoute = require('./routes/movies');
const rentalsRoute = require('./routes/rentals');
const userRoute = require('./routes/users');
const homepage = require("./routes/home");
const authRoute = require('./routes/auth');
const errorHandler = require('./middleware/error');
const mongoose = require("mongoose");
const express = require("express");
const app = express();

if ( !config.get('jwtPrivateKey') ) {
  console.error('FATAL ERROR: jwtPrivateKey not defined');
  process.exit(1);

}

//setup express middleware
app.use(express.json());
app.set("view engine", "pug");
app.set("views", "./views");
//app.use(authenticator);

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

//connect to db
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb", error));

//start webservice
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));

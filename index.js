const genresRoute = require("./routes/genres");
const customersRoute = require("./routes/customers");
const moviesRoute = require('./routes/movies');
const homepage = require("./routes/home");
const authenticator = require("./middleware/authenticator");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

//setup express middleware
app.use(express.json());
app.set("view engine", "pug");
app.set("views", "./views");
//app.use(authenticator);

//Setup routes
app.use("/api/genres", genresRoute);
app.use("/api/customers", customersRoute);
app.use('/api/movies', moviesRoute);
app.use("/", homepage);

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

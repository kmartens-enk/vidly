

const genresRoute = require('./routes/genres');
const homepage = require('./routes/home');
const authenticator = require('./middleware/authenticator');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//setup express middleware
app.use(express.json());
app.set('view engine', 'pug');
app.set('views','./views');
//app.use(authenticator);

//Setup routes
app.use('/api/genres', genresRoute);
app.use('/', homepage);

//connect to db
mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to mongodb...'))
  .catch( err => console.error('could not connect to mongodb', error));
  
//start webservice
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));



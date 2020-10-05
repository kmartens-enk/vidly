

const genresRoute = require('./routes/genres');
const homepage = require('./routes/home');
const authenticator = require('./middleware/authenticator');
const express = require('express');
const app = express();

app.use(express.json());


app.set('view engine', 'pug');
app.set('views','./views');

//app.use(authenticator);

app.use('/api/genres', genresRoute);
app.use('/', homepage);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

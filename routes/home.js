
const express = require('express');
const router = express.Router();
const app = express();


router.get('/', (req, res) => {
    res.render('index', {title: "Vidly", message: "Welkom to vidly"});
});

module.exports = router;
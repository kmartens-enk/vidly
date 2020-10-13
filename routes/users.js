
const {User, validateUser} = require('../models/user');
const _ = require('lodash');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if user already registered
    let user = await User.findOne({ email : req.body.email });
    if (user) return res.status(400).send('user already registered');
    user = new User(_.pick(req.body, ['name','email','password']));

    await user.save();

    const webtoken = user.generateAuthToken();
    res.header('x-auth-token', webtoken).send(_.pick(user, ['_id','name', 'email']));
});

module.exports = router;

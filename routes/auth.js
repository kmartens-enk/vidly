
const {User} = require('../models/user');
const Joi = require('Joi');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //authenticate user
    let user = await User.findOne({ email : req.body.email });
    if ((!user) || (!await user.isValidPassword(req.body.password))) return res.status(400).send('invalid user-email or password');

    //return the webtoken
    const webtoken = user.generateAuthToken();
    res.send(webtoken);
});

function validateUser(req) {
    const schema = Joi.object({
        email : Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(req);
};

module.exports = router;
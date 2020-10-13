const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        name: { 
            type: String,
            minlength: 3,
            maxlength: 50,
            required: true
            },
        email: {
            type: String,
            minlength: 5,
            maxlength: 255,
            require: true,
            unique: true
        },
        password: {
            type: String,
            minlength: 5,
            maxlength: 1024,
            required: true
        },
        isAdmin: {
            type: Boolean
        }
    }
);

userSchema.methods.generateAuthToken = function() {
    return jwt.sign( 
        {
            _id: this._id, 
            isAdmin: this.isAdmin 
        },
        config.get('jwtPrivateKey')
    );
}

userSchema.methods.hashPassword = async function( password ) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
}

userSchema.methods.isValidPassword = async function( password ) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('user', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name : Joi.string().min(3).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    const result = schema.validate(user);
    return result;
};

module.exports.User = User;
module.exports.validateUser = validateUser;
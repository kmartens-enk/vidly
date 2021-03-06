const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: { type: String,
            minlength: 3,
            required: true
        }});

const Genre = mongoose.model('genre', genreSchema);

function validateGenre(genre) {
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    const result = schema.validate(genre);
    return result;
};

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;
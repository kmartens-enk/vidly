
const Joi = require('joi');
const {genreSchema} = require('./genre');
const mongoose = require('mongoose');

const Movie = mongoose.model('movie', mongoose.Schema({
    title: { 
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true        
    },
    genre: { 
        type: genreSchema,
        required: true
    },
    numberInStock: { 
        type: Number,
        min: 0,
        max: 200
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 200
    }
}));

function validateMovie(movie) {
    const schema = Joi.object({
        title : Joi.string().required(),
        genreId : Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });
    const result = schema.validate(movie);
    return result;    
};

exports.Movie = Movie;
exports.validateMovie = validateMovie;
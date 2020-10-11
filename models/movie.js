
const Joi = require('joi');
const mongoose = require('mongoose');

const Movie = mongoose.model('movie', genreSchema = mongoose.Schema({
    title: { 
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true        
    },
    genre: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genre',
        required: true,
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
        title : Joi.string().min(3).max(255).required(),
        genre : Joi.ObjectId().required()
    });
    const result = schema.validate(movie);
    return result;    
};

exports.Movie = Movie;
exports.validateMovie = validateMovie;
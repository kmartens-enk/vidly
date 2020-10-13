const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('rental', mongoose.Schema({
    customer : { 
        type: mongoose.Schema({
            name: {type: String, minlength: 3, maxlength:255},       
            isGold: Boolean,
            phoneNumber: String     
        }),
        required: true
    },
    movie: {
        type: mongoose.Schema({
            title: {type: String, required: true},
            dailyRentalRate: {type: Number, min: 0, max: 200},
        }),
        required: true
    },
    dateOut: {type: Date, default: Date.Now, required: true},
    dateReturned: {type: Date}
}));

function validateRental(rental) {
    const schema = Joi.object({
        customerId : Joi.objectId().required(),
        movieId : Joi.objectId().required()
    });
    const result = schema.validate(rental);
    return result;
}

exports.Rental = Rental;
exports.validateRental = validateRental;

const {Movie, validateMovie} = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
})

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie with id not found');
    res.send(movie);
})

router.put('/:id', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.body.id;
    const movie = await Movie.findByIdAndUpdate( 
        id, 
        { title: req.body.title,
          genre: req.body.genre,
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate 
        }, 
        { new: true}
    );
                
    if (!movie) return res.status(404).send(`Movie with id ${id} not found`);
    res.send(movie);
    
});

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const movie = new Movie({
        title : req.body.title,
        genre : req.body.genre,
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate 
    });
    res.send(movie);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const movie = Movie.findByIdAndRemove( id );
    if (!movie) return res.status(404).send(`Movie with id ${id} not found`);
    res.send(movie);
})

module.exports = router;
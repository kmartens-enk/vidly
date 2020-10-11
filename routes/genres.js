
const {Genre, validateGenre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    Genre.find({}, (err, genres) => {
        if (err) return res.status(500).send('Could not retrieve genres: '+err.message);
        res.send(genres);
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Genre.findById(id, (err, genre) => {
        if (err) return res.status(500).send('could not retrieve genre: '+err.message);
        if (!genre) return res.status(404).send(`genre with id ${id} not found`);
        res.send(genre);
    });
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre( req.body );
    genre.save( (err, savedGenre) => {
        if (err) return res.status(400).send('Could not save genre: '+err.message);
        res.send(savedGenre);
    })
});

router.put('/:id', async (req, res) => {

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.params.id;
    const genre = await Genre.findByIdAndUpdate(id, {name: req.body.name}, { new: true });
    if (!genre) return res.status(404).send(`genre with id ${id} not found`);

    res.send(genre);
});

router.delete('/:id', (req, res) => {
    //find the give id
    const id = req.params.id;
    Genre.findByIdAndRemove(id, (err, genre) => {
        if (err) return res.status(500).send('could not delete genre: ', err.message);
        if (!genre) return res.status(404).send(`genre with id ${id} not found`);
        res.send(genre);
    });
});

module.exports = router;
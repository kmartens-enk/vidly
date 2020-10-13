
const {Genre, validateGenre} = require('../models/genre');
const mongoose = require('mongoose');
const _ = require('lodash');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send(`genre with id ${id} not found`);
    res.send(genre);
    
});

router.post('/', auth, async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre( _.pick(req.body,['name'] ));
    await genre.save();
    res.send(genre);
    
});

router.put('/:id', auth, async (req, res) => {

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.params.id;
    const genre = await Genre.findByIdAndUpdate(id, {name: req.body.name}, { new: true });
    if (!genre) return res.status(404).send(`genre with id ${id} not found`);

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {   
    //find the give id
    const id = req.params.id;
    const genre = await Genre.findByIdAndRemove(id);
    if (!genre) return res.status(404).send(`genre with id ${id} not found`);
    res.send(genre);
});

module.exports = router;
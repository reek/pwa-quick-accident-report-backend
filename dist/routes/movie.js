"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const movie_1 = require("../models/movie");
exports.movieRouter = express.Router()
    .get('/', (req, res) => {
    movie_1.movieModel.find()
        .then((movies) => res.json({ movies }))
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})
    .get('/:id', (req, res) => {
    movie_1.movieModel.findById(mongoose.Types.ObjectId(req.param('id')))
        .then((movie) => {
        if (movie)
            res.json({ movie });
        else
            res.status(404).json({ code: 404, message: 'Movie not found' });
    })
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})
    .post('/', (req, res) => {
    const movie = new movie_1.movieModel(req.body);
    movie.validate()
        .then(() => movie.save())
        .then((movie) => res.json({ movie }))
        .catch(err => {
        console.error(err);
        res.status(500).json({ code: 500, message: 'Internal server error' });
    });
})
    .put('/:id', (req, res) => {
    movie_1.movieModel.findByIdAndUpdate(mongoose.Types.ObjectId(req.param('id')), { $set: req.body }, { new: true })
        .then((movie) => {
        if (movie)
            res.json({ movie });
        else
            res.status(404).json({ code: 404, message: 'Movie not found' });
    })
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
})
    .delete('/:id', (req, res) => {
    movie_1.movieModel.findByIdAndDelete(mongoose.Types.ObjectId(req.param('id')))
        .then((movie) => {
        if (movie)
            res.json({ movie });
        else
            res.status(404).json({ code: 404, message: 'Movie not found' });
    })
        .catch(err => res.status(500).json({ code: 500, message: 'Internal server error', err }));
});

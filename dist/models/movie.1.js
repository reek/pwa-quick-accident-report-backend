"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1850,
    },
    language: {
        type: String,
        required: false
    },
});
exports.movieModel = mongoose.model('movies', exports.movieSchema);

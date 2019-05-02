"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.movieAuthorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    movies: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'movies'
        }]
});
exports.movieAuthorModel = mongoose_1.model('movie-authors', exports.movieAuthorSchema);

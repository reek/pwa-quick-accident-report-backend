"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        maxlength: 128
    },
    city: {
        type: String,
        required: true,
        maxlength: 50
    },
    state: {
        type: String,
        required: true,
        maxlength: 50
    },
    postcode: {
        type: String,
        required: true,
        maxlength: 20
    },
    country: {
        type: String,
        required: true,
        maxlength: 50
    },
    longitude: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    }
});

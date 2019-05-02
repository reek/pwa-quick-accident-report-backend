"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const address_1 = require("./address");
exports.accidentImagesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});
exports.accidentSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    address: address_1.addressSchema,
    images: [exports.accidentImagesSchema],
    description: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    contacts: {
        type: String,
        required: false
    }
});

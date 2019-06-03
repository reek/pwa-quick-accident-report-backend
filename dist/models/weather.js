"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.weatherSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: false
    },
    forecast: {
        type: String,
        required: false
    },
    temperature: {
        type: String,
        required: false
    },
    pressure: {
        type: String,
        required: false
    },
    humidity: {
        type: String,
        required: false
    },
    visibility: {
        type: String,
        required: false
    },
    wind: {
        type: String,
        required: false
    }
});

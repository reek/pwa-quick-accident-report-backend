"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 50
    },
    password: {
        type: Number,
        required: true,
        min: 6,
    },
    profile: {
        type: Object,
        required: true
    },
    vehicles: {
        type: Array,
        required: true
    },
    incidents: {
        type: Array,
        required: true
    }
});
exports.userModel = mongoose.model('users', exports.userSchema);

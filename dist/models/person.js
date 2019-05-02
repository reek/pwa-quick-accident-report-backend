"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const moment = require("moment");
const birthDateValidator = (date) => {
    const m = moment(date);
    return m.diff(moment().subtract(18, 'year')) > 18;
};
exports.personSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 50,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 50,
    },
    money: {
        type: Number,
        required: false,
        min: 1,
    },
    birthDate: {
        type: Date,
        required: true,
        validate: [birthDateValidator, 'Person must 18 years old']
    }
});
exports.personModel = mongoose.model('people', exports.personSchema);

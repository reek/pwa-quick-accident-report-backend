"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const address_1 = require("./address");
var EGender;
(function (EGender) {
    EGender["MALE"] = "male";
    EGender["FEMALE"] = "female";
})(EGender = exports.EGender || (exports.EGender = {}));
exports.personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50
    },
    birthDate: {
        type: String,
        required: true,
        maxlength: 50
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
    drivingLicense: {
        type: String,
        required: true,
        maxlength: 50
    },
    address: address_1.addressSchema
});

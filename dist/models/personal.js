"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const address_1 = require("./address");
var EGender;
(function (EGender) {
    EGender[EGender["MALE"] = 0] = "MALE";
    EGender[EGender["FEMALE"] = 1] = "FEMALE";
})(EGender = exports.EGender || (exports.EGender = {}));
exports.personalSchema = new mongoose.Schema({
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
        type: Number,
        required: true,
        min: 0
    },
    phoneNumber: {
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

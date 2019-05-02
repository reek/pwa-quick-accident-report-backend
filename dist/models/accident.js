"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const address_1 = require("./address");
exports.accidentImagesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    ocr: {
        type: String,
        required: false
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
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    drivingLicense: {
        type: String,
        required: true
    },
    compagny: {
        type: String,
        required: true
    },
    policyNumber: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    }
});

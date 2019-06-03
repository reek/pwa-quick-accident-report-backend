"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const address_1 = require("./address");
const weather_1 = require("./weather");
const person_1 = require("./person");
const vehicle_1 = require("./vehicle");
exports.accidentLocationSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    weather: weather_1.weatherSchema,
    address: address_1.addressSchema
});
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
    location: exports.accidentLocationSchema,
    images: [exports.accidentImagesSchema],
    thirdPartyPerson: person_1.personSchema,
    thirdPartyVehicle: vehicle_1.vehicleSchema,
    notes: {
        type: String,
        required: false
    }
});

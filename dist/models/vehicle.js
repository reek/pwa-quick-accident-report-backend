"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var EVehicleType;
(function (EVehicleType) {
    EVehicleType["CAR"] = "car";
    EVehicleType["MOTORBIKE"] = "motorbike";
    EVehicleType["BIKE"] = "bike";
    EVehicleType["TRUCK"] = "truck";
    EVehicleType["BUS"] = "bus";
})(EVehicleType = exports.EVehicleType || (exports.EVehicleType = {}));
exports.vehicleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        required: false
    },
    make: {
        type: String,
        required: true,
        max: 50
    },
    model: {
        type: String,
        required: true,
        max: 50
    },
    plateNumber: {
        type: String,
        required: true,
        max: 20
    },
    registrationNumber: {
        type: String,
        required: true
    },
    insuranceCompany: {
        type: String,
        required: true
    },
    insurancePolicyNumber: {
        type: String,
        required: true
    }
});

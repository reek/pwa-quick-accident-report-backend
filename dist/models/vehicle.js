"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var EVehicleType;
(function (EVehicleType) {
    EVehicleType[EVehicleType["CAR"] = 0] = "CAR";
    EVehicleType[EVehicleType["MOTORBIKE"] = 1] = "MOTORBIKE";
    EVehicleType[EVehicleType["BIKE"] = 2] = "BIKE";
    EVehicleType[EVehicleType["TRUCK"] = 3] = "TRUCK";
    EVehicleType[EVehicleType["BUS"] = 4] = "BUS";
})(EVehicleType = exports.EVehicleType || (exports.EVehicleType = {}));
exports.vehicleSchema = new mongoose.Schema({
    type: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        required: true
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
    insuranceCompagny: {
        type: String,
        required: true
    },
    insurancePolicyNumber: {
        type: String,
        required: true
    }
});

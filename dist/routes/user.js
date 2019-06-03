"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("./handlers/user");
const personal_1 = require("./handlers/personal");
const accident_1 = require("./handlers/accident");
const vehicle_1 = require("./handlers/vehicle");
exports.userRouter = express.Router()
    .get('/', user_1.getUserHandler)
    .put('/', user_1.updateUserHandler)
    .get('/personal', personal_1.getUserPersonalHandler)
    .put('/personal', personal_1.updateUserPersonalHandler)
    .get('/vehicles', vehicle_1.getUserVehiclesHandler)
    .post('/vehicles', vehicle_1.newUserVehicleHandler)
    .get('/vehicle/:id', vehicle_1.getUserVehicleHandler)
    .put('/vehicle/:id', vehicle_1.updateUserVehicleHandler)
    .delete('/vehicle/:id', vehicle_1.deleteUserVehicleHandler)
    .get('/accidents', accident_1.getUserAccidentsHandler)
    .post('/accidents', accident_1.newUserAccidentHandler)
    .get('/accident/:id', accident_1.getUserAccidentHandler)
    .put('/accident/:id', accident_1.updateUserAccidentHandler)
    .delete('/accident/:id', accident_1.deleteUserAccidentHandler)
    .post('/feedback', user_1.addUserFeedbackHandler);

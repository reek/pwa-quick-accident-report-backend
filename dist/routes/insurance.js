"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const express = require("express");
const insurance_1 = require("../models/insurance");
exports.insuranceRouter = express.Router()
    .get('/', (req, res) => {
    insurance_1.InsuranceModel.find().sort({ compagny: 1 })
        .then((insurances) => res.json({ insurances }))
        .catch(err => res.status(500).json({ error: { code: 500, message: 'Internal server error' } }));
})
    .get('/:id', (req, res) => {
    insurance_1.InsuranceModel.findById(mongoose.Types.ObjectId(req.param('id')))
        .then((insurance) => {
        if (insurance)
            return res.json({ insurance });
        return res.status(404).json({ error: { code: 404, message: 'Insurance not found' } });
    })
        .catch(err => res.status(500).json({ error: { code: 500, message: 'Internal server error' } }));
});

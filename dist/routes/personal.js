"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const user_1 = require("../models/user");
exports.personalRouter = express.Router()
    .get('/', (req, res) => {
    const uid = req.param('uid');
    user_1.UserModel.findOne({ _id: mongoose.Types.ObjectId(uid) }, { personal: 1 })
        .then(user => {
        if (user !== null && user.personal) {
            return res.json({ personal: user.personal });
        }
        return res.status(400).json({ error: { code: 400, message: 'User personal not found!' } });
    })
        .catch(err => {
        console.error('Erreur when getting personal data');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
});

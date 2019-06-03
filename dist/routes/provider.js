"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const node_fetch_1 = require("node-fetch");
exports.providerRouter = express.Router()
    .post('/owm', (req, res) => {
    const { longitude, latitude } = req.body;
    if (!longitude && !latitude) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for email verification 😕' } });
    }
    node_fetch_1.default(`https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=31ead345c45df707073c9f6682234792&lat=${latitude}&lon=${longitude}`)
        .then(resp => resp.json())
        .then(weather => {
        if (weather)
            return res.json(weather);
        res.json(weather);
    })
        .catch(err => {
        console.error('Error when trying verify email', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
    });
})
    .post('/mapbox', (req, res) => {
});

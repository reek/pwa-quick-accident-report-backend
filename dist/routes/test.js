"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("../models/user");
const imgur_1 = require("../providers/imgur/imgur");
const sendgrid_1 = require("../providers/sendgrid/sendgrid");
const insurance_1 = require("./../models/insurance");
exports.testRouter = express.Router()
    .get('/up', async (req, res) => {
    let images = [{ imageUrl: "data:image/png;base64,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", title: "my picture" }];
    const urls = await imgur_1.uploadImagesBase64Async(images);
    console.log(urls);
    images = images.map((value, i) => {
        value.imageUrl = urls[i];
        return value;
    });
    console.log(images);
    res.json(images);
})
    .get('/uploadimage', (req, res) => {
})
    .get('/register', (req, res) => {
    const user = new user_1.UserModel();
    user.collection.remove({});
    user.collection.insert({
        email: 'test@mail.com',
        password: '$2a$10$YEzsRuLG0.jo7b7/3LCSFeHR1fpCk1L9EUWCzGZkALK6oVur3gHrK',
        personal: {
            firstName: 'Elon',
            lastName: 'Musk',
            birthDate: "1970-01-01",
            gender: 0,
            email: "elonmusk@spacex.com",
            phoneNumber: "022 999 99 99",
            drivingLicense: "999999999",
            address: {
                street: "24, Route des Acacias",
                city: "Geneve",
                state: "Geneve",
                postcode: "1200",
                country: "Switzerland",
                longitude: "0",
                latitude: "0",
            }
        },
        vehicles: [{
                type: 0,
                imageUrl: "https://i.imgur.com/iAWl946.jpg",
                make: 'Tesla',
                model: 'Model S',
                plateNumber: "GE 999999",
                registrationNumber: "999.999.999",
                insuranceCompagny: "AXA winterthur",
                insurancePolicyNumber: "AXA-999-999-999"
            }],
        accidents: []
    }).then(user => res.json({ user }))
        .catch(err => {
        console.error('Error when simulate register');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
})
    .get('/insurances', (req, res) => {
    const insurance = new insurance_1.InsuranceModel();
    insurance.collection.remove({});
    insurance.collection.insert([
        {
            "logo": "allianz.jpg",
            "compagny": "Allianz Suisse",
            "email": "info@allianz-suisse.ch/",
            "website": "https://www.allianz-suisse.ch/",
            "phone": "058 358 7111"
        },
        {
            "logo": "axa-winterthur.jpg",
            "compagny": "Axa Winterthur",
            "email": "info@axa-winterthur.ch",
            "website": "https://www.axa-winterthur.ch/",
            "phone": "0800 809 809"
        },
        {
            "logo": "baloise.jpg",
            "compagny": "Bâloise",
            "email": "info@baloise.ch",
            "website": "https://www.baloise.ch/",
            "phone": "0800 24 800 800"
        },
        {
            "logo": "elvia.jpg",
            "compagny": "ELVIA",
            "email": "info@elvia.ch",
            "website": "https://www.elvia.ch/",
            "phone": "0800 055 088"
        },
        {
            "logo": "generali.jpg",
            "compagny": "Generali",
            "email": "info@generali.ch",
            "website": "https://www.generali.ch/",
            "phone": "058 472 40 40"
        },
        {
            "logo": "helvetia.jpg",
            "compagny": "Helvetia",
            "email": "info@helvetia.ch",
            "website": "https://www.helvetia.ch/",
            "phone": "058 280 1000"
        },
        {
            "logo": "lamobiliere.jpg",
            "compagny": "La Mobilière",
            "email": "info@mobi.ch",
            "website": "https://www.mobi.ch/",
            "phone": "031 389 61 11"
        },
        {
            "logo": "smile-direct.jpg",
            "compagny": "smile.direct",
            "email": "info@smile-direct.ch",
            "website": "https://www.smile-direct.ch/",
            "phone": "0844 848 444"
        },
        {
            "logo": "sympany.jpg",
            "compagny": "Sympany",
            "email": "info@sympany.ch",
            "website": "https://www.sympany.ch/",
            "phone": "0800 455 455"
        },
        {
            "logo": "tcs.jpg",
            "compagny": "TCS",
            "email": "info@tcs.ch",
            "website": "https://www.tcs.ch/",
            "phone": "0800 801 000"
        },
        {
            "logo": "vaudoise.jpg",
            "compagny": "Vaudoise",
            "email": "info@vaudoise.ch",
            "website": "https://www.vaudoise.ch/",
            "phone": "0800 811 911"
        },
        {
            "logo": "zurich.jpg",
            "compagny": "Zurich",
            "email": "info@zurich.ch",
            "website": "https://www.zurich.ch/",
            "phone": "0800 80 80 80"
        }
    ]).then(user => res.json({ user }))
        .catch(err => {
        console.error('Error when simulate register');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
})
    .get('/mail', (req, res) => {
    sendgrid_1.sendTestMail();
    res.json({ ok: 200 });
});

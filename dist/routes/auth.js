"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt = require("jsonwebtoken");
const user_1 = require("../models/user");
const sendgrid_1 = require("../providers/sendgrid/sendgrid");
exports.authRouter = express.Router()
    .post('/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for user registration 😕' } });
    }
    user_1.UserModel.findOne({ email })
        .then(user => user !== null)
        .then(found => {
        if (!found) {
            const user = new user_1.UserModel(req.body);
            user.verified = false;
            user.password = user_1.UserModel.hashPassword(password);
            user.setAvatar(email);
            user.setUsername(email);
            return user.save();
        }
        return null;
    })
        .then(user => {
        if (user) {
            res.json({ user, token: user.getToken() });
            return sendgrid_1.sendMailResgisterOK(email);
        }
        res.status(400).json({ error: { code: 400, message: 'User already exists 😕' } });
    })
        .catch(err => {
        console.error('Error when trying register', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
    });
})
    .post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for login 😕' } });
    }
    user_1.UserModel.findOne({ email })
        .then(user => {
        if (user && user.comparePassword(password)) {
            const userModel = user.toJSON();
            delete userModel.password;
            return res.json({ user: userModel, token: user.getToken() });
        }
        res.status(400).json({ error: { code: 400, message: 'Email or Password incorrect 😕' } });
    })
        .catch(err => {
        console.error('Error when trying login', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
    });
})
    .post('/forgot/password', (req, res) => {
    const { email, baseUrl } = req.body;
    if (!email || !baseUrl) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for password reseting 😕' } });
    }
    user_1.UserModel.findOne({ email })
        .then(user => {
        if (user !== null) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: "48h"
            });
            const link = `${req.body.baseUrl}/${token}`;
            sendgrid_1.sendMailWithResetPasswordLink(email, link);
            return res.json({ message: `A email with a reset password link has been sent to ${email} 😃` });
        }
        res.status(200).json({ message: 'Sorry, no account with this email 😕' });
    })
        .catch(err => {
        console.error('Error when trying recovery account', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
    });
})
    .post('/reset/password', (req, res) => {
    const { email, baseUrl } = req.body;
    if (!email || !baseUrl) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for password reseting 😕' } });
    }
    user_1.UserModel.findOne({ email })
        .then(user => {
        if (user !== null) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });
            const link = `${req.body.baseUrl}/${token}`;
            return res.json({ message: `A email with a link has been sent to ${email} 😃` });
        }
        res.status(200).json({ message: 'Sorry, no account with this email 😕' });
    })
        .catch(err => {
        console.error('Error when trying recovery account', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
    });
})
    .post('/email/taken', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for email taking 😕' } });
    }
    user_1.UserModel.findOne({ email })
        .then(user => {
        if (user)
            return res.json({ exists: true });
        res.json({ exists: false });
    })
        .catch(err => {
        console.error('Error when trying check email', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
    });
})
    .post('/email/verified', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for email verification 😕' } });
    }
    user_1.UserModel.findOne({ email })
        .then(user => {
        if (user)
            return res.json({ exists: true });
        res.json({ exists: false });
    })
        .catch(err => {
        console.error('Error when trying verify email', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
    });
});

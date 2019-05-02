"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("../models/user");
const sendgrid_1 = require("../providers/sendgrid/sendgrid");
exports.authRouter = express.Router()
    .post('/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for user registration' } });
    }
    user_1.UserModel.findOne({ email })
        .then(user => user !== null)
        .then(found => {
        console.log(found);
        if (!found) {
            const user = new user_1.UserModel(req.body);
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
        res.status(400).json({ error: { code: 400, message: 'User already exists' } });
    })
        .catch(err => {
        console.error('Error when trying register');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
})
    .post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for login' } });
    }
    user_1.UserModel.findOne({ email })
        .then(user => {
        if (user && user.comparePassword(password)) {
            const userModel = user.toJSON();
            delete userModel.password;
            res.json({ user: userModel, token: user.getToken() });
        }
        else {
            res.status(400).json({ error: { code: 400, message: 'Email or password incorrect' } });
        }
    })
        .catch(err => {
        console.error('Error when trying login');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
})
    .post('/forgot', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: { code: 400, message: 'Missing email for password recovery' } });
    }
    user_1.UserModel.findOne({ email })
        .then(user => {
        if (user !== null) {
            res.json({ result: `A email with new password has been sent to ${email}` });
            return sendgrid_1.sendMailWithNewPassword(email, "123456");
        }
        res.status(400).json({ error: { code: 400, message: 'Email not found' } });
    })
        .catch(err => {
        console.error('Error when trying recovery account');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
})
    .post('/check/email', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: { code: 400, message: 'Missing email for verify' } });
    }
    user_1.UserModel.findOne({ email })
        .then(user => {
        if (user)
            return res.json({ exists: true });
        res.json({ exists: false });
    })
        .catch(err => {
        console.error('Error when trying check email');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
});

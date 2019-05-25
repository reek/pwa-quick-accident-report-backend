"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_1 = require("../../models/user");
const ObjectId = mongoose.Types.ObjectId;
exports.getUserPersonalHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    user_1.UserModel.findOne({ _id: ObjectId(uid) }, { personal: 1 })
        .then((user) => {
        if (user) {
            return res.json({ personal: user.personal || {} });
        }
        return res.status(400).json({ error: { code: 400, message: 'User personal not found' } });
    })
        .catch(err => {
        console.error('Error when getting personal user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.updateUserPersonalHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    user_1.UserModel.findOneAndUpdate({ _id: ObjectId(uid) }, { $set: { personal: req.body } }, { runValidators: true, new: true })
        .then((user) => {
        if (user) {
            delete user.password;
            return res.json({ user });
        }
        return res.status(400).json({ error: { code: 400, message: 'User personal not found' } });
    })
        .catch(err => {
        console.error('Error when updating personal user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};

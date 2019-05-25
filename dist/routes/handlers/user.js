"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const slackbots = require("slackbots");
const user_1 = require("../../models/user");
const ObjectId = mongoose.Types.ObjectId;
exports.getUserHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    user_1.UserModel.findOne({ _id: ObjectId(uid) }, { password: 0 })
        .then((user) => {
        if (user) {
            return res.json({ user });
        }
        return res.status(400).json({ error: { code: 400, message: 'User not found' } });
    })
        .catch(err => {
        console.error('Error when getting user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.updateUserHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    if (req.body.password) {
        req.body.password = user_1.UserModel.hashPassword(req.body.password);
    }
    user_1.UserModel.findOneAndUpdate({ _id: ObjectId(uid) }, { $set: req.body }, { runValidators: true, new: true })
        .then((user) => {
        if (user) {
            delete user.password;
            return res.json({ user });
        }
        return res.status(400).json({ error: { code: 400, message: 'User not found' } });
    })
        .catch(err => {
        console.error('Error when updating user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.addUserFeedbackHandler = (req, res) => {
    const bot = new slackbots({
        token: process.env.SLACK_TOKEN,
        name: process.env.SLACK_BOT
    });
    bot.on('start', () => {
        bot.getChannels().then(_ => console.log(_));
        const params = {
            icon_emoji: ':space_invader:'
        };
        bot.postMessage(process.env.SLACK_CHANNEL_ID, req.body && req.body.feedback || Date.now(), params)
            .then(data => res.json(data))
            .catch(err => res.status(500).json({ error: { code: 500, message: err.toString() } }));
    });
};

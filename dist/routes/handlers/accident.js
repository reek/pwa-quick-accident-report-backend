"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_1 = require("../../models/user");
const imgur_1 = require("../../providers/imgur/imgur");
const ObjectId = mongoose.Types.ObjectId;
exports.getUserAccidentsHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    user_1.UserModel.findOne({ _id: ObjectId(uid) }, { accidents: 1 })
        .then((user) => {
        if (user.accidents) {
            return res.json(user.accidents);
        }
        return res.status(400).json({ error: { code: 400, message: 'User accidents not found' } });
    })
        .catch(err => {
        console.error('Error when getting user accidents');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.newUserAccidentHandler = async (req, res) => {
    const uid = req.tokenContent.userId;
    const { date, time, images } = req.body;
    if (!date || !time || !images) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for accident creation' } });
    }
    const urls = await imgur_1.uploadImagesUrlAsync(images);
    req.body.images = images.map((value, i) => {
        value.imageUrl = urls[i];
        return value;
    });
    user_1.UserModel.findOneAndUpdate({ _id: ObjectId(uid) }, { $push: { accidents: req.body } }, { new: true })
        .then((user) => {
        if (user && user.accidents) {
            return res.json({ accidents: user.accidents });
        }
        return res.status(400).json({ error: { code: 400, message: 'User accidents not found' } });
    })
        .catch(err => {
        console.error('Error when adding a new user accident');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.getUserAccidentHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    user_1.UserModel.findOne({ _id: ObjectId(uid) }, { accidents: { $elemMatch: { _id: ObjectId(id) } } })
        .then((user) => {
        if (user && user.accidents) {
            return res.json({ accident: user.accidents.pop() });
        }
        return res.status(400).json({ error: { code: 400, message: 'User accidents not found' } });
    })
        .catch(err => {
        console.error('Error when getting accident user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.updateUserAccidentHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    req.body._id = id;
    user_1.UserModel.findOneAndUpdate({ _id: ObjectId(uid), 'accidents._id': ObjectId(id) }, { $set: { 'accidents.$': req.body } }, { new: true })
        .then((user) => {
        console.log(user);
        if (user) {
            return res.json({ user });
        }
        return res.status(400).json({ error: { code: 400, message: 'User accidents not found' } });
    })
        .catch(err => {
        console.error('Error when updating accident user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.deleteUserAccidentHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    user_1.UserModel.updateOne({ _id: ObjectId(uid) }, { $pull: { accidents: { _id: ObjectId(id) } } })
        .then((user) => {
        if (user) {
            return res.json({ user });
        }
        return res.status(400).json({ error: { code: 400, message: 'User accidents not found' } });
    })
        .catch(err => {
        console.error('Error when deleting accident user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};

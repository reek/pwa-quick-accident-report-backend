"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_1 = require("../../models/user");
const ObjectId = mongoose.Types.ObjectId;
exports.getUserIncidentsHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    user_1.UserModel.findOne({ _id: ObjectId(uid) }, { incidents: 1 })
        .then((user) => {
        if (user) {
            return res.json({ user });
        }
        return res.status(400).json({ error: { code: 400, message: 'User incidents not found' } });
    })
        .catch(err => {
        console.error('Error when getting user incidents');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.newUserIncidentHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const { date, time } = req.body;
    if (!date || !time) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for incident creation' } });
    }
    user_1.UserModel.updateOne({ _id: ObjectId(uid) }, { $push: { incidents: req.body } }, { new: true })
        .then((user) => {
        if (user) {
            return res.json({ user });
        }
        return res.status(400).json({ error: { code: 400, message: 'User incidents not found' } });
    })
        .catch(err => {
        console.error('Error when adding a new user incident');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.getUserIncidentHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    user_1.UserModel.findOne({ _id: ObjectId(uid) }, { incidents: { $elemMatch: { _id: ObjectId(id) } } })
        .then((user) => {
        if (user) {
            return res.json({ incident: user.incidents.pop() });
        }
        return res.status(400).json({ error: { code: 400, message: 'User incidents not found' } });
    })
        .catch(err => {
        console.error('Error when getting incident user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.updateUserIncidentHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    req.body._id = id;
    user_1.UserModel.updateOne({ _id: ObjectId(uid), 'incidents._id': ObjectId(id) }, { $set: { 'incidents.$': req.body } }, { new: true })
        .then((user) => {
        console.log(user);
        if (user) {
            return res.json({ user });
        }
        return res.status(400).json({ error: { code: 400, message: 'User incidents not found' } });
    })
        .catch(err => {
        console.error('Error when updating incident user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.deleteUserIncidentHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    user_1.UserModel.updateOne({ _id: ObjectId(uid) }, { $pull: { incidents: { _id: ObjectId(id) } } })
        .then((user) => {
        if (user) {
            return res.json({ user });
        }
        return res.status(400).json({ error: { code: 400, message: 'User incidents not found' } });
    })
        .catch(err => {
        console.error('Error when deleting incident user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};

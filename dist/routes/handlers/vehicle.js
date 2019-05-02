"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_1 = require("../../models/user");
const ObjectId = mongoose.Types.ObjectId;
exports.getUserVehiclesHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    user_1.UserModel.findOne({ _id: ObjectId(uid) }, { vehicles: 1 })
        .then((user) => {
        if (user.vehicles) {
            return res.json(user.vehicles);
        }
        return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
    })
        .catch(err => {
        console.error('Error when getting user vehicles');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.newUserVehicleHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const { make, model } = req.body;
    if (!make || !model) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for vehicle creation' } });
    }
    user_1.UserModel.findOneAndUpdate({ _id: ObjectId(uid) }, { $push: { vehicles: req.body } }, { new: true })
        .then((user) => {
        if (user && user.vehicles) {
            return res.json({ vehicles: user.vehicles });
        }
        return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
    })
        .catch(err => {
        console.error('Error when adding a new user vehicle');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.getUserVehicleHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    user_1.UserModel.findOne({ _id: ObjectId(uid) }, { vehicles: { $elemMatch: { _id: ObjectId(id) } } })
        .then((user) => {
        if (user) {
            return res.json({ vehicle: user.vehicles.pop() });
        }
        return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
    })
        .catch(err => {
        console.error('Error when getting vehicle user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.updateUserVehicleHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    req.body._id = id;
    user_1.UserModel.updateOne({ _id: ObjectId(uid), 'vehicles._id': ObjectId(id) }, { $set: { 'vehicles.$': req.body } }, { new: true })
        .then((user) => {
        console.log(user);
        if (user) {
            return res.json({ user });
        }
        return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
    })
        .catch(err => {
        console.error('Error when updating vehicle user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.deleteUserVehicleHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    user_1.UserModel.updateOne({ _id: ObjectId(uid) }, { $pull: { vehicles: { _id: ObjectId(id) } } })
        .then((user) => {
        if (user) {
            return res.json({ user });
        }
        return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
    })
        .catch(err => {
        console.error('Error when deleting vehicle user');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};

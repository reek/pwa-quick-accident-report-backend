"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_1 = require("../../models/user");
const imgur_1 = require("../../providers/imgur/imgur");
const ObjectId = mongoose.Types.ObjectId;
exports.getUserVehiclesHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    user_1.UserModel.findOne({ _id: ObjectId(uid) }, { vehicles: 1 })
        .then((user) => {
        if (user && user.vehicles) {
            return res.json(user.vehicles);
        }
        return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
    })
        .catch(err => {
        console.error('Error when getting user vehicles', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.newUserVehicleHandler = async (req, res) => {
    const uid = req.tokenContent.userId;
    const { make, model, imageUrl } = req.body;
    if (!make || !model || !imageUrl) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for vehicle creation' } });
    }
    req.body.imageUrl = await imgur_1.uploadImageBase64Asnc(imageUrl);
    user_1.UserModel.findOneAndUpdate({ _id: ObjectId(uid) }, { $push: { vehicles: req.body } }, { runValidators: true, new: true })
        .then((user) => {
        if (user && user.vehicles) {
            return res.json(user.vehicles);
        }
        return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
    })
        .catch(err => {
        console.error('Error when adding a new user vehicle', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.getUserVehicleHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    user_1.UserModel.findOne({ _id: ObjectId(uid) }, { vehicles: { $elemMatch: { _id: ObjectId(id) } } })
        .then((user) => {
        if (user && user.vehicles) {
            return res.json(user.vehicles.pop());
        }
        return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
    })
        .catch(err => {
        console.error('Error when getting vehicle user', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.updateUserVehicleHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    req.body._id = id;
    user_1.UserModel.findOneAndUpdate({ _id: ObjectId(uid), 'vehicles._id': ObjectId(id) }, { $set: { 'vehicles.$': req.body } }, { runValidators: true, new: true })
        .then((user) => {
        if (user && user.vehicles) {
            return res.json(user.vehicles.pop());
        }
        return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
    })
        .catch(err => {
        console.error('Error when updating vehicle user', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};
exports.deleteUserVehicleHandler = (req, res) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id');
    user_1.UserModel.findOneAndUpdate({ _id: ObjectId(uid) }, { $pull: { vehicles: { _id: ObjectId(id) } } })
        .then((user) => {
        if (user && user.vehicles) {
            return res.json(user.vehicles);
        }
        return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
    })
        .catch(err => {
        console.error('Error when deleting vehicle user', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ts_md5_1 = require("ts-md5");
const person_1 = require("./person");
const vehicle_1 = require("./vehicle");
const accident_1 = require("./accident");
exports.userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50
    },
    verified: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: 'https://www.gravatar.com/avatar/userEmailHashedInMd5'
    },
    personal: person_1.personSchema,
    vehicles: [vehicle_1.vehicleSchema],
    accidents: [accident_1.accidentSchema]
});
exports.userSchema.index({ email: 1 }, { unique: true });
exports.userSchema.index({ email: 'hashed' });
exports.userSchema.method('comparePassword', function (password) {
    try {
        return bcrypt.compareSync(password, this.password);
    }
    catch (e) {
        return false;
    }
});
exports.userSchema.method('getToken', function () {
    return jwt.sign({ userId: this._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
});
exports.userSchema.method('setAvatar', function (email) {
    this.avatar = `https://www.gravatar.com/avatar/${ts_md5_1.Md5.hashStr(email)}`;
});
exports.userSchema.method('setUsername', function (email) {
    this.username = this.email.split("@").shift();
});
exports.userSchema.static('hashPassword', (password) => {
    return bcrypt.hashSync(password);
});
exports.UserModel = mongoose.model('users', exports.userSchema);

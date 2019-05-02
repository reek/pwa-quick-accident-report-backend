"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
exports.updateToken = (token, expire) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        delete payload.exp;
        delete payload.iat;
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: expire
        });
    }
    catch (e) {
        return '';
    }
};

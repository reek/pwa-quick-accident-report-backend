"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../utils/token");
exports.tokenMiddleware = (req, res, next) => {
    const token = req.get('authorization');
    const originalJson = res.json;
    res.json = (body) => {
        if (res.statusCode === 200 && body && token && typeof body === 'object' && !body.token) {
            body.token = token_1.updateToken(token, process.env.JWT_EXPIRE);
        }
        return originalJson.call(res, body);
    };
    next();
};

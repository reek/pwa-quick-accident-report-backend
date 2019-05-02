"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = (req, res, next) => {
    res.status(404).json({ code: 404, message: 'API not found' });
};

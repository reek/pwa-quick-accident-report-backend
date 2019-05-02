"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalErrorMiddleware = (err, req, res, next) => {
    console.error(`Error: ${err}`);
    res.status(500).json({ code: 500, data: err, message: 'Internal Server Error' });
};

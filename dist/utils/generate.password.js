"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = (min = 100000, max = 999999) => {
    return (Math.random() * (max - min) + min).toString();
};

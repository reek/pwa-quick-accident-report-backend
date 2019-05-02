"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");
const MAIL_FROM = process.env.MAIL_FROM;
const MAIL_SETTINGS = {
    sandboxMode: {
        enable: process.env.NODE_ENV !== 'production'
    }
};
exports.sendMailWithNewPassword = (to, newPassword) => {
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: `QarApp - New Password`,
        text: 'Your new Password',
        html: `<strong>${newPassword}</strong>`,
        mailSettings: MAIL_SETTINGS
    });
};
exports.sendMailResgisterOK = (to) => {
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: `QarApp - Registred`,
        text: 'Welcome !',
        html: '<strong></strong>',
        mailSettings: MAIL_SETTINGS
    });
};
exports.sendTestMail = () => {
    const msg = {
        to: 'ricardo.reves@gmail.com',
        from: 'noreply@cadze.ch',
        subject: 'Test - Quick Accident Report',
        text: 'Welcome to Qar App',
        html: '<strong>Thanks 😊</strong>',
    };
    sgMail.send(msg).then(_ => console.log(_));
};

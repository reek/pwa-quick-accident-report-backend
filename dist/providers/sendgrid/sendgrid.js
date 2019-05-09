"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const MAIL_TO = process.env.MAIL_TO;
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
        subject: `Qar App - New Password`,
        text: `Your new Password ${newPassword}`,
        html: '<strong>Thanks 😊</strong>',
        mailSettings: MAIL_SETTINGS
    });
};
exports.sendMailResgisterOK = (to) => {
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: `Qar App - Registred`,
        text: 'Registration completed!',
        html: '<strong>Thanks 😊</strong>',
        mailSettings: MAIL_SETTINGS
    });
};
exports.sendTestMail = () => {
    console.log(process.env.SENDGRID_API_KEY, process.env.MAIL_FROM);
    const msg = {
        to: MAIL_TO,
        from: MAIL_FROM,
        subject: 'Test - Quick Accident Report',
        text: Date.now().toString(),
        html: '<strong>Thanks 😊</strong>',
    };
    sgMail.send(msg).then(_ => console.log(_));
};

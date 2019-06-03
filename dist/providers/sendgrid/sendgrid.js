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
exports.sendMailWithResetPasswordLink = (to, link) => {
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: `Qar App - Reset Password`,
        text: `Afin de pouvoir changer .`,
        html: `<a href="${link}">Link</a>`,
        mailSettings: MAIL_SETTINGS
    });
};
exports.sendMailResgisterOK = (to) => {
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: `Qar App - Registration completed`,
        text: 'Registration completed',
        html: '<strong>Thanks 😊</strong>',
        mailSettings: MAIL_SETTINGS
    });
};
exports.sendTestMail = () => {
    const msg = {
        to: MAIL_TO,
        from: MAIL_FROM,
        subject: 'Test - Quick Accident Report',
        text: Date.now().toString(),
        html: '<strong>Thanks 😊</strong>',
    };
    sgMail.send(msg).then(_ => console.log(_));
};

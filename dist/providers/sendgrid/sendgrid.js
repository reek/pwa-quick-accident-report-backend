"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");
console.log(process.env.SENDGRID_API_KEY);
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
        subject: `${process.env.APP_NAME} - New Password`,
        text: 'Your new Password',
        html: `<strong>${newPassword}</strong>`,
        mailSettings: MAIL_SETTINGS
    });
};
exports.sendMailResgisterOK = (to) => {
    console.log(0);
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: `${process.env.APP_NAME} - New Password`,
        text: 'Welcome to MyApp',
        html: '<strong>Thanks!</strong>',
        mailSettings: MAIL_SETTINGS
    });
};
exports.sendTestMail = () => {
    const msg = {
        to: 'ricardo.reves@gmail.com',
        from: 'qar@cadze.ch',
        subject: 'Test - Quick Accident Report',
        text: 'Welcome to My App',
        html: '<strong>Thanks 😊</strong>',
    };
    sgMail.send(msg).then(_ => console.log(_));
};

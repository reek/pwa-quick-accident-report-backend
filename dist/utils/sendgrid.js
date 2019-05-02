"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const MAIL_FROM = process.env.MAIL_FROM;
const MAIL_SETTINGS = {
    sandboxMode: {
        enable: process.env.NODE_ENV !== 'production'
    }
};
exports.sendRecoveryMail = (to) => {
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: 'My App - Recovery',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        mailSettings: MAIL_SETTINGS
    });
};
exports.sendRegistredMail = (to) => {
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: 'My App - Registred',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        mailSettings: MAIL_SETTINGS
    });
};
const testMessage = {
    to: 'ricuperate@titaspaharpur2.cf',
    from: MAIL_FROM,
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    mailSettings: {
        sandboxMode: {
            enable: process.env.NODE_ENV !== 'production'
        }
    },
    attachments: [{
            content: 'base64content',
            filename: 'file.pdf',
            contentId: 'uuid',
            disposition: 'attachment',
            type: 'application/pdf'
        }]
};
exports.sendTestMail = () => {
    return sgMail.send(testMessage);
};

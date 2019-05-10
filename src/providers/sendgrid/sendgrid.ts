import * as sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const MAIL_TO = process.env.MAIL_TO
const MAIL_FROM = process.env.MAIL_FROM
const MAIL_SETTINGS = {
    sandboxMode: {
        enable: process.env.NODE_ENV !== 'production'
    }
}

export const sendMailWithNewPassword = (to: string, newPassword: string) => {
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: `Qar App - New Password`,
        text: `Your new Password ${newPassword}`,
        html: '<strong>Thanks 😊</strong>',
        mailSettings: MAIL_SETTINGS
    });
}

export const sendMailResgisterOK = (to: string) => {
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: `Qar App - Registred`,
        text: 'Registration completed!',
        html: '<strong>Thanks 😊</strong>',
        mailSettings: MAIL_SETTINGS
    });
}


export const sendTestMail = () => {
    // const testMessage: MailData = {
    //     to: 'rockdale@zilmail.gq',
    //     from: MAIL_FROM,
    //     subject: 'Sending with SendGrid is Fun',
    //     text: 'and easy to do anywhere, even with Node.js',
    //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    //     /*     mailSettings: {
    //             sandboxMode: {
    //                 enable: process.env.NODE_ENV !== 'production'
    //             }
    //         },
    //         attachments: [{
    //             content: 'base64content',
    //             filename: 'file.pdf',
    //             contentId: 'uuid',
    //             disposition: 'attachment',
    //             type: 'application/pdf'
    //         }] */
    // };
    // return sgMail.send(testMessage);
    const msg = {
        to: MAIL_TO,
        from: MAIL_FROM,
        subject: 'Test - Quick Accident Report',
        text: Date.now().toString(),
        html: '<strong>Thanks 😊</strong>',
    };
    sgMail.send(msg).then(_ => console.log(_));
}
import * as sgMail from '@sendgrid/mail';
import { MailData } from '@sendgrid/helpers/classes/mail';

sgMail.setApiKey("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");
console.log(process.env.SENDGRID_API_KEY)

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
        subject: `${process.env.APP_NAME} - New Password`,
        text: 'Your new Password',
        html: `<strong>${newPassword}</strong>`,
        mailSettings: MAIL_SETTINGS
    });
}

export const sendMailResgisterOK = (to: string) => {
    console.log(0)
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: `${process.env.APP_NAME} - New Password`,
        text: 'Welcome to MyApp',
        html: '<strong>Thanks!</strong>',
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
        to: 'ricardo.reves@gmail.com',
        from: 'qar@cadze.ch',
        subject: 'Test - Quick Accident Report',
        text: 'Welcome to My App',
        html: '<strong>Thanks 😊</strong>',
    };
    sgMail.send(msg).then(_=>console.log(_));
}
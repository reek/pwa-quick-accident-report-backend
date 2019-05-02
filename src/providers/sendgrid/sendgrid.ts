import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey("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");

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
        subject: `QarApp - New Password`,
        text: 'Your new Password',
        html: `<strong>${newPassword}</strong>`,
        mailSettings: MAIL_SETTINGS
    });
}

export const sendMailResgisterOK = (to: string) => {
    return sgMail.send({
        to,
        from: MAIL_FROM,
        subject: `QarApp - Registred`,
        text: 'Welcome !',
        html: '<strong></strong>',
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
        from: 'noreply@cadze.ch',
        subject: 'Test - Quick Accident Report',
        text: 'Welcome to Qar App',
        html: '<strong>Thanks 😊</strong>',
    };
    sgMail.send(msg).then(_ => console.log(_));
}
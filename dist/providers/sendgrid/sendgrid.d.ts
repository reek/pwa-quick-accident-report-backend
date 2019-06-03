/// <reference types="request" />
export declare const sendMailWithResetPasswordLink: (to: string, link: string) => Promise<[import("request").Response, {}]>;
export declare const sendMailResgisterOK: (to: string) => Promise<[import("request").Response, {}]>;
export declare const sendTestMail: () => void;

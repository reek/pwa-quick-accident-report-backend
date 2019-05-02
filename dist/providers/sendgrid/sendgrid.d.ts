/// <reference types="request" />
export declare const sendMailWithNewPassword: (to: string, newPassword: string) => Promise<[import("request").Response, {}]>;
export declare const sendMailResgisterOK: (to: string) => Promise<[import("request").Response, {}]>;
export declare const sendTestMail: () => void;

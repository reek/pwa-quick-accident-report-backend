/// <reference types="request" />
export declare const sendRecoveryMail: (to: string) => Promise<[import("request").Response, {}]>;
export declare const sendRegistredMail: (to: string) => Promise<[import("request").Response, {}]>;
export declare const sendTestMail: () => Promise<[import("request").Response, {}]>;

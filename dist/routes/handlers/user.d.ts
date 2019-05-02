import { Request, Response } from "express";
export declare const getUserHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const updateUserHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const addUserFeedbackHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;

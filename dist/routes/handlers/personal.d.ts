import { Request, Response } from "express";
export declare const getUserPersonalHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const updateUserPersonalHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;

import { Request, Response } from "express";
export declare const getUserAccidentsHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const newUserAccidentHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => Promise<import("express-serve-static-core").Response>;
export declare const getUserAccidentHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const updateUserAccidentHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const deleteUserAccidentHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;

import { Request, Response } from "express";
export declare const getUserIncidentsHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const newUserIncidentHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => import("express-serve-static-core").Response;
export declare const getUserIncidentHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const updateUserIncidentHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const deleteUserIncidentHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;

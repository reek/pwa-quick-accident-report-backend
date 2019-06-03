import { Request, Response } from "express";
export declare const getUserVehiclesHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const newUserVehicleHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => Promise<import("express-serve-static-core").Response>;
export declare const getUserVehicleHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const updateUserVehicleHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;
export declare const deleteUserVehicleHandler: (req: Request & {
    tokenContent?: any;
}, res: Response) => void;

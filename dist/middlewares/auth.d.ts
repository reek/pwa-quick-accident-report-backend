import { Request, Response, NextFunction } from 'express';
export declare const authMiddleware: (req: Request & {
    tokenContent?: any;
}, res: Response, next: NextFunction) => import("express-serve-static-core").Response;
export declare const checkToken: (token: any) => false | object;

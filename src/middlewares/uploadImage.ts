import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { uploadImageBase64 } from '../providers/imgur/imgur';
/*
export const uploadImageMiddleware = (req: Request & { tokenContent?: any }, res: Response, next: NextFunction) => {
    const payload = req.body;


    uploadImageBase64()


        next();

}; */
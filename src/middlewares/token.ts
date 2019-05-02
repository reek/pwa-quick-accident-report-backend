import * as express from 'express';
import { updateToken } from '../utils/token';

export const tokenMiddleware = (req: express.Request, res: express.Response, next) => {
    // get current token
    const token = req.get('authorization');

    // here we save original json method
    const originalJson = res.json;

    // we replace the response json method by our own
    // this method inspect the response and determine if
    // a new token should be generated
    res.json = (body?: any): express.Response => {
        // Don't update token for:
        // - Failed requests
        // - Request without token
        // - Responses without body
        // - Response that already contains a token
        if (res.statusCode === 200 && body && token && typeof body === 'object' && !body.token) {
            // here we should get token expiration from .env so it
            // could be changed easily on Heroku
            body.token = updateToken(token, process.env.JWT_EXPIRE);
        }
        // at end, we call the real json method to actually send response
        return originalJson.call(res, body);
    };
    // the method is replaced, call next middleware
    next();
};
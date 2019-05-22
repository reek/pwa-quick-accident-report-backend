import * as express from 'express';
import { Request, Response } from 'express';
import fetch from 'node-fetch'

export const providerRouter = express.Router()

    // open weather map
    .post('/owm', (req: Request & { tokenContent?: any }, res: Response) => {
        // validation
        const { longitude, latitude } = req.body;
        if (!longitude && !latitude) {
            return res.status(400).json({ error: { code: 400, message: 'Missing data for email verification 😕' } });
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=31ead345c45df707073c9f6682234792&lat=${latitude}&lon=${longitude}`)
            .then(resp => resp.json())
            .then(weather => {
                if (weather)
                    return res.json(weather)
                res.json(weather)
            })
            .catch(err => {
                console.error('Error when trying verify email', req.body, err);
                res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
            })
    })

    .post('/mapbox', (req: Request & { tokenContent?: any }, res: Response) => {

    })
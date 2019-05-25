import * as mongoose from 'mongoose';
export interface IWeather {
    icon?: string;
    forecast?: string;
    temperature?: string;
    pressure?: string;
    humidity?: string;
    visibility?: string;
    wind?: string;
}
export declare const weatherSchema: mongoose.Schema<any>;

import * as mongoose from 'mongoose';
export interface IIncident {
    date: string;
    time: string;
}
export declare const incidentSchema: mongoose.Schema<any>;

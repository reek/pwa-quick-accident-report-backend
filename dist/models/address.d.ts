import * as mongoose from 'mongoose';
export interface IAddress {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    longitude?: string;
    latitude?: string;
}
export declare const addressSchema: mongoose.Schema<any>;

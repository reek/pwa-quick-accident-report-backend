import * as mongoose from 'mongoose';
import { IAddress } from './address';
export interface IAccidentImages {
    title: string;
    imageUrl: string;
}
export declare const accidentImagesSchema: mongoose.Schema<any>;
export interface IAccident {
    _id?: string;
    date: string;
    time: string;
    address: IAddress;
    images: IAccidentImages[];
    description?: string;
    notes?: string;
    contacts?: any;
}
export declare const accidentSchema: mongoose.Schema<any>;

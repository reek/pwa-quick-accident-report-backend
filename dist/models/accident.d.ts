import * as mongoose from 'mongoose';
import { IAddress } from './address';
import { IWeather } from './weather';
import { IPerson } from './person';
import { IVehicle } from './vehicle';
export interface IAccidentLocation {
    date: string;
    time: string;
    weather: IWeather;
    address: IAddress;
}
export declare const accidentLocationSchema: mongoose.Schema<any>;
export interface IAccidentImages {
    title: string;
    imageUrl: string;
    ocr?: string;
}
export declare const accidentImagesSchema: mongoose.Schema<any>;
export interface IAccident {
    _id?: string;
    location: IAccidentLocation;
    images: IAccidentImages[];
    thirdPartyPerson: IPerson;
    thirdPartyVehicle: IVehicle;
    notes?: string;
}
export declare const accidentSchema: mongoose.Schema<any>;

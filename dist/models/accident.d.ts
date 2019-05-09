import * as mongoose from 'mongoose';
import { IAddress } from './address';
export interface IAccidentImages {
    title: string;
    imageUrl: string;
    ocr?: string;
}
export declare const accidentImagesSchema: mongoose.Schema<any>;
export interface IAccident {
    _id?: string;
    date: string;
    time: string;
    address: IAddress;
    images: IAccidentImages[];
    gender: string;
    $birthDate: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    drivingLicense: string;
    compagny: string;
    policyNumber: string;
    remarks: string;
}
export declare const accidentSchema: mongoose.Schema<any>;

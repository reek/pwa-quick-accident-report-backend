import * as mongoose from 'mongoose';
import { IAddress } from './address';
export declare enum EGender {
    MALE = "male",
    FEMALE = "female"
}
export interface IPerson {
    _id?: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: EGender;
    phone: string;
    email: string;
    drivingLicense?: string;
    address?: IAddress;
}
export declare const personSchema: mongoose.Schema<any>;

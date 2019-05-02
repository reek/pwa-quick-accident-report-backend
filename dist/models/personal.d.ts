import * as mongoose from 'mongoose';
import { IAddress } from './address';
export declare enum EGender {
    MALE = 0,
    FEMALE = 1
}
export interface IPersonal {
    _id?: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: EGender;
    phoneNumber: string;
    email: string;
    drivingLicense?: string;
    address?: IAddress;
}
export declare const personalSchema: mongoose.Schema<any>;

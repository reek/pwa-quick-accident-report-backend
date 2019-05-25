import * as mongoose from 'mongoose';
import { IAddress, addressSchema } from './address';

export enum EGender {
    MALE = "male", FEMALE = "female"
}

export interface IPerson {
    _id?: string
    firstName: string
    lastName: string
    birthDate: string // 2018-07-22
    gender: EGender
    phone: string
    email: string
    drivingLicense?: string
    address?: IAddress
}


export const personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50
    },
    birthDate: {
        type: String,
        required: true,
        maxlength: 50
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
    drivingLicense: {
        type: String,
        required: true,
        maxlength: 50
    },
    address: addressSchema
})
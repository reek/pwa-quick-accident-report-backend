import * as mongoose from 'mongoose';
import { IAddress, addressSchema } from './address';

export enum EGender {
    MALE, FEMALE
}

export interface IPersonal {
    _id?: string
    firstName: string
    lastName: string
    birthDate: string // 2018-07-22
    gender: EGender
    phoneNumber: string
    email: string
    drivingLicense?: string
    address?: IAddress
}


export const personalSchema = new mongoose.Schema({
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
        type: Number,
        required: true,
        min: 0
    },
    phoneNumber: {
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
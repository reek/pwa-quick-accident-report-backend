import * as mongoose from 'mongoose';

export interface IAddress {
    street: string
    city: string
    state: string
    postcode: string
    country: string
    longitude?: string
    latitude?: string
}

export const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        maxlength: 128
    },
    city: {
        type: String,
        required: true,
        maxlength: 50
    },
    state: {
        type: String,
        required: true,
        maxlength: 50
    },
    postcode: {
        type: String,
        required: true,
        maxlength: 20
    },
    country: {
        type: String,
        required: true,
        maxlength: 50
    },
    longitude: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    }
})
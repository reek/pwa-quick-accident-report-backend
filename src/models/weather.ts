import * as mongoose from 'mongoose';

export interface IWeather {
    icon?: string
    forecast?: string
    temperature?: string
    pressure?: string
    humidity?: string
    visibility?: string
    wind?: string
}

export const weatherSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: false
    },
    forecast: {
        type: String,
        required: false
    },
    temperature: {
        type: String,
        required: false
    },
    pressure: {
        type: String,
        required: false
    },
    humidity: {
        type: String,
        required: false
    },
    visibility: {
        type: String,
        required: false
    },
    wind: {
        type: String,
        required: false
    }
})
import * as mongoose from 'mongoose';
import { IAddress, addressSchema } from './address';
import { IWeather, weatherSchema } from './weather';
import { IPerson, personSchema } from './person';
import { IVehicle, vehicleSchema } from './vehicle';

export interface IAccidentLocation {
  date: string
  time: string
  weather: IWeather,
  address: IAddress
}

export const accidentLocationSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  weather: weatherSchema,
  address: addressSchema
})

export interface IAccidentImages {
  title: string,
  imageUrl: string
  ocr?: string
}

export const accidentImagesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  ocr: {
    type: String,
    required: false
  }
})

export interface IAccident {
  _id?: string
  location: IAccidentLocation
  images: IAccidentImages[]
  thirdPartyPerson: IPerson
  thirdPartyVehicle: IVehicle
  notes?: string
}

export const accidentSchema = new mongoose.Schema({
  location: accidentLocationSchema,
  images: [accidentImagesSchema],
  thirdPartyPerson: personSchema,
  thirdPartyVehicle: vehicleSchema,
  notes: {
    type: String,
    required: false
  }
})

import * as mongoose from 'mongoose';
import { IAddress, addressSchema } from './address';

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
  date: string
  time: string
  address: IAddress
  images: IAccidentImages[]
  gender: string
  $birthDate: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  drivingLicense: string
  compagny: string
  policyNumber: string
  remarks: string
}

export const accidentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  address: addressSchema,
  images: [accidentImagesSchema],
  gender: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  drivingLicense: {
    type: String,
    required: true
  },
  compagny: {
    type: String,
    required: true
  },
  policyNumber: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
    required: true
  }
})

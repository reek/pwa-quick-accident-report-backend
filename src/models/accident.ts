import * as mongoose from 'mongoose';
import { IAddress, addressSchema } from './address';

export interface IAccidentImages {
  title: string,
  imageUrl: string
}

export const accidentImagesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})

export interface IAccident {
  _id?: string
  date: string
  time: string
  address: IAddress
  images: IAccidentImages[]
  description?: string
  notes?: string
  contacts?: any
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
  description: {
    type: String,
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  contacts: {
    type: String,
    required: false
  }
})
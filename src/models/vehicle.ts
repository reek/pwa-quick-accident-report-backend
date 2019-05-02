import * as mongoose from 'mongoose';

export enum EVehicleType {
  CAR, MOTORBIKE, BIKE, TRUCK, BUS
}

export interface IVehicle {
  _id?: string
  imageUrl?: string
  type: EVehicleType
  make: string
  model: string
  plateNumber: string // No plaques
  registrationNumber: string
  insuranceCompagny: string
  insurancePolicyNumber: string
}

export const vehicleSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true,
    max: 50
  },
  model: {
    type: String,
    required: true,
    max: 50
  },
  plateNumber: {
    type: String,
    required: true,
    max: 20
  },
  registrationNumber: {
    type: String,
    required: true
  },
  insuranceCompagny: {
    type: String,
    required: true
  },
  insurancePolicyNumber: {
    type: String,
    required: true
  }
})
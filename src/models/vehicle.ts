import * as mongoose from 'mongoose';

export enum EVehicleType {
  CAR = "car", MOTORBIKE = "motorbike", BIKE = "bike", TRUCK = "truck", BUS = "bus"
}

export interface IVehicle {
  _id?: string
  imageUrl?: string
  type: EVehicleType
  make: string
  model: string
  plateNumber: string // No plaques
  registrationNumber: string
  insuranceCompany: string
  insurancePolicyNumber: string
}

export const vehicleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    required: false
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
  insuranceCompany: {
    type: String,
    required: true
  },
  insurancePolicyNumber: {
    type: String,
    required: true
  }
})
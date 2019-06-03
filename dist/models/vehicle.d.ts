import * as mongoose from 'mongoose';
export declare enum EVehicleType {
    CAR = "car",
    MOTORBIKE = "motorbike",
    BIKE = "bike",
    TRUCK = "truck",
    BUS = "bus"
}
export interface IVehicle {
    _id?: string;
    imageUrl?: string;
    type: EVehicleType;
    make: string;
    model: string;
    plateNumber: string;
    registrationNumber: string;
    insuranceCompany: string;
    insurancePolicyNumber: string;
}
export declare const vehicleSchema: mongoose.Schema<any>;

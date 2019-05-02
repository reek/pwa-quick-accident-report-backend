import * as mongoose from 'mongoose';
export declare enum EVehicleType {
    CAR = 0,
    MOTORBIKE = 1,
    BIKE = 2,
    TRUCK = 3,
    BUS = 4
}
export interface IVehicle {
    _id?: string;
    imageUrl?: string;
    type: EVehicleType;
    make: string;
    model: string;
    plateNumber: string;
    registrationNumber: string;
    insuranceCompagny: string;
    insurancePolicyNumber: string;
}
export declare const vehicleSchema: mongoose.Schema<any>;

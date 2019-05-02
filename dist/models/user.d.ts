import * as mongoose from 'mongoose';
import { IPersonal } from './personal';
import { IVehicle } from './vehicle';
import { IAccident } from './accident';
export interface IUser {
    username: string;
    email: string;
    password?: string;
    avatar: string;
    personal: IPersonal;
    vehicles: IVehicle[];
    accidents: IAccident[];
}
export interface IUserDoc extends mongoose.Document, IUser {
    comparePassword(password: string): boolean;
    getToken(): string;
    setAvatar(email: string): string;
    setUsername(email: string): string;
}
interface IUserModel extends mongoose.Model<IUserDoc> {
    hashPassword(password: string): string;
}
export declare const userSchema: mongoose.Schema<any>;
export declare const UserModel: IUserModel;
export {};

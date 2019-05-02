import * as mongoose from 'mongoose';
export declare const userSchema: mongoose.Schema<any>;
export interface IUserDoc extends mongoose.Document {
    username?: string;
    email: string;
    password: string;
    profile: {};
    vehicles: [];
    incidents: [];
}
export declare const userModel: mongoose.Model<IUserDoc, {}>;

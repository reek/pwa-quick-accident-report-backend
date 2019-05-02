import * as mongoose from 'mongoose';
export interface IPersonDoc extends mongoose.Document {
    firstname: string;
    lastname: string;
    money?: number;
    birthDate: Date;
}
export declare const personSchema: mongoose.Schema<IPersonDoc>;
export declare const personModel: mongoose.Model<IPersonDoc, {}>;

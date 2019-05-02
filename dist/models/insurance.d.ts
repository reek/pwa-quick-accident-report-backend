import * as mongoose from 'mongoose';
export interface IInsurance {
    logo: string;
    compagny: string;
    phone: string;
    email: string;
    website: string;
}
export declare const insuranceSchema: mongoose.Schema<any>;
export interface IInsuranceDoc extends mongoose.Document, IInsurance {
}
interface IInsuranceModel extends mongoose.Model<IInsuranceDoc> {
}
export declare const InsuranceModel: IInsuranceModel;
export {};

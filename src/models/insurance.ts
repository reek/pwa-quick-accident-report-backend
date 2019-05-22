import * as mongoose from 'mongoose';

export interface IInsurance {
    logo: string
    description: string
    company: string
    phone: string
    email: string
    website: string
}

export const insuranceSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    }
})

// document interface, define custom methods here
export interface IInsuranceDoc extends mongoose.Document, IInsurance {

}

interface IInsuranceModel extends mongoose.Model<IInsuranceDoc> {

}

// model generation
export const InsuranceModel = mongoose.model<IInsuranceDoc, IInsuranceModel>('insurances', insuranceSchema);
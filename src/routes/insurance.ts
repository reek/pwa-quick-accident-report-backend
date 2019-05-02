import * as mongoose from 'mongoose';
import * as express from 'express';
import { Request, Response } from 'express';
import { InsuranceModel, IInsuranceDoc } from '../models/insurance';

export const insuranceRouter = express.Router()

  // get all insurances
  .get('/', (req: Request, res: Response) => {
    InsuranceModel.find().sort({ compagny: 1 })
      .then((insurances: IInsuranceDoc[]) => res.json({ insurances }))
      .catch(err => res.status(500).json({ error: { code: 500, message: 'Internal server error' } }));
  })

  // get one insurance
  .get('/:id', (req, res) => {
    InsuranceModel.findById(mongoose.Types.ObjectId(req.param('id')))
      .then((insurance: IInsuranceDoc) => {
        if (insurance)
          return res.json({ insurance });
        return res.status(404).json({ error: { code: 404, message: 'Insurance not found' } });
      })
      .catch(err => res.status(500).json({ error: { code: 500, message: 'Internal server error' } }));
  })

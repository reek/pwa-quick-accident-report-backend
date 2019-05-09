import * as mongoose from 'mongoose';
import { UserModel, IUserDoc } from '../../models/user';
import { Request, Response } from "express";
const ObjectId = mongoose.Types.ObjectId;


export const getUserPersonalHandler = (req: Request & { tokenContent?: any }, res: Response) => {
  const uid = req.tokenContent.userId;
  UserModel.findOne({ _id: ObjectId(uid) }, { personal: 1 })
    .then((user: IUserDoc) => {
      if (user) {
        return res.json({ user })
      }
      return res.status(400).json({ error: { code: 400, message: 'User personal not found' } });
    })
    .catch(err => {
      console.error('Error when getting personal user');
      console.error(req.body);
      console.error(err);
      res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};


export const updateUserPersonalHandler = (req: Request & { tokenContent?: any }, res: Response) => {
  const uid = req.tokenContent.userId;
  UserModel.findOneAndUpdate({ _id: ObjectId(uid) }, { $set: { personal: req.body } }, { runValidators: true, new: true })
    .then((user: IUserDoc) => {
      if (user) {
        delete user.password;
        return res.json({ user });
      }
      return res.status(400).json({ error: { code: 400, message: 'User personal not found' } });
    })
    .catch(err => {
      console.error('Error when updating personal user');
      console.error(req.body);
      console.error(err);
      res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};

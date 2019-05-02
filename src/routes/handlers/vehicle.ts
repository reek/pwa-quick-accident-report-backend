import * as mongoose from 'mongoose';
import { UserModel, IUserDoc } from '../../models/user';
import { Request, Response } from "express";
const ObjectId = mongoose.Types.ObjectId;


export const getUserVehiclesHandler = (req: Request & { tokenContent?: any }, res: Response) => {
    const uid = req.tokenContent.userId;

    UserModel.findOne({ _id: ObjectId(uid) }, { vehicles: 1 })
        .then((user: IUserDoc) => {
            if (user.vehicles) {
                return res.json(user.vehicles)
            }
            return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
        })
        .catch(err => {
            console.error('Error when getting user vehicles');
            console.error(req.body);
            console.error(err);
            res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
        });
};


export const newUserVehicleHandler = (req: Request & { tokenContent?: any }, res: Response) => {
    const uid = req.tokenContent.userId;
    const { make, model } = req.body;
    if (!make || !model) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for vehicle creation' } });
    }

    UserModel.findOneAndUpdate({ _id: ObjectId(uid) }, { $push: { vehicles: req.body } }, { new: true })
        .then((user: IUserDoc) => {
            if (user && user.vehicles) {
                return res.json({ vehicles: user.vehicles });
            }
            return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
        })
        .catch(err => {
            console.error('Error when adding a new user vehicle');
            console.error(req.body);
            console.error(err);
            res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
        });
};


export const getUserVehicleHandler = (req: Request & { tokenContent?: any }, res: Response) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id')

    UserModel.findOne({ _id: ObjectId(uid) }, { vehicles: { $elemMatch: { _id: ObjectId(id) } } })
        .then((user: IUserDoc) => {
            if (user) {
                return res.json({ vehicle: user.vehicles.pop() })
            }
            return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
        })
        .catch(err => {
            console.error('Error when getting vehicle user');
            console.error(req.body);
            console.error(err);
            res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
        });
};


export const updateUserVehicleHandler = (req: Request & { tokenContent?: any }, res: Response) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id')
    req.body._id = id
    /*
    // UPDATE WHOLE DOCUMENT
db.users.update(
    {_id: ObjectId('5caf55597aa92d612e2c935c'), 'vehicles._id': ObjectId('5caf7f9da01420418b375c0a')}, 
    { $set: { 'vehicles.$': { _id: ObjectId('5caf7f9da01420418b375c0a'),  date: '2020-01-01', time: '09:00:00'}  }  })

    // UPDATE ONE PART OF DOCUMENT
db.users.update({_id: ObjectId('5caf55597aa92d612e2c935c'), 'vehicles._id': ObjectId('5caf7f9da01420418b375c0a')}, 
    { $set: { 'vehicles.$.date': '2021-01-01', 'vehicles.$.time': '08:00'  }  })
    */
    UserModel.updateOne({ _id: ObjectId(uid), 'vehicles._id': ObjectId(id) }, { $set: { 'vehicles.$': req.body } }, { new: true })
        .then((user: IUserDoc) => {
            console.log(user)
            if (user) {
                return res.json({ user });
            }
            return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
        })
        .catch(err => {
            console.error('Error when updating vehicle user');
            console.error(req.body);
            console.error(err);
            res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
        });
};


export const deleteUserVehicleHandler = (req: Request & { tokenContent?: any }, res: Response) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id')

    UserModel.updateOne({ _id: ObjectId(uid) }, { $pull: { vehicles: { _id: ObjectId(id) } } })
        .then((user: IUserDoc) => {
            if (user) {
                return res.json({ user });
            }
            return res.status(400).json({ error: { code: 400, message: 'User vehicles not found' } });
        })
        .catch(err => {
            console.error('Error when deleting vehicle user');
            console.error(req.body);
            console.error(err);
            res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
        });
};


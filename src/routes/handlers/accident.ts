import * as mongoose from 'mongoose';
import { UserModel, IUserDoc } from '../../models/user';
import { Request, Response } from "express";
import { uploadImagesUrlAsync } from '../../providers/imgur/imgur';
const ObjectId = mongoose.Types.ObjectId;


export const getUserAccidentsHandler = (req: Request & { tokenContent?: any }, res: Response) => {
    const uid = req.tokenContent.userId;

    UserModel.findOne({ _id: ObjectId(uid) }, { accidents: 1 })
        .then((user: IUserDoc) => {
            if (user.accidents) {
                return res.json(user.accidents)
            }
            return res.status(400).json({ error: { code: 400, message: 'User accidents not found' } });
        })
        .catch(err => {
            console.error('Error when getting user accidents');
            console.error(req.body);
            console.error(err);
            res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
        });
};


export const newUserAccidentHandler = async (req: Request & { tokenContent?: any }, res: Response) => {
    const uid = req.tokenContent.userId;
    const { date, time, images } = req.body;
    if (!date || !time || !images) {
        return res.status(400).json({ error: { code: 400, message: 'Missing data for accident creation' } });
    }

    // upload images to imgur and replace old by new url
    const urls = await uploadImagesUrlAsync(images)
    req.body.images = images.map((value, i) => {
        value.imageUrl = urls[i] // new urls
        return value
    })

    UserModel.findOneAndUpdate({ _id: ObjectId(uid) }, { $push: { accidents: req.body } }, { new: true })
        .then((user: IUserDoc) => {
            if (user && user.accidents) {
                return res.json({ accidents: user.accidents });
            }
            return res.status(400).json({ error: { code: 400, message: 'User accidents not found' } });
        })
        .catch(err => {
            console.error('Error when adding a new user accident');
            console.error(req.body);
            console.error(err);
            res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
        });
};


export const getUserAccidentHandler = (req: Request & { tokenContent?: any }, res: Response) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id')

    UserModel.findOne({ _id: ObjectId(uid) }, { accidents: { $elemMatch: { _id: ObjectId(id) } } })
        .then((user: IUserDoc) => {
            if (user && user.accidents) {
                return res.json({ accident: user.accidents.pop() })
            }
            return res.status(400).json({ error: { code: 400, message: 'User accidents not found' } });
        })
        .catch(err => {
            console.error('Error when getting accident user');
            console.error(req.body);
            console.error(err);
            res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
        });
};


export const updateUserAccidentHandler = (req: Request & { tokenContent?: any }, res: Response) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id')
    req.body._id = id
    /*
    // UPDATE WHOLE DOCUMENT
db.users.update(
    {_id: ObjectId('5caf55597aa92d612e2c935c'), 'accidents._id': ObjectId('5caf7f9da01420418b375c0a')}, 
    { $set: { 'accidents.$': { _id: ObjectId('5caf7f9da01420418b375c0a'),  date: '2020-01-01', time: '09:00:00'}  }  })

    // UPDATE ONE PART OF DOCUMENT
db.users.update({_id: ObjectId('5caf55597aa92d612e2c935c'), 'accidents._id': ObjectId('5caf7f9da01420418b375c0a')}, 
    { $set: { 'accidents.$.date': '2021-01-01', 'accidents.$.time': '08:00'  }  })
    */
    UserModel.findOneAndUpdate({ _id: ObjectId(uid), 'accidents._id': ObjectId(id) }, { $set: { 'accidents.$': req.body } }, { new: true })
        .then((user: IUserDoc) => {
            console.log(user)
            if (user) {
                return res.json({ user });
            }
            return res.status(400).json({ error: { code: 400, message: 'User accidents not found' } });
        })
        .catch(err => {
            console.error('Error when updating accident user');
            console.error(req.body);
            console.error(err);
            res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
        });
};


export const deleteUserAccidentHandler = (req: Request & { tokenContent?: any }, res: Response) => {
    const uid = req.tokenContent.userId;
    const id = req.param('id')

    UserModel.updateOne({ _id: ObjectId(uid) }, { $pull: { accidents: { _id: ObjectId(id) } } })
        .then((user: IUserDoc) => {
            if (user) {
                return res.json({ user });
            }
            return res.status(400).json({ error: { code: 400, message: 'User accidents not found' } });
        })
        .catch(err => {
            console.error('Error when deleting accident user');
            console.error(req.body);
            console.error(err);
            res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
        });
};


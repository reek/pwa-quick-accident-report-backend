import * as mongoose from 'mongoose';
import * as slackbots from 'slackbots';
import { Request, Response } from "express";
import { UserModel, IUserDoc } from "../../models/user";
const ObjectId = mongoose.Types.ObjectId;


export const getUserHandler = (req: Request & { tokenContent?: any }, res: Response) => {
  const uid = req.tokenContent.userId;
  UserModel.findOne({ _id: ObjectId(uid) }, { password: 0 })
    .then((user: IUserDoc) => {
      if (user) {
        return res.json({ user })
      }
      return res.status(400).json({ error: { code: 400, message: 'User not found' } });
    })
    .catch(err => {
      console.error('Error when getting user');
      console.error(req.body);
      console.error(err);
      res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};

export const updateUserHandler = (req: Request & { tokenContent?: any }, res: Response) => {
  const uid = req.tokenContent.userId;
  // check for password field
  if (req.body.password) {
    req.body.password = UserModel.hashPassword(req.body.password);
  }
  UserModel.findOneAndUpdate({ _id: ObjectId(uid) }, { $set: req.body }, { runValidators: true, new: true })
    .then((user: IUserDoc) => {
      if (user) {
        delete user.password;
        return res.json({ user });
      }
      return res.status(400).json({ error: { code: 400, message: 'User not found' } });
    })
    .catch(err => {
      console.error('Error when updating user');
      console.error(req.body);
      console.error(err);
      res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
    });
};


export const addUserFeedbackHandler = (req: Request & { tokenContent?: any }, res: Response) => {

  // create a bot
  const bot = new slackbots({
    token: process.env.SLACK_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token 
    name: process.env.SLACK_BOT
  });

  bot.on('start', () => {
    // get all channels
    bot.getChannels().then(_ => console.log(_))

    // params: https://api.slack.com/methods/chat.postMessage
    const params = {
      icon_emoji: ':space_invader:' // https://www.webfx.com/tools/emoji-cheat-sheet/
    };

    // define channel: https://my.slack.com/services 
    bot.postMessage(process.env.SLACK_CHANNEL_ID, req.body && req.body.feedback || Date.now(), params)
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: { code: 500, message: err.toString() } }))
  })
}
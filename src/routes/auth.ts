import * as express from 'express';
import * as mongoose from 'mongoose';
import { UserModel, IUserDoc, IUser } from '../models/user';
import { Request, Response } from "express";
import { sendMailWithNewPassword, sendMailResgisterOK } from '../providers/sendgrid/sendgrid';
import { generatePassword } from '../utils/generate.password';

export const authRouter = express.Router()

  // AUTH 

  // registration
  .post('/register', (req: Request & { tokenContent?: any }, res: Response) => {
    // validation
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: { code: 400, message: 'Missing data for user registration' } });
    }

    // check user already exists
    UserModel.findOne({ email })
      .then(user => user !== null) // ensure boolean
      .then(found => {
        console.log(found)
        if (!found) {
          const user = new UserModel(req.body);
          user.password = UserModel.hashPassword(password)
          user.setAvatar(email)
          user.setUsername(email)
          user.personal.email = email

          // send confirmation mail
          sendMailResgisterOK(email)
          return user.save()
        }
        return null;
      })
      .then(user => {
        if (user) {
          res.json({ user, token: user.getToken() });
          return sendMailResgisterOK(email)
        }
        res.status(400).json({ error: { code: 400, message: 'User already exists' } });
      })
      .catch(err => {
        console.error('Error when trying register');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
      });
  })

  // login
  .post('/login', (req: Request & { tokenContent?: any }, res: Response) => {
    // validation
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: { code: 400, message: 'Missing data for login' } });
    }

    UserModel.findOne({ email })
      .then(user => {
        if (user && user.comparePassword(password)) {
          const userModel: IUser = user.toJSON();
          delete userModel.password;
          res.json({ user: userModel, token: user.getToken() });
        }
        else {
          res.status(400).json({ error: { code: 400, message: 'Email or password incorrect' } });
        }
      })
      .catch(err => {
        console.error('Error when trying login');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
      });
  })

  // forgot password
  .post('/forgot', (req: Request & { tokenContent?: any }, res: Response) => {
    // validation
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: { code: 400, message: 'Missing email for password recovery' } });
    }

    // send email with new password
    UserModel.findOne({ email })
      .then(user => {
        if (user !== null) {
          res.json({ result: `A email with new password has been sent to ${email}` });
          const newPassword = generatePassword()
          return sendMailWithNewPassword(email, newPassword)
        }
        res.status(400).json({ error: { code: 400, message: 'Email not found' } });
      })
      .catch(err => {
        console.error('Error when trying recovery account');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
      });
  })

  // check if email exists
  .post('/check/email', (req: Request & { tokenContent?: any }, res: Response) => {
    // validation
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: { code: 400, message: 'Missing email for verify' } });
    }

    UserModel.findOne({ email })
      .then(user => {
        if (user)
          return res.json({ exists: true });
        res.json({ exists: false });
      })
      .catch(err => {
        console.error('Error when trying check email');
        console.error(req.body);
        console.error(err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error' } });
      });
  })



import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { UserModel, IUser } from '../models/user';
import { Request, Response } from "express";
import { sendMailWithResetPasswordLink, sendMailResgisterOK } from '../providers/sendgrid/sendgrid';

export const authRouter = express.Router()

  // AUTH 

  // registration
  .post('/register', (req: Request & { tokenContent?: any }, res: Response) => {
    // validation
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: { code: 400, message: 'Missing data for user registration 😕' } });
    }

    // check user already exists
    UserModel.findOne({ email })
      .then(user => user !== null) // ensure boolean
      .then(found => {
        if (!found) {
          const user = new UserModel(req.body);
          user.verified = false
          user.password = UserModel.hashPassword(password)
          user.setAvatar(email)
          user.setUsername(email)
          return user.save()
        }
        return null;
      })
      .then(user => {
        if (user) {
          res.json({ user, token: user.getToken() });
          return sendMailResgisterOK(email)
        }
        res.status(400).json({ error: { code: 400, message: 'User already exists 😕' } });
      })
      .catch(err => {
        console.error('Error when trying register', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
      });
  })

  // login
  .post('/login', (req: Request & { tokenContent?: any }, res: Response) => {
    // validation
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: { code: 400, message: 'Missing data for login 😕' } });
    }

    UserModel.findOne({ email })
      .then(user => {
        if (user && user.comparePassword(password)) {
          const userModel: IUser = user.toJSON();
          delete userModel.password;
          return res.json({ user: userModel, token: user.getToken() });
        }
        res.status(400).json({ error: { code: 400, message: 'Email or Password incorrect 😕' } });
      })
      .catch(err => {
        console.error('Error when trying login', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
      });
  })

  // forgot password
  .post('/forgot/password', (req: Request & { tokenContent?: any }, res: Response) => {
    // validation
    const { email, baseUrl } = req.body;
    if (!email || !baseUrl) {
      return res.status(400).json({ error: { code: 400, message: 'Missing data for password reseting 😕' } });
    }

    // send email with reset link
    UserModel.findOne({ email })
      .then(user => {
        if (user !== null) {
          const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "48h"
          });
          const link = `${req.body.baseUrl}/${token}`
          sendMailWithResetPasswordLink(email, link)
          return res.json({ message: `A email with a reset password link has been sent to ${email} 😃` });
        }
        res.status(200).json({ message: 'Sorry, no account with this email 😕' });
      })
      .catch(err => {
        console.error('Error when trying recovery account', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
      });
  })

  // reset password
  .post('/reset/password', (req: Request & { tokenContent?: any }, res: Response) => {
    // validation
    const { email, baseUrl } = req.body;
    if (!email || !baseUrl) {
      return res.status(400).json({ error: { code: 400, message: 'Missing data for password reseting 😕' } });
    }

    // send email with reset link
    UserModel.findOne({ email })
      .then(user => {
        if (user !== null) {
          const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "2h"
          });
          const link = `${req.body.baseUrl}/${token}`
          return res.json({ message: `A email with a link has been sent to ${email} 😃` });
        }
        res.status(200).json({ message: 'Sorry, no account with this email 😕' });
      })
      .catch(err => {
        console.error('Error when trying recovery account', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
      });
  })

  // is email taken
  .post('/email/taken', (req: Request & { tokenContent?: any }, res: Response) => {
    // validation
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: { code: 400, message: 'Missing data for email taking 😕' } });
    }

    UserModel.findOne({ email })
      .then(user => {
        if (user)
          return res.json({ exists: true });
        res.json({ exists: false });
      })
      .catch(err => {
        console.error('Error when trying check email', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
      });
  })

  // user email verified
  .post('/email/verified', (req: Request & { tokenContent?: any }, res: Response) => {
    // validation
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: { code: 400, message: 'Missing data for email verification 😕' } });
    }

    UserModel.findOne({ email })
      .then(user => {
        if (user)
          return res.json({ exists: true });
        res.json({ exists: false });
      })
      .catch(err => {
        console.error('Error when trying verify email', req.body, err);
        res.status(500).json({ error: { code: 500, message: 'Internal server error 😬' } });
      });
  })



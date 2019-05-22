
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Md5 } from 'ts-md5';
import { IPersonal, personalSchema } from './personal';
import { IVehicle, vehicleSchema } from './vehicle';
import { IAccident, accidentSchema } from './accident';


// main interface
export interface IUser {
  username: string;
  email: string;
  verified: boolean;
  password?: string;
  avatar: string;
  personal: IPersonal;
  vehicles: IVehicle[];
  accidents: IAccident[];
}

// document interface, define custom methods here
export interface IUserDoc extends mongoose.Document, IUser {
  comparePassword(password: string): boolean;
  getToken(): string;
  setAvatar(email: string): string;
  setUsername(email: string): string;
}

// model interface, define custom static methods here
interface IUserModel extends mongoose.Model<IUserDoc> {
  hashPassword(password: string): string;
}

// scheam definition
export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    max: 50
  },
  email: {
    type: String,
    required: true,
    max: 50
  },
  verified: {
    type: Boolean,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://www.gravatar.com/avatar/userEmailHashedInMd5'
  },
  personal: personalSchema,
  vehicles: [vehicleSchema],
  accidents: [accidentSchema]
});
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ email: 'hashed' });


// Model custom methods
userSchema.method('comparePassword', function (this: IUserDoc, password: string) {
  try {
    return bcrypt.compareSync(password, this.password);
  }
  catch (e) {
    return false;
  }
});

userSchema.method('getToken', function (this: IUserDoc) {
  return jwt.sign({ userId: this._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
});
userSchema.method('setAvatar', function (this: IUserDoc, email: string): void {
  this.avatar = `https://www.gravatar.com/avatar/${Md5.hashStr(email)}`;
});

userSchema.method('setUsername', function (this: IUserDoc, email: string): void {
  this.username = this.email.split("@").shift();
});


// Model custom static methods
userSchema.static('hashPassword', (password: string): string => {
  return bcrypt.hashSync(password)
});


// model generation
export const UserModel = mongoose.model<IUserDoc, IUserModel>('users', userSchema);
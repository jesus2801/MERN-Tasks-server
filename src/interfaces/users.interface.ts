import {Document} from 'mongoose';

export interface reqUser {
  id: number | string;
}

export interface Payload {
  user: reqUser;
}

export interface User {
  name: string;
  email: string;
  password: string;
  register: Date;
}

export interface UserDocument extends Document, User {}

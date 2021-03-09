import {Document} from 'mongoose';

export interface ProjectDocument extends Document {
  name: string;
  email: string;
  password: string;
  register: Date;
}

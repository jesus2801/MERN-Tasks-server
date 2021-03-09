import {Schema, model} from 'mongoose';
import { UserDocument } from '../interfaces/users.interface';

const UsersSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mail: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  register: {
    type: Date,
    default: Date.now(),
  },
});

export default model('User', UsersSchema);

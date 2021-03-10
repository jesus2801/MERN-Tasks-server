import {Document} from 'mongoose';

export interface TaskInterface {
  name: string;
  state: boolean;
  date: Date;
  project: number | string;
}

export interface TaskDocument extends Document, TaskInterface {}

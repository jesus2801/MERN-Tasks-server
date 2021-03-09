import {Document} from 'mongoose';

export interface Project {
  name: string;
  creator: number | string;
}

export interface ProjectDocument extends Document, Project {
  date: Date;
}

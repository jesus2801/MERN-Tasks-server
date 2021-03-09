import {Schema, model} from 'mongoose';
import {ProjectDocument} from '../interfaces/Project.interfaces';

const ProjectSchema = new Schema<ProjectDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default model('Project', ProjectSchema);

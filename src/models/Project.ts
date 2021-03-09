import {Schema, model} from 'mongoose';

const ProjectSchema = new Schema({
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

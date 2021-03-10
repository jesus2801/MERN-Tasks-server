import mongoose, {Schema, model} from 'mongoose';

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
});

export default model('Task', TaskSchema);

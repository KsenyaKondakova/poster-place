import mongoose, { Schema, model, models } from 'mongoose';
import { StarList } from '../types/placesType';

const starSchema = new Schema<StarList>({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  secondName: { type: String, required: true },
  description: { type: String },
  subdescription: { type: String },
  images: [{ type: String }],
});

export const Star = models?.Star || model('Star', starSchema);

import mongoose, { Schema, model, models } from 'mongoose';

interface IUser {
  title: string;
  description: string;
  images: string[];
  category?: IUser | mongoose.Types.ObjectId;
}

const placeSchema = new Schema<IUser>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
});

export const Place = models?.Place || model('Place', placeSchema);

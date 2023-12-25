import { NewsList } from '@/types/placesType';
import mongoose, { Schema, model, models } from 'mongoose';

interface IUser {
  title: string;
  description: string;
  images: string[];
  category?: IUser | mongoose.Types.ObjectId;
  news: NewsList[];
  afisha: string[];
}
const newsSchema = new Schema<NewsList>({
  _id: mongoose.Schema.Types.ObjectId,
  newsName: String,
  newsText: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
});
const placeSchema = new Schema<IUser>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  news: [newsSchema],
  afisha: [{ type: String }],
});

export const Place = models?.Place || model('Place', placeSchema);

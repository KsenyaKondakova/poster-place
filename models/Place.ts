import mongoose, { model, models, Schema } from 'mongoose';

import { NewsList } from '@/types/placesType';

interface IUser {
  title: string;
  description: string;
  images: string[];
  category?: IUser | mongoose.Types.ObjectId;
  news: NewsList[];
  afisha: string[];
  dateImages: string;
  logo: string[];
}
const newsSchema = new Schema<NewsList>({
  _id: mongoose.Schema.Types.ObjectId,
  newsName: String,
  newsText: String,
  date: String,
});
const placeSchema = new Schema<IUser>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  news: [newsSchema],
  afisha: [{ type: String }],
  dateImages: { type: String },
  logo: [{ type: String }],
});

export const Place = models?.Place || model('Place', placeSchema);

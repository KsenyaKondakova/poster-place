import { Schema, model, models } from 'mongoose';

interface IUser {
  title: string;
  description: string;
  images: string[];
}

const placeSchema = new Schema<IUser>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
});

export const Place = models.Place || model('Place', placeSchema);

import { Schema, model, models } from 'mongoose';

interface IUser {
  title: string;
  description: string;
}

const placeSchema = new Schema<IUser>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const Place = models.Place || model('Place', placeSchema);

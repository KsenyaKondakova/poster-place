import mongoose, { model, models, Schema } from 'mongoose';

import { AfishaList } from '@/types/placesType';

const afishaSchema = new Schema<AfishaList>({
  _id: mongoose.Schema.Types.ObjectId,
  image: String,
});
export const Afisha = models?.Afisha || model('Afisha', afishaSchema);

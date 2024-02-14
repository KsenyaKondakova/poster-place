import mongoose, { model, models, Schema } from 'mongoose';

import { NewsList } from '@/types/placesType';

const newsSchema = new Schema<NewsList>({
  _id: mongoose.Schema.Types.ObjectId,
  newsName: String,
  newsText: String,
});
export const News = models?.News || model('News', newsSchema);

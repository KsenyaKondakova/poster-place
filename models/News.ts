import mongoose, { model, models, Schema } from 'mongoose';

import { NewsList } from '@/types/placesType';

const newsSchema = new Schema<NewsList>({
  newsName: String,
  newsText: String,
  date: String,
});
export const News = models?.News || model('News', newsSchema);

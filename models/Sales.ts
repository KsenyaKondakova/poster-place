import { model, models, Schema } from 'mongoose';

interface ISale {
  amount: number;
  date: string;
}

const saleSchema = new Schema<ISale>({
  amount: { type: Number, required: true },
  date: { type: String, required: true },
});

export const Sale = models?.Sale || model('Sale', saleSchema);

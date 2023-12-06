import { Schema, model, models } from 'mongoose';

interface ICategory {
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
});

export const Category = models?.Category || model('Category', categorySchema);

import mongoose, { Schema, model, models } from 'mongoose';

interface ICategory {
  name: string;
  parent?: ICategory | mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId },
});

export const Category = models?.Category || model('Category', categorySchema);

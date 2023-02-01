import mongoose from 'mongoose';
import { ICategory } from '@src/entities/category';

export type Category = ICategory;

const schema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  categoryId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: false },
  status: { type: Boolean, required: false },
  classification: { type: String, required: true },
});

export const Category = mongoose.model<Category>('Category', schema);

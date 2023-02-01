import mongoose from 'mongoose';
import { IProduct } from '@src/entities/product';

export type Product = IProduct;

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

export const Product = mongoose.model<Product>('Product', schema);

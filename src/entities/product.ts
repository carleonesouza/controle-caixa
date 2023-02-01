import { Category } from '@src/models/category';

export interface IProduct {
  name: string;
  category: Category;
  quantity: number;
  price: number;
  volume: number;
  classification: string;
  status: boolean;
}

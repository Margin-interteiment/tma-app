import { Category } from './enums';
export interface ProductItem{
  id:number;
  title: string;
  price: number;
  imageUrl:string;
  category: Category;
}
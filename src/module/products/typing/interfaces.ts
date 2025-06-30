import { Category, Color, Brands, Size } from './enums';
export interface ProductItem{
  id:number;
  title: string;
  price: number;
  imageUrl: string[];
  description: string;
  category: Category;
  sizes: Size[];
  colors: Color[];
  brand: Brands;
  details: { label: string; value: string }[];
}
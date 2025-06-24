import { Category, Color, Brands, Size } from './enums';
export interface ProductItem{
  id:number;
  title: string;
  price: number;
  imageUrl:string;
  category: Category;
  size: Size[];
  color: Color[];
  brand: Brands;

}
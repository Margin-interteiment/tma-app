import { ProductItem } from '../module/products/typing/interfaces';
import { Category } from '../module/products/typing/enums';

export const products:ProductItem[] =[
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max",
    price: 43400,
    imageUrl:"https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/65038654434d0-iPhone%2015%20Pro%20Natural%20titanium%20png.png",
    category: Category.IOS
  },
  {
    id:2,
    title: "Apple iPhone 14 Pro",
    price: 28000,
    imageUrl: "/images/tel2.1.png",
    category: Category.IOS
  }, 
  {
    id:3,
    title: "Samsung  Galaxy S24 Ultra",
    price: 32500,
    imageUrl: "/images/tel3.1.png",
    category: Category.Android
  }, 
  {
    id:4,
    title: "Samsung Galaxy Z Fold5",
    price: 40500,
    imageUrl: "/images/tel4.1.png",
    category: Category.Android
  }, 
  {
    id:5,
    title: "Huawei Mate 60 Pro+",
    price: 57000,
    imageUrl: "/images/tel5.1.png",
    category: Category.Android
  }, 
  {
    id:6,
    title: "Huawei P60 Art",
    price: 41000,
    imageUrl: "/images/tel6.1.png",
    category: Category.Android
  }, 
  {
    id:7,
    title: "Sony Xperia 1 VI",
    price: 26100,
    imageUrl: "/images/tel7.1.png",
    category: Category.Android
  }, 
  {
    id:8,
    title: "Google Pixel 8 Pro",
    price: 20000,
    imageUrl: "/images/tel8.1.png",
    category: Category.Android
  }, 
  {
    id:9,
    title: "Xiaomi 14 Ultra",
    price: 22000,
    imageUrl: "/images/tel9.1.png",
    category: Category.Android
  }, 
  {
    id:10,
    title: "Asus ROG Phone 8 Pro",
    price: 60000,
    imageUrl: "/images/tel10.1.png",
    category: Category.Android
  }, 
]
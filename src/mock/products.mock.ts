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
    imageUrl: "https://applehome.te.ua/wp-content/uploads/2024/03/25153.750.jpeg",
    category: Category.IOS
  }, 
  {
    id:3,
    title: "Samsung  Galaxy S24 Ultra",
    price: 32500,
    imageUrl: "https://sota.store/image/cache/catalog/Samsung-3/samsung-s24-ultra-s928-grey-03-1024x1024.webp",
    category: Category.Android
  }, 
  {
    id:4,
    title: "Samsung Galaxy Z Fold5",
    price: 40500,
    imageUrl: "https://hotline.ua/img/tx/398/3989389215.jpg",
    category: Category.Android
  }, 
  {
    id:5,
    title: "Huawei Mate 60 Pro+",
    price: 57000,
    imageUrl: "https://ae04.alicdn.com/kf/S40d38f6e3b6942cab1fe79f71ae76121u.jpg",
    category: Category.Android
  }, 
  {
    id:6,
    title: "Huawei P60 Art",
    price: 41000,
    imageUrl: "https://cdn-files.kimovil.com/default/0008/54/thumb_753144_default_big.jpg",
    category: Category.Android
  }, 
  {
    id:7,
    title: "Sony Xperia 1 VI",
    price: 26100,
    imageUrl: "https://mobileplanet.ua/uploads/product/2024-8-8/sony-xperia-1-vi-12-256gb-platinum-silve-320531.webp",
    category: Category.Android
  }, 
  {
    id:8,
    title: "Google Pixel 8 Pro",
    price: 20000,
    imageUrl: "https://mobileplanet.ua/uploads/product/2023-10-25/google-pixel-8-pro-12-128gb-porcelain-291193.webp",
    category: Category.Android
  }, 
  {
    id:9,
    title: "Xiaomi 14 Ultra",
    price: 22000,
    imageUrl: "https://www.mijia-shop.ru/wp-content/uploads/2024/02/Xiaomi-14-Ultra-3.jpg",
    category: Category.Android
  }, 
  {
    id:10,
    title: "Asus ROG Phone 8 Pro",
    price: 60000,
    imageUrl: "https://pcshop.ua/image/cache/webp/catalog/tovar/smartfon-asus-rog-phone-8-pro-24-1tb-phantom-black-global-1024x768.webp",
    category: Category.Android
  }, 
]
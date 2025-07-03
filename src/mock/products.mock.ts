import { ProductItem } from '../module/products/typing/interfaces';
import { Category, Color, Brands,Size } from '../module/products/typing/enums';

export const products: ProductItem[] = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro",
    price: 43400,
    imageUrl: [
      "https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/65038654434d0-iPhone%2015%20Pro%20Natural%20titanium%20png.png",
      "/images/iphone15-2.1.png",
      "/images/iphone-15-3.1.png",
      "/images/iphone15-4.1.png"
    ],
    category: Category.IOS,
    sizes: [Size.S15],
    colors: [Color.Black, Color.Grey, Color.White, Color.Blue, Color.Gold],
    brand: Brands.Apple,
    description: "Новітній iPhone 15 Pro Max з титановим корпусом та надпотужним процесором A17.",
    details: [
      { label: "Операційна система", value: "iOS 17" },
      { label: "Роздільна здатність", value: "2796 x 1290" },
      { label: "Частота оновлення", value: "120 Гц" },
      { label: "Оперативна памʼять", value: "8 ГБ" }
    ]
  },
  {
    id: 2,
    title: "Apple iPhone 14 Pro",
    price: 28000,
    imageUrl: [
      "/images/tel2.1.png",
      "/images/iphone14-2.1.png",
      "/images/iphone14-3.1.png",
      "/images/iphone14-4.1.png"
    ],
    category: Category.IOS,
    sizes: [Size.S14],
    colors: [Color.Black, Color.White, Color.Gold],
    brand: Brands.Apple,
    description: "Флагманський смартфон Apple 2022 року з Dynamic Island.",
    details: [
      { label: "Операційна система", value: "iOS 16" },
      { label: "Роздільна здатність", value: "2556 x 1179" },
      { label: "Частота оновлення", value: "120 Гц" },
      { label: "Оперативна памʼять", value: "6 ГБ" }
    ]
  },
  {
    id: 3,
    title: "Samsung Galaxy S24",
    price: 32500,
    imageUrl: [
      "/images/tel3.1.png",
      "/images/samsungS24-2.1.png",
      "/images/samsungS24-3.1.png",
      "/images/samsungS24-4.1.png"
    ],
    category: Category.Android,
    sizes: [Size.S12],
    colors: [Color.Black, Color.Grey, Color.White, Color.Blue],
    brand: Brands.Samsung,
    description: "Потужний смартфон з підтримкою стилуса S Pen та камерою 200 МП.",
    details: [
      { label: "Операційна система", value: "Android 14" },
      { label: "Роздільна здатність", value: "3120 x 1440" },
      { label: "Частота оновлення", value: "120 Гц" },
      { label: "Оперативна памʼять", value: "12 ГБ" }
    ]
  },
  {
    id: 4,
    title: "Samsung Galaxy F5",
    price: 40500,
    imageUrl: [
      "/images/tel4.1.png",
      "/images/samsungZ-2.1.png",
      "/images/samsungZ-3.1.png",
      "/images/samsungZ-4.1.png"
    ],
    category: Category.New,
    sizes: [Size.S13],
    colors: [Color.Black],
    brand: Brands.Samsung,
    description: "Складний смартфон нового покоління з гнучким екраном.",
    details: [
      { label: "Операційна система", value: "Android 13" },
      { label: "Роздільна здатність", value: "2176 x 1812" },
      { label: "Частота оновлення", value: "120 Гц" },
      { label: "Оперативна памʼять", value: "12 ГБ" }
    ]
  },
  {
    id: 5,
    title: "Huawei Mate 60 Pro",
    price: 57000,
    imageUrl: [
      "/images/tel5.1.png",
      "/images/huawei60-2.1.png",
      "/images/huawei60-3.1.png",
      "/images/huawei60-4.1.png"
    ],
    category: Category.Android,
    sizes: [Size.S14, Size.S16],
    colors: [Color.Black, Color.Grey, Color.White],
    brand: Brands.Huawei,
    description: "Інноваційний флагман з суперкерамічним корпусом.",
    details: [
      { label: "Операційна система", value: "HarmonyOS" },
      { label: "Роздільна здатність", value: "2720 x 1260" },
      { label: "Частота оновлення", value: "120 Гц" },
      { label: "Оперативна памʼять", value: "16 ГБ" }
    ]
  },
  {
    id: 6,
    title: "Huawei Art Mate",
    price: 41000,
    imageUrl: [
      "/images/tel6.1.png",
      "/images/huaweiArt-2.1.png",
      "/images/huaweiArt-3.1.png",
      "/images/huaweiArt-4.1.png"
    ],
    category: Category.New,
    sizes: [Size.S13, Size.S14],
    colors: [Color.Black, Color.Grey, Color.White],
    brand: Brands.Huawei,
    description: "Дизайнерський флагман Huawei з камерою Leica.",
    details: [
      { label: "Операційна система", value: "HarmonyOS" },
      { label: "Роздільна здатність", value: "2700 x 1220" },
      { label: "Частота оновлення", value: "120 Гц" },
      { label: "Оперативна памʼять", value: "12 ГБ" }
    ]
  },
  {
    id: 7,
    title: "Sony Xperia 1 VI",
    price: 26100,
    imageUrl: [
      "/images/tel7.1.png",
      "/images/sony-2.1.png",
      "/images/sony-3.1.png",
      "/images/sony-4.1.png"
    ],
    category: Category.Android,
    sizes: [Size.S12],
    colors: [Color.Black, Color.Grey, Color.White],
    brand: Brands.Sony,
    description: "Смартфон для справжніх фанатів Sony та творчості.",
    details: [
      { label: "Операційна система", value: "Android 14" },
      { label: "Роздільна здатність", value: "3840 x 1644" },
      { label: "Частота оновлення", value: "120 Гц" },
      { label: "Оперативна памʼять", value: "12 ГБ" }
    ]
  },
  {
    id: 8,
    title: "Google Pixel Pro",
    price: 20000,
    imageUrl: [
      "/images/tel8.1.png",
      "/images/google-2.1.png",
      "/images/google-3.1.png",
      "/images/google-4.1.png"
    ],
    category: Category.Android,
    sizes: [Size.S12],
    colors: [Color.Black, Color.Grey, Color.White],
    brand: Brands.Google,
    description: "Флагман Google з унікальними AI-функціями.",
    details: [
      { label: "Операційна система", value: "Android 14" },
      { label: "Роздільна здатність", value: "2992 x 1344" },
      { label: "Частота оновлення", value: "120 Гц" },
      { label: "Оперативна памʼять", value: "12 ГБ" }
    ]
  },
  {
    id: 9,
    title: "Xiaomi 14P Ultra",
    price: 22000,
    imageUrl: [
      "/images/tel9.1.png",
      "/images/xiaomi-2.1.png",
      "/images/xiaomi-3.1.png",
      "/images/xiaomi-4.1.png"
    ],
    category: Category.New,
    sizes: [Size.S12, Size.S13],
    colors: [Color.Black, Color.Grey, Color.White],
    brand: Brands.Xiaomi,
    description: "Флагман Xiaomi з передовими камерами від Leica.",
    details: [
      { label: "Операційна система", value: "Android 14" },
      { label: "Роздільна здатність", value: "3200 x 1440" },
      { label: "Частота оновлення", value: "120 Гц" },
      { label: "Оперативна памʼять", value: "16 ГБ" }
    ]
  },
  {
    id: 10,
    title: "Asus ROG Phone 8 Pro",
    price: 60000,
    imageUrl: [
      "/images/tel10.1.png",
      "/images/asus-2.1.png",
      "/images/asus-3.1.png",
      "/images/asus-4.1.png"
    ],
    category: Category.Android,
    sizes: [Size.S15, Size.S14],
    colors: [Color.Black, Color.Grey, Color.White],
    brand: Brands.Asus,
    description: "Геймерський смартфон із RGB-підсвіткою та системою охолодження.",
    details: [
      { label: "Операційна система", value: "Android 14" },
      { label: "Роздільна здатність", value: "2448 x 1116" },
      { label: "Частота оновлення", value: "165 Гц" },
      { label: "Оперативна памʼять", value: "16 ГБ" }
    ]
  }
];

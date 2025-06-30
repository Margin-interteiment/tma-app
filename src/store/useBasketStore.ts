import { create } from "zustand";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  color?: string,
};

type BasketStore = {
  items: Product[];
  addToBasket: (product: Product) => void;
  addToQuantity: (id: number) => void;
  removeToQuantity: (id: number) => void;
  removeItem:(id: number) => void;
};

export const useBasketStore = create<BasketStore>((set, get) => ({
  items: [],
  addToBasket: (product) => {
    const existing = get().items.find((item) => item.id === product.id);

    if (existing) {
      
      set({
        items: get().items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        ),
      });
    } else {
      set({
        items: [...get().items, { ...product, quantity: 1 }],
      });
    }
  },
  addToQuantity: (id:number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ),
    })),
    removeToQuantity: (id:number) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id && (item.quantity || 1) > 1
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        ),
      })),
      removeItem:(id:number) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
}));
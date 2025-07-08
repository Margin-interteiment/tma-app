
import { create } from "zustand";

type PersonalData = {
  id: number;
  name: string;
  surname: string;
  telephone: number;
  username:string;
  quantity?: number;
};

type PersonalDataStore = {
  item: PersonalData | null;
  setPerson: (item: PersonalData) => void;
};

export const usePersonStore = create<PersonalDataStore>((set) => ({
  item: null,
  setPerson: (item) => set({ item }),
}));

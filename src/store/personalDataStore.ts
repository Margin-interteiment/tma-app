import { create } from "zustand";

type PersonalData = {
  id: number;
  name: string;
  surname: string;
  telephone: number;
  username: string;
  firstName?: string;
  birthDate?: string;
};

type PersonalDataStore = {
  persona: PersonalData | null;
  setPerson: (persona: PersonalData) => void;
};

export const usePersonStore = create<PersonalDataStore>((set) => ({
  persona: null,
  setPerson: (persona) => set({ persona }),
}));


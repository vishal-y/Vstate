import { create } from 'zustand';

export const useListStore = create((set) => ({
  isProfile: false,
  setIsProfile: (value) => set({ isProfile: value }), // Fixed this line
}));

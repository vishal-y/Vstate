import { create } from 'zustand';

const useUniChat = create((set) => ({
  uniChat : "",
  setUniChat : (value) => set({ chatId: value }), 
}));

export default useUniChat;
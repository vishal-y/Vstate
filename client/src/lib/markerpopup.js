import { create } from 'zustand'

export const useOpenPopup = create((set) => ({
  OpenPopup: {
    isPop: false,
    id: ""
  },
  setOpenPopup: (isPop, id) => set(() => ({
    OpenPopup: {
      isPop,
      id
    }
  })),
}))

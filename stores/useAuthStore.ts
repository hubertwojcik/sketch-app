import { create } from "zustand";

interface IAuthStore {
  isLoggedIn: boolean;
  logout: () => void;
  login: () => void;
}

const useAuthStore = create<IAuthStore>((set) => ({
  isLoggedIn: false,
  login: () => set(() => ({ isLoggedIn: true })),
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;

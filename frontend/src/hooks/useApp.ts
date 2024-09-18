import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IAppState {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useApp = create<IAppState>()(
  persist(
    (set) => ({
      isLoading: false,
      setIsLoading: (value) => set({ isLoading: value }),
    }),
    {
      name: "@fullstack",
      partialize: (state) => ({ isLoading: state.isLoading }),
    }
  )
);

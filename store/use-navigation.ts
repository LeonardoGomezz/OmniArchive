import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NavigationState {
  activeSection: string;
  isCollapsed: boolean;
  setActiveSection: (section: string) => void;
  toggleCollapsed: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useNavigation = create<NavigationState>()(
  persist(
    (set) => ({
      activeSection: "characters",
      isCollapsed: false,
      setActiveSection: (section) => set({ activeSection: section }),
      toggleCollapsed: () =>
        set((state) => ({ isCollapsed: !state.isCollapsed })),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
    }),
    {
      name: "navigation-storage",
    },
  ),
);

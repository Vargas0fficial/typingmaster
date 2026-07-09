import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FontSize = "sm" | "md" | "lg";

interface SettingsState {
  soundEnabled: boolean;
  testDuration: 15 | 30 | 60 | 120;
  fontSize: FontSize;
  showVirtualKeyboard: boolean;
  setSoundEnabled: (val: boolean) => void;
  setTestDuration: (val: 15 | 30 | 60 | 120) => void;
  setFontSize: (val: FontSize) => void;
  setShowVirtualKeyboard: (val: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      soundEnabled: true,
      testDuration: 60,
      fontSize: "md",
      showVirtualKeyboard: true,
      setSoundEnabled: (val) => set({ soundEnabled: val }),
      setTestDuration: (val) => set({ testDuration: val }),
      setFontSize: (val) => set({ fontSize: val }),
      setShowVirtualKeyboard: (val) => set({ showVirtualKeyboard: val }),
    }),
    { name: "typingmaster-settings" }
  )
);
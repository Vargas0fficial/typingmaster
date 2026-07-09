import { create } from "zustand";

export type TypingMode = "English" | "Tagalog";
export type PracticeTime = 30 | 60 | 120;
export type AppStatus = "START" | "PRACTICING" | "PAUSED" | "FINISHED";

interface PracticeState {
  mode: TypingMode;
  duration: PracticeTime;
  status: AppStatus;
  setMode: (mode: TypingMode) => void;
  setDuration: (duration: PracticeTime) => void;
  setStatus: (status: AppStatus) => void;
  resetSettings: () => void;
}

export const usePracticeStore = create<PracticeState>((set) => ({
  mode: "English",
  duration: 60,
  status: "START",
  
  setMode: (mode) => set({ mode }),
  setDuration: (duration) => set({ duration }),
  setStatus: (status) => set({ status }),
  resetSettings: () => set({ mode: "English", duration: 60, status: "START" }),
}));
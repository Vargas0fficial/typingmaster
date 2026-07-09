import { create } from "zustand";
import { getQuickStats } from "@/app/actions/score";

interface QuickStats {
    avgWpm: number;
    bestWpm: number;
    totalTests: number;
    avgAcc: number;
}

interface StatsState {
    dbStats: QuickStats;
    refreshStats: () => Promise<void>;
}

export const useStatsStore = create<StatsState>((set) => ({
    dbStats: { avgWpm: 0, bestWpm: 0, totalTests: 0, avgAcc: 100 },
    refreshStats: async () => {
        const stats = await getQuickStats();
        set({ dbStats: stats });
    },
}));
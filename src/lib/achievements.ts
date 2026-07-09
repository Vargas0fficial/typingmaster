import { Target, Flame, BookOpen, Trophy, Zap, Bolt, CloudLightning, TrendingUp, LucideIcon } from "lucide-react";

export interface AchievementStats {
    totalTests: number;
    bestWpm: number;
    avgAcc: number;
}

export interface Achievement {
    id: string;
    label: string;
    description: string;
    icon: LucideIcon;
    unlocked: (stats: AchievementStats) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
    { id: "first-steps", label: "First Steps", description: "Complete your first typing test", icon: Target, unlocked: (s) => s.totalTests >= 1 },
    { id: "warming-up", label: "Warming Up", description: "Complete 10 typing tests", icon: Flame, unlocked: (s) => s.totalTests >= 10 },
    { id: "dedicated", label: "Dedicated Typist", description: "Complete 50 typing tests", icon: BookOpen, unlocked: (s) => s.totalTests >= 50 },
    { id: "century", label: "Century Club", description: "Complete 100 typing tests", icon: Trophy, unlocked: (s) => s.totalTests >= 100 },
    { id: "speed-runner", label: "Speed Runner", description: "Reach 40 WPM", icon: Zap, unlocked: (s) => s.bestWpm >= 40 },
    { id: "speed-demon", label: "Speed Demon", description: "Reach 60 WPM", icon: Bolt, unlocked: (s) => s.bestWpm >= 60 },
    { id: "lightning", label: "Lightning Fingers", description: "Reach 80 WPM", icon: CloudLightning, unlocked: (s) => s.bestWpm >= 80 },
    { id: "consistent", label: "Consistent", description: "Maintain 90%+ average accuracy", icon: TrendingUp, unlocked: (s) => s.avgAcc >= 90 },
];
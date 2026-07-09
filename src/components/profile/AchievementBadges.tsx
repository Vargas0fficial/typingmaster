"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ACHIEVEMENTS, AchievementStats } from "@/lib/achievements";
import { Sparkles } from "@/components/effects/Sparkles";

export function AchievementBadges({ stats }: { stats: AchievementStats }) {
    const unlockedIds = ACHIEVEMENTS.filter((a) => a.unlocked(stats)).map((a) => a.id);
    const unlockedCount = unlockedIds.length;
    const prevUnlockedRef = useRef<string[]>(unlockedIds);
    const [sparklingId, setSparklingId] = useState<string | null>(null);

    useEffect(() => {
        const newlyUnlocked = unlockedIds.find((id) => !prevUnlockedRef.current.includes(id));
        if (newlyUnlocked) {
            setSparklingId(newlyUnlocked);
        }
        prevUnlockedRef.current = unlockedIds;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unlockedIds.join(",")]);

    return (
        <div className="bg-[#0e1322] border border-zinc-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Achievements</span>
                <span className="text-xs text-zinc-500">
                    {unlockedCount}/{ACHIEVEMENTS.length} unlocked
                </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ACHIEVEMENTS.map((a, i) => {
                    const unlocked = a.unlocked(stats);
                    const Icon = a.icon;
                    return (
                        <motion.div
                            key={a.id}
                            title={a.description}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05, type: "spring", stiffness: 260, damping: 20 }}
                            whileHover={unlocked ? { scale: 1.05, y: -3 } : {}}
                            className={`relative flex flex-col items-center text-center p-4 rounded-xl border transition-colors ${unlocked ? "border-blue-600/30 bg-blue-600/5" : "border-zinc-900 bg-[#0b0f19]/40 opacity-40"
                                }`}
                        >
                            {sparklingId === a.id && (
                                <Sparkles trigger={true} onComplete={() => setSparklingId(null)} count={20} />
                            )}
                            <motion.div
                                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${unlocked ? "bg-blue-600/10" : "bg-zinc-800/50"}`}
                                animate={unlocked ? { boxShadow: ["0 0 0px #3b82f6", "0 0 12px #3b82f640", "0 0 0px #3b82f6"] } : {}}
                                transition={unlocked ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
                            >
                                <Icon className={`w-5 h-5 ${unlocked ? "text-blue-400" : "text-zinc-600"}`} />
                            </motion.div>
                            <span className={`text-xs font-semibold ${unlocked ? "text-zinc-200" : "text-zinc-600"}`}>{a.label}</span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
"use client";

import { motion, AnimatePresence } from "framer-motion";

interface StatsBarProps {
    wpm: number;
    accuracy: number;
    timeLeft: number;
    errors: number;
    isSaving: boolean;
}

export function StatsBar({ wpm, accuracy, timeLeft, errors, isSaving }: StatsBarProps) {
    return (
        <div className="grid grid-cols-5 gap-4">
            <StatCard label="WPM" value={wpm} valueClass="text-blue-500" />
            <StatCard label="Accuracy" value={`${accuracy}%`} valueClass="text-emerald-500" />
            <StatCard
                label="Time"
                value={`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
                valueClass="text-purple-400"
                noPop
            />
            <StatCard label="Errors" value={errors} valueClass="text-rose-500" />
            <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0e1322] border border-zinc-900 p-4 rounded-xl text-center"
            >
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Status</div>
                <div className="text-xs font-bold text-zinc-400 mt-2.5">
                    {isSaving ? (
                        <motion.span
                            className="text-amber-400"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        >
                            SAVING SCORE...
                        </motion.span>
                    ) : (
                        <span className="text-zinc-500">READY</span>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

function StatCard({
    label,
    value,
    valueClass,
    noPop,
}: {
    label: string;
    value: string | number;
    valueClass: string;
    noPop?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0e1322] border border-zinc-900 p-4 rounded-xl text-center overflow-hidden"
        >
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">{label}</div>
            <div className={`text-2xl font-bold mt-1 ${valueClass} relative h-8 flex items-center justify-center`}>
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={noPop ? "static" : value}
                        initial={noPop ? false : { y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {value}
                    </motion.span>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
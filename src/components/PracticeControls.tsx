"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";

interface PracticeControlsProps {
    isActive: boolean;
    isFinished: boolean;
    hasStarted: boolean;
    onPauseToggle: () => void;
    onRestart: () => void;
}

export function PracticeControls({
    isActive,
    isFinished,
    hasStarted,
    onPauseToggle,
    onRestart,
}: PracticeControlsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-64 space-y-4"
        >
            <div className="bg-[#0e1322] border border-zinc-900 rounded-xl p-5 space-y-5">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Practice Settings</h3>
                <div className="space-y-2 pt-2">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={onPauseToggle}
                        disabled={isFinished || !hasStarted}
                        className={`w-full py-2.5 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition-colors ${isActive ? "bg-amber-600 hover:bg-amber-500" : "bg-blue-600 hover:bg-blue-500"
                            }`}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={isActive ? "pause" : "resume"}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-2"
                            >
                                {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                {isActive ? "Pause" : "Resume"}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96, rotate: -15 }}
                        onClick={onRestart}
                        className="w-full py-2.5 bg-transparent hover:bg-zinc-900 border border-zinc-900 text-zinc-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Restart
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
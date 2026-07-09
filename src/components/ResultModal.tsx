"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, RotateCcw } from "lucide-react";
import { Sparkles } from "@/components/effects/Sparkles";

interface ResultModalProps {
    show: boolean;
    onClose: () => void;
    onRestart: () => void;
    wpm: number;
    accuracy: number;
    errors: number;
}

export function ResultModal({ show, onClose, onRestart, wpm, accuracy, errors }: ResultModalProps) {
    const isGreatRun = accuracy >= 95;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                        className="bg-[#0e1322] border border-zinc-800 rounded-2xl p-6 max-w-sm w-full mx-4 relative shadow-2xl shadow-blue-500/10 overflow-visible"
                    >
                        <Sparkles trigger={show} count={isGreatRun ? 36 : 22} />

                        <button
                            onClick={onClose}
                            className="absolute top-4 w-8 h-8 rounded-lg flex items-center justify-center right-4 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors z-10"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <motion.div
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 15 }}
                                className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400"
                            >
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Trophy className="w-6 h-6" />
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                            >
                                <h3 className="text-lg font-bold text-zinc-100">
                                    {isGreatRun ? "Well done!" : "Great Job!"}
                                </h3>
                                <p className="text-xs text-zinc-400 mt-1">You've completed the typing test.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                className="grid grid-cols-3 gap-3 w-full bg-[#0b0f19] p-4 rounded-xl border border-zinc-900 font-mono"
                            >
                                <div>
                                    <div className="text-[10px] text-zinc-500 font-sans uppercase">WPM</div>
                                    <div className="text-xl font-bold text-blue-400">{wpm}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-zinc-500 font-sans uppercase">Accuracy</div>
                                    <div className="text-xl font-bold text-emerald-400">{accuracy}%</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-zinc-500 font-sans uppercase">Errors</div>
                                    <div className="text-xl font-bold text-rose-500">{errors}</div>
                                </div>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={onRestart}
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/10"
                            >
                                <RotateCcw className="w-3.5 h-3.5" /> Try Again or Press (Esc)
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
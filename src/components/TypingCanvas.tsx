"use client";

import { RefObject } from "react";
import { Globe } from "lucide-react";
import { WordMode, MODE_LABELS } from "@/utils/wordLists";
import { useSettingsStore } from "@/store/settingsStore";
import { motion } from "framer-motion";
interface TypingCanvasProps {
    paragraph: string;
    userInput: string;
    isActive: boolean;
    isFinished: boolean;
    wordMode: WordMode;
    onModeChange: (mode: WordMode) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: RefObject<HTMLInputElement | null>;
}

const MODE_OPTIONS: { value: WordMode; label: string }[] = [
    { value: "mixed", label: "Both" },
    { value: "english", label: "English" },
    { value: "tagalog", label: "Tagalog" },
];

const FONT_SIZE_CLASSES = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
};

export function TypingCanvas({
    paragraph,
    userInput,
    isActive,
    isFinished,
    wordMode,
    onModeChange,
    onInputChange,
    inputRef,
}: TypingCanvasProps) {
    const fontSize = useSettingsStore((s) => s.fontSize);
    const progress = paragraph.length > 0 ? Math.round((userInput.length / paragraph.length) * 100) : 0;

    return (
        <div
            onClick={() => !isFinished && inputRef.current?.focus()}
            className={`bg-[#0e1322] border rounded-xl p-8 relative min-h-[260px] flex flex-col justify-between cursor-text transition-all ${isActive ? "border-blue-500/40 shadow-lg" : "border-zinc-900"
                }`}
        >
            {/* Hidden Input Core - dito talaga napupunta ang totoong focus/typing */}
            <input
                ref={inputRef}
                type="text"
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
                value={userInput}
                onChange={onInputChange}
                disabled={isFinished || (!isActive && userInput.length > 0)}
                autoFocus
            />

            {!isActive && userInput.length > 0 && !isFinished && (
                <div className="absolute inset-0 bg-[#0b0f19]/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10">
                    <span className="text-amber-400 font-bold tracking-widest text-sm uppercase">Game Paused</span>
                </div>
            )}

            <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-blue-500 font-semibold tracking-wider uppercase flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" /> {MODE_LABELS[wordMode]}
                </div>

                <div className="flex rounded-lg border border-zinc-900 p-0.5 bg-[#0b0f19]">
                    {MODE_OPTIONS.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => onModeChange(value)}
                            disabled={isActive}
                            className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md transition-all disabled:opacity-40 disabled:cursor-not-allowed ${wordMode === value ? "bg-blue-600 text-white" : "text-zinc-500 hover:text-zinc-300"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`font-mono leading-relaxed tracking-wide text-left max-w-full ${FONT_SIZE_CLASSES[fontSize]}`}>
                {paragraph.split("").map((char, index) => {
                    let colorClass = "text-zinc-600";
                    const isCurrent = index === userInput.length;

                    if (index < userInput.length) {
                        colorClass =
                            userInput[index] === char
                                ? "text-emerald-400 font-medium"
                                : "text-rose-500 bg-rose-950/30 rounded-sm";
                    }

                    return (
                        <motion.span
                            key={index}
                            animate={isCurrent && isActive ? { opacity: [1, 0.4, 1] } : {}}
                            transition={isCurrent && isActive ? { duration: 0.8, repeat: Infinity } : {}}
                            className={`${colorClass} ${isCurrent && isActive ? "border-b-2 border-blue-400 text-zinc-200" : ""
                                }`}
                        >
                            {char}
                        </motion.span>
                    );
                })}
            </div>

            <div className="mt-8 flex items-center gap-4">
                <div className="flex-1 bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-xs font-mono text-zinc-600">{progress}%</span>
            </div>
        </div>
    );
}
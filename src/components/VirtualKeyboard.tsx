"use client";

import React, { useEffect, useState } from "react";

export function VirtualKeyboard() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // GAR NEW: "pressId" - dumadagdag ito kada keydown, kahit paulit-ulit
  // na yung parehong key (auto-repeat). Ginagamit natin ito bilang React
  // "key" ng spark/glow overlay para palaging mag-restart ang animation
  // sa bawat pindot, hindi lang sa unang beses.
  const [pressId, setPressId] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let key = e.key;
      // I-normalize ang Space at Backspace para tumugma sa layout names
      if (key === " ") key = "Space";
      setActiveKey(key);
      setPressId((id) => id + 1);
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Keyboard Rows data base sa mockup mo
  const rows = [
    ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["Ctrl", "Alt", "Space", "Alt", "Ctrl"]
  ];

  // Helper para sa width styles ng special keys
  const getKeyWidth = (key: string) => {
    switch (key) {
      case "Space": return "flex-[6]";
      case "Backspace": return "w-20 text-[10px]";
      case "Tab": case "\\": return "w-14";
      case "Caps": case "Enter": return "w-[72px]";
      case "Shift": return "w-[92px]";
      case "Ctrl": case "Alt": return "w-12";
      default: return "w-10";
    }
  };

  // Apat na direksyon (N/E/S/W) kung saan lalabas ang spark particles
  const SPARK_ANGLES = [0, 90, 180, 270];

  return (
    <div className="bg-[#0e1322] border border-zinc-900 p-6 rounded-xl space-y-1.5 select-none max-w-3xl mx-auto">
      <span className="text-[10px] text-zinc-600 uppercase tracking-widest block font-semibold text-center mb-3">
        Virtaul Keyboard
      </span>
      <div className="flex flex-col gap-1.5">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1.5 w-full">
            {row.map((key, keyIndex) => {
              // I-check kung active ang key (case-insensitive para sa normal letters)
              const isActive =
                activeKey?.toLowerCase() === key.toLowerCase() ||
                (key === "Space" && activeKey?.toLowerCase() === "space");

              return (
                <div
                  key={keyIndex}
                  className={`relative h-10 ${getKeyWidth(key)} flex items-center justify-center font-mono text-xs rounded-md border transition-all duration-75 ${isActive
                      ? "bg-blue-600 border-blue-500 text-white font-bold scale-95 animate-key-glow"
                      : "bg-[#0b0f19] border-zinc-800/80 text-zinc-400"
                    }`}
                >
                  {key}

                  {/* GAR NEW: Spark burst + glow overlay - lumalabas lang
                      habang aktibo ang key. Gamit natin ang "pressId" bilang
                      key para palaging mag-restart ang animation kada
                      bagong pindot, kahit parehong titik pa rin. */}
                  {isActive && (
                    <React.Fragment key={pressId}>
                      {/* Soft glow blob sa likod ng key */}
                      <span className="pointer-events-none absolute inset-0 rounded-md bg-blue-400/50 blur-md animate-glow-pulse" />

                      {/* 4 na maliliit na kislap na kumakalat pababaw */}
                      {SPARK_ANGLES.map((angle) => (
                        <span
                          key={angle}
                          className="pointer-events-none absolute left-1/2 top-1/2 -ml-0.5 -mt-0.5 w-1 h-1 rounded-full bg-blue-200 animate-spark"
                          style={{ "--spark-angle": `${angle}deg` } as React.CSSProperties}
                        />
                      ))}
                    </React.Fragment>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
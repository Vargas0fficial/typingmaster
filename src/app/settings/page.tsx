"use client";

import { useSettingsStore } from "@/store/settingsStore";

export default function SettingsPage() {
  const {
    soundEnabled, testDuration, fontSize, showVirtualKeyboard,
    setSoundEnabled, setTestDuration, setFontSize, setShowVirtualKeyboard,
  } = useSettingsStore();

  return (
    <div className="p-8 max-w-[700px] w-full mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-zinc-100">Settings</h1>

      <div className="bg-[#0e1322] border border-zinc-900 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-200">Sound Effects</p>
            <p className="text-xs text-zinc-500">Keystroke sounds while typing</p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${soundEnabled ? "bg-blue-600" : "bg-zinc-700"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${soundEnabled ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>

        <div>
          <p className="text-sm font-medium text-zinc-200 mb-2">Test Duration</p>
          <div className="flex gap-2">
            {[15, 30, 60, 120].map((d) => (
              <button
                key={d}
                onClick={() => setTestDuration(d as 15 | 30 | 60 | 120)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${testDuration === d ? "bg-blue-600 text-white" : "bg-[#0b0f19] text-zinc-400 hover:text-zinc-200"
                  }`}
              >
                {d}s
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-zinc-200 mb-2">Font Size</p>
          <div className="flex gap-2">
            {([
              { value: "sm", label: "Small" },
              { value: "md", label: "Medium" },
              { value: "lg", label: "Large" },
            ] as const).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFontSize(value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${fontSize === value ? "bg-blue-600 text-white" : "bg-[#0b0f19] text-zinc-400 hover:text-zinc-200"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-200">Virtual Keyboard</p>
            <p className="text-xs text-zinc-500">Show the on-screen keyboard</p>
          </div>
          <button
            onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
            className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${showVirtualKeyboard ? "bg-blue-600" : "bg-zinc-700"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${showVirtualKeyboard ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
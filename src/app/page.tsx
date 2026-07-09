"use client";

import { StatsBar } from "@/components/StatsBar";
import { TypingCanvas } from "@/components/TypingCanvas";
import { PracticeControls } from "@/components/PracticeControls";
import { VirtualKeyboard } from "@/components/VirtualKeyboard";
import { ResultModal } from "@/components/ResultModal";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { useSettingsStore } from "@/store/settingsStore";

export default function Home() {
  const showVirtualKeyboard = useSettingsStore((s) => s.showVirtualKeyboard);

  const {
    wordMode,
    paragraph,
    userInput,
    isActive,
    timeLeft,
    isFinished,
    isSaving,
    showResultModal,
    wpm,
    accuracy,
    errors,
    inputRef,
    handleInputChange,
    handlePauseToggle,
    handleRestart,
    handleModeChange,
    setShowResultModal,
  } = useTypingEngine();

  return (
    <>
      <div className="p-8 flex gap-6 flex-1 max-w-[1400px] w-full mx-auto items-start">
        <div className="flex-1 space-y-6">
          <StatsBar wpm={wpm} accuracy={accuracy} timeLeft={timeLeft} errors={errors} isSaving={isSaving} />

          <TypingCanvas
            paragraph={paragraph}
            userInput={userInput}
            isActive={isActive}
            isFinished={isFinished}
            wordMode={wordMode}
            onModeChange={handleModeChange}
            onInputChange={handleInputChange}
            inputRef={inputRef}
          />

          {showVirtualKeyboard && <VirtualKeyboard />}
        </div>

        <PracticeControls
          isActive={isActive}
          isFinished={isFinished}
          hasStarted={userInput.length > 0}
          onPauseToggle={handlePauseToggle}
          onRestart={handleRestart}
        />
      </div>

      <ResultModal
        show={showResultModal}
        onClose={() => setShowResultModal(false)}
        onRestart={handleRestart}
        wpm={wpm}
        accuracy={accuracy}
        errors={errors}
      />
    </>
  );
}
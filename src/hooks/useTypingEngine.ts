"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { saveGameResult } from "@/app/actions/score";
import { WordMode, generateRandomParagraph } from "@/utils/wordLists";
import { useSettingsStore } from "@/store/settingsStore";
import { useStatsStore } from "@/store/statsStore";

export function useTypingEngine() {
  const testDuration = useSettingsStore((s) => s.testDuration);
  const refreshStats = useStatsStore((s) => s.refreshStats);

  const [wordMode, setWordMode] = useState<WordMode>("mixed");
  const [paragraph, setParagraph] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(testDuration);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const userInputRef = useRef("");
  useEffect(() => {
    userInputRef.current = userInput;
  }, [userInput]);

  const computeFinalStats = useCallback(
    (input: string, secondsElapsed: number) => {
      let currentErrors = 0;
      for (let i = 0; i < input.length; i++) {
        if (input[i] !== paragraph[i]) currentErrors++;
      }
      const computedAcc =
        input.length > 0 ? Math.round(((input.length - currentErrors) / input.length) * 100) : 100;
      const minutesElapsed = secondsElapsed / 60 || 1 / 3600;
      const correctChars = input.length - currentErrors;
      const computedWpm = Math.round(correctChars / 5 / minutesElapsed);
      return {
        wpm: computedWpm < 0 || isNaN(computedWpm) ? 0 : computedWpm,
        accuracy: isNaN(computedAcc) ? 100 : computedAcc,
        errors: currentErrors,
      };
    },
    [paragraph]
  );

  const triggerSaveWithStats = useCallback(
    async (finalWpm: number, finalAccuracy: number, finalErrors: number) => {
      setIsSaving(true);
      await saveGameResult(finalWpm, finalAccuracy, finalErrors);
      await refreshStats();
      setIsSaving(false);
    },
    [refreshStats]
  );

  const finishTest = useCallback(
    (finalWpm: number, finalAccuracy: number, finalErrors: number) => {
      setIsActive(false);
      setIsFinished(true);
      setShowResultModal(true);
      setWpm(finalWpm);
      setAccuracy(finalAccuracy);
      setErrors(finalErrors);
      triggerSaveWithStats(finalWpm, finalAccuracy, finalErrors);
    },
    [triggerSaveWithStats]
  );

  const handleRestart = useCallback(() => {
    setUserInput("");
    setIsActive(false);
    setTimeLeft(testDuration);
    setIsFinished(false);
    setShowResultModal(false);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setParagraph(generateRandomParagraph(wordMode));
    setTimeout(() => inputRef.current?.focus(), 10);
  }, [wordMode, testDuration]);

  const handleModeChange = useCallback(
    (mode: WordMode) => {
      if (isActive) return;
      setWordMode(mode);
      setUserInput("");
      setIsFinished(false);
      setShowResultModal(false);
      setTimeLeft(testDuration);
      setWpm(0);
      setAccuracy(100);
      setErrors(0);
      setParagraph(generateRandomParagraph(mode));
    },
    [isActive, testDuration]
  );

  useEffect(() => {
    setParagraph(generateRandomParagraph(wordMode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isActive && !isFinished) {
      setTimeLeft(testDuration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testDuration]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleRestart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRestart]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const refocusInput = () => {
      if (!isFinished) inputRef.current?.focus();
    };
    window.addEventListener("click", refocusInput);
    return () => window.removeEventListener("click", refocusInput);
  }, [isFinished]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isFinished) {
      const stats = computeFinalStats(userInputRef.current, testDuration - timeLeft);
      finishTest(stats.wpm, stats.accuracy, stats.errors);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isFinished, computeFinalStats, finishTest, testDuration]);

  useEffect(() => {
    if (userInput.length === 0) {
      setWpm(0);
      setAccuracy(100);
      setErrors(0);
      return;
    }

    let currentErrors = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== paragraph[i]) currentErrors++;
    }
    setErrors(currentErrors);

    const computedAcc = Math.round(((userInput.length - currentErrors) / userInput.length) * 100);
    setAccuracy(isNaN(computedAcc) ? 100 : computedAcc);

    const timeElapsed = (testDuration - timeLeft) / 60;
    if (timeElapsed > 0) {
      const correctChars = userInput.length - currentErrors;
      const computedWpm = Math.round(correctChars / 5 / timeElapsed);
      setWpm(computedWpm < 0 ? 0 : computedWpm);
    }
  }, [userInput, timeLeft, paragraph, testDuration]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      if (val.length <= paragraph.length && !isFinished && isActive) {
        setUserInput(val);

        if (val.length === paragraph.length) {
          const stats = computeFinalStats(val, testDuration - timeLeft);
          finishTest(stats.wpm, stats.accuracy, stats.errors);
        }
      } else if (!isActive && val.length === 1 && !isFinished) {
        setIsActive(true);
        setUserInput(val);
      }
    },
    [paragraph, isFinished, isActive, timeLeft, computeFinalStats, finishTest, testDuration]
  );

  const handlePauseToggle = useCallback(() => {
    if (isFinished || userInput.length === 0) return;
    setIsActive((prev) => !prev);
    if (!isActive) setTimeout(() => inputRef.current?.focus(), 10);
  }, [isFinished, userInput.length, isActive]);

  return {
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
  };
}
import { useCallback, useEffect, useState, useRef } from "react";

// 개선된 코드
export const useTimer = (): [number, (value: number) => void, () => void] => {
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startTimer = useCallback((value: number) => {
    if (timerRef.current) clearInterval(timerRef.current);

    setTimeLeft(value);
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, value - elapsed);

      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(timerRef.current!);
      }
    }, 100);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  return [timeLeft, startTimer, stopTimer];
};

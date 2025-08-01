import { useCallback, useEffect, useState, useRef } from "react";

/**
 * 인증 번호 입력 등에 사용할 수 있는 타이머 훅입니다.
 *
 * @example
 * ```tsx
 * import { useState } from "react";
 * import { useTimer } from "@/hooks/useTimer";
 * import AuthCodeInput from "@/components/ui/input/AuthCodeInput";
 * import Input from "@/components/ui/input/Input";
 * import Button from "@/components/ui/Button";
 *
 * export default function PhoneVerification() {
 *   const [phoneNumber, setPhoneNumber] = useState("");
 *   const [authCode, setAuthCode] = useState("");
 *   const isPhoneValid = !!phoneNumber;
 *   const { timeLeft, startTimer } = useTimer();
 *
 *   const handleSendCode = () => {
 *     // 인증번호 전송 로직 (예: API 호출)
 *     console.log("인증번호 전송됨");
 *     startTimer(300); // 5분 타이머 시작
 *   };
 *
 *   return (
 *     <div className="w-[356px]">
 *       <label className="mb-1 block font-semibold" htmlFor="phone">
 *         휴대폰 번호
 *       </label>
 *       <Input
 *         onChange={(e) => setPhoneNumber(e.target.value)}
 *         className="h-[48px] w-full"
 *         placeholder="전화번호를 입력해주세요"
 *         isValid={isPhoneValid}
 *         value={phoneNumber}
 *         type="text"
 *         id="phone"
 *       />
 *       <Button
 *         className="mt-4 h-[48px] w-full text-white disabled:opacity-50"
 *         disabled={!phoneNumber || timeLeft > 0}
 *         onClick={handleSendCode}
 *       >
 *         인증번호 전송
 *       </Button>
 *       <AuthCodeInput
 *         onCodeChange={setAuthCode}
 *         codeValue={authCode}
 *         timeLeft={timeLeft}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export const useTimer = (): {
  startTimer: (value: number) => void;
  stopTimer: () => void;
  timeLeft: number;
} => {
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

  return { startTimer, stopTimer, timeLeft };
};

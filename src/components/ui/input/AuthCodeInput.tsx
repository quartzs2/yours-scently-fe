import Input from "@components/ui/input/Input";
import { formatTime } from "@utils/timeUtils";
import { cn } from "@utils/cn";
import React from "react";

type AuthCodeProps = {
  onCodeChange: (value: string) => void;
  codeValue: string;
  timeLeft: number;
};

/**
 * 인증번호를 입력받고 남은 시간을 표시하는 컴포넌트입니다.
 * 이 컴포넌트는 `Input` 컴포넌트와 조건부로 렌더링되는 카운트다운 타이머를 결합하여 사용합니다.
 *
 *
 * @example
 * ```tsx
 * // 부모 컴포넌트에서 사용하는 예시
 * import React, { useState } from 'react';
 * import AuthCodeInput from './AuthCodeInput';
 * import { useTimer } from '@hooks/useTimer';
 *
 * const ParentComponent = () => {
 * const [authCode, setAuthCode] = useState('');
 * const [phoneNumber, setPhoneNumber] = useState('');
 * const [timeLeft, startTimer] = useTimer();
 *
 * const handleSendCode = () => {
 * // 인증번호 전송 로직을 여기에 작성
 * startTimer(300); // 5분(300초) 타이머 시작
 * };
 *
 *  // 공백 유효성 검사 예시
 *  const isPhoneValid = !!phoneNumber;
 *
 * return (
 * <div>
 * <Input
 * onChange={(e) => setPhoneNumber(e.target.value)}
 * errorMessage="전화번호가 유효하지 않습니다."
 * className="h-[48px] w-[356px]"
 * validMessage="전화번호가 유효합니다."
 * placeholder="전화번호를 입력해주세요"
 * isValid={isPhoneValid}
 * value={phoneNumber}
 * type="text"
 * />
 * <Button onClick={handleSendCode}>인증번호 전송</Button>
 * <AuthCodeInput
 * onCodeChange={setAuthCode}
 * codeValue={authCode}
 * timeLeft={timeLeft}
 * />
 * </div>
 * );
 * };
 * ```
 */
export default function AuthCodeInput({
  onCodeChange,
  codeValue,
  timeLeft,
}: AuthCodeProps) {
  return (
    <div className="relative">
      <Input
        onChange={(e) => onCodeChange(e.target.value)}
        errorMessage={"번호를 모두 입력하세요"}
        className="h-[48px] w-full"
        validMessage={"번호가 유효합니다"}
        placeholder="인증번호 입력"
        value={codeValue}
        type="text"
      />
      {timeLeft > 0 && (
        <div className="absolute top-1/2 right-4 min-w-[36px] -translate-y-1/2 text-[14px] text-[var(--color-system-error)]">
          {formatTime(timeLeft)}
        </div>
      )}
    </div>
  );
}

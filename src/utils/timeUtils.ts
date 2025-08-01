/**
 * 초 단위의 숫자를 `분:초` 형식의 문자열로 변환합니다.
 *
 * 이 함수는 인증번호 타이머 UI, 카운트다운 등에서 남은 시간을 사용자에게 읽기 쉬운 형식으로 표시할 때 유용합니다.
 * 예: 65초 → "1:05"
 *
 * @example
 * formatTime(125); // "2:05"
 * formatTime(0);   // "0:00"
 * formatTime(-1);  // "0:00"
 *
 * @see AuthCodeInput - 이 함수는 인증번호 입력 UI 컴포넌트에서 사용됩니다.
 */
export function formatTime(seconds: number): string {
  if (seconds < 0) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

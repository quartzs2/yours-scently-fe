import { ValidationMessage } from "@components/ui/input/ValidationMessage";
import Input from "@components/ui/input/Input";
import React, { useRef } from "react";

export type PhoneInputProps = {
  onChange: (index: number, value: string) => void;
  values: [string, string, string];
  isValid?: boolean | null;
  validMessage?: string;
  errorMessage?: string;
};

// Input type을 위한 상수 정의
const INPUT_TYPE_TEL = "tel";

// 각 입력 필드의 최대 길이를 위한 상수 정의
const FIRST_INPUT_MAX_LENGTH = 3;
const OTHER_INPUT_MAX_LENGTH = 4;

/**
 * PhoneInput 컴포넌트는 전화번호 3부분 (예: 010-1234-5678)을 나누어 입력하는 UI입니다.
 *
 * - 각 input은 자동으로 다음 input으로 포커스가 이동합니다 (3자리, 4자리 입력 완료 시).
 * - `values` 배열로 현재 입력값을 받고, `onChange` 콜백으로 각 인덱스별 값 변경을 알립니다.
 * - 전체 유효성 상태 및 메시지를 하단에 표시합니다.
 * - 내부적으로 input DOM 참조를 관리해 포커스 이동을 구현합니다.
 *
 * @example
 * const [phoneValues, setPhoneValues] = useState(["", "", ""]);
 * const handlePhoneChange = (index, val) => {
 *   const newValues = [...phoneValues];
 *   newValues[index] = val;
 *   setPhoneValues(newValues);
 *   const joined = newValues.join("-"); 전화번호 형식변환 010-1234-5678
 * };
 *
 * <PhoneInput
 *   values={phoneValues}
 *   onChange={handlePhoneChange}
 *   isValid={phoneValues.every(v => v.length > 0)}
 *   validMessage="유효한 번호입니다."
 *   errorMessage="모든 칸을 입력하세요."
 * />
 */
const PhoneInput = ({
  validMessage,
  errorMessage,
  onChange,
  isValid,
  values,
}: PhoneInputProps) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (index: number, value: string) => {
    const numericValue = value.replace(/\D/g, "");
    onChange(index, numericValue);

    // 자동 포커스 이동 로직
    const maxLength =
      index === 0 ? FIRST_INPUT_MAX_LENGTH : OTHER_INPUT_MAX_LENGTH;
    const isLastIndex = index >= values.length - 1;
    const moveFocus = numericValue.length === maxLength && !isLastIndex;

    if (moveFocus) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="relative">
      <div className="mb-5 flex items-center">
        {values.map((val, index) => (
          <React.Fragment key={index}>
            <Input
              maxLength={
                index === 0 ? FIRST_INPUT_MAX_LENGTH : OTHER_INPUT_MAX_LENGTH
              }
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-[110px]"
              type={INPUT_TYPE_TEL}
              isValid={isValid}
              value={val}
            />
            {index < 2 && <span className="px-0.5">-</span>}
          </React.Fragment>
        ))}
      </div>
      <ValidationMessage
        errorMessage={errorMessage}
        validMessage={validMessage}
        isValid={isValid}
      />
    </div>
  );
};

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;

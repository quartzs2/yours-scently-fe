import { ValidationMessage } from "@components/ui/input/ValidationMessage";
import React, { useEffect, useState, useRef } from "react";
import Input from "@components/ui/input/Input";

export type PhoneInputProps = {
  onChange: (value: string[]) => void;
  values: [string, string, string];
  validMessage?: string;
  errorMessage?: string;
  isValid?: boolean;
};

// Input type을 위한 상수 정의
const INPUT_TYPE_TEL = "tel";

// 각 입력 필드의 최대 길이를 위한 상수 정의
const FIRST_INPUT_MAX_LENGTH = 3;
const OTHER_INPUT_MAX_LENGTH = 4;

/**
 * PhoneInput 컴포넌트는 전화번호를 세 부분(예: 010-1234-5678)으로 나누어 입력받는 UI입니다.
 *
 * - 3자리, 4자리 입력이 완료되면 자동으로 다음 input으로 포커스가 이동합니다.
 * - `values` 배열로 현재 입력값을 받고, `onChange` 콜백으로 인덱스별 값 변경을 부모에게 전달합니다.
 * - 전체 유효성 상태(`isValid`)와 메시지(`validMessage`, `errorMessage`)를 하단에 표시합니다.
 * - 내부적으로 input DOM 참조를 관리하여 포커스 이동을 구현합니다.
 *
 * @example
 * ```tsx
 * const [phoneValues, setPhoneValues] = useState(["", "", ""]);
 *
 * const handlePhoneChange = (newValues: string[]) => {
 *   setPhoneValues(newValues as [string, string, string]);
 * };
 *
 * <PhoneInput
 *   values={phoneValues}
 *   onChange={handlePhoneChange}
 *   isValid={phoneValues.every(v => v.length > 0)}
 *   validMessage="유효한 번호입니다."
 *   errorMessage="모든 칸을 입력하세요."
 * />
 * ```
 */
const PhoneInput = ({
  validMessage,
  errorMessage,
  onChange,
  isValid,
  values,
}: PhoneInputProps) => {
  const [phoneValues, setPhoneValues] = useState(values);

  useEffect(() => {
    onChange(phoneValues);
  }, [onChange, phoneValues]);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const index = parseInt(name, 10);
    const numericValue = value.replace(/\D/g, "");

    setPhoneValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = numericValue;
      return newValues as [string, string, string];
    });

    // 자동 포커스 이동 로직
    const maxLength =
      index === 0 ? FIRST_INPUT_MAX_LENGTH : OTHER_INPUT_MAX_LENGTH;
    const isLastIndex = index >= phoneValues.length - 1;
    const moveFocus = numericValue.length === maxLength && !isLastIndex;

    if (moveFocus) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        {phoneValues.map((val, index) => (
          <React.Fragment key={index}>
            <Input
              maxLength={
                index === 0 ? FIRST_INPUT_MAX_LENGTH : OTHER_INPUT_MAX_LENGTH
              }
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={handleInputChange}
              className="w-[110px]"
              type={INPUT_TYPE_TEL}
              name={String(index)}
              isValid={isValid}
              value={val}
            />
            {index < phoneValues.length - 1 && (
              <span className="px-0.5">-</span>
            )}
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

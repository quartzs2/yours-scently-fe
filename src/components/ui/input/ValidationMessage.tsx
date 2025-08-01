import React from "react";

type ValidationMessageProps = {
  isValid?: boolean | null;
  errorMessage?: string;
  validMessage?: string;
};

/**
 * ValidationMessage 컴포넌트는 입력값의 유효성 상태에 따라
 * 성공 메시지 또는 에러 메시지를 화면에 표시합니다.
 *
 *
 *
 * @example
 * <ValidationMessage
 *   isValid={false}
 *   errorMessage="필수 입력값입니다."
 * />
 *
 * <ValidationMessage
 *   isValid={true}
 *   validMessage="사용 가능한 이메일입니다."
 * />
 */
export const ValidationMessage = ({
  errorMessage,
  validMessage,
  isValid,
}: ValidationMessageProps) => {
  if (isValid === false) {
    return (
      <p className="text-body-2 absolute top-full left-0 mt-1 text-system-error">
        {errorMessage}
      </p>
    );
  }

  if (isValid === true && validMessage) {
    return (
      <p className="text-body-2 absolute top-full left-0 mt-1 text-system-success">
        {validMessage}
      </p>
    );
  }

  return null;
};

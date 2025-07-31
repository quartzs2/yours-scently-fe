import { ValidationMessage } from "@components/ui/input/ValidationMessage";
import { cva } from "class-variance-authority";
import { cn } from "@utils/cn";
import React from "react";

export type InputProps = {
  type: "password" | "search" | "email" | "text" | "tel";
  ref?: React.Ref<HTMLInputElement>;
  isValid?: boolean | null;
  validMessage?: string;
  errorMessage?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const inputStyle = cva(
  "text-[16px] border rounded p-4 border-[var(--color-border-default)] focus:border-[var(--color-primary-main)] focus:outline-none focus:ring-0",
  {
    variants: {
      inputType: {
        tel: "w-[110px] h-[48px]",
        search: "pl-10",
        password: "",
        email: "",
        text: "",
      },
    },
  },
);

/**
 * Input 컴포넌트는 다양한 타입(`text`, `password`, `email`, `search`, `tel`)을 지원하며,
 * 입력창 스타일과 유효성 표시를 담당합니다.
 *
 * - `type="tel"`일 때는 주로 전화번호 입력용으로 사용되며,
 *   `class-variance-authority`를 통해 스타일 변형을 관리합니다.
 * - `ref`를 직접 받아 input DOM에 연결합니다.
 * - 유효성 상태에 따라 테두리 색상과 메시지를 동적으로 표시합니다.
 *
 *
 * @example
 * <Input
 *   type="text"
 *   placeholder="이름 입력"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 *   isValid={name.length > 1}
 *   validMessage="이름이 유효합니다."
 *   errorMessage="2자 이상 입력하세요."
 * />
 *
 */
const Input = ({
  validMessage,
  errorMessage,
  className,
  isValid,
  type,
  ref,
  id,
  ...props
}: InputProps) => {
  const baseInputClass = cn(inputStyle({ inputType: type }), className, {
    "border-[var(--color-system-success)] focus:border-[var(--color-system-success)]":
      isValid === true,
    "border-[var(--color-system-error)] focus:border-[var(--color-system-error)]":
      isValid === false,
  });

  return (
    <div className="relative">
      <input
        className={baseInputClass}
        type={type}
        ref={ref}
        id={id}
        {...props}
      />
      <ValidationMessage
        errorMessage={errorMessage}
        validMessage={validMessage}
        isValid={isValid}
      />
    </div>
  );
};

Input.displayName = "Input";

export default Input;

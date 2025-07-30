import { cva } from "class-variance-authority";
import React, { JSX } from "react";
import { cn } from "@utils/cn";

export type InputProps = {
  type: "checkbox" | "password" | "email" | "radio" | "text";
  labelClassName?: string;
  label?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const textInputStyles =
  "border-[#CBCBCB] focus:border-[#4F555E] focus:outline-none focus:ring-0";
const checkableInputStyles = "text-blue-600 border-gray-300";

const inputStyle = cva("text-body-2 border rounded p-4", {
  variants: {
    inputType: {
      checkbox: checkableInputStyles,
      radio: checkableInputStyles,
      password: textInputStyles,
      email: textInputStyles,
      text: textInputStyles,
    },
  },
});

/**
 * 재사용 가능한 Input 컴포넌트입니다.
 * 다양한 타입(텍스트, 비밀번호, 이메일, 체크박스, 라디오)의 input 요소를 렌더링할 수 있습니다.
 *
 * @component
 * @param {InputProps} props - Input 컴포넌트의 속성들
 * @returns {JSX.Element} 렌더링된 Input 요소
 * @example
 *
 * ```tsx
 * <Input
 *   type="text"
 *   value="상태변수"
 *   onChange={(e) => 상태함수(e.target.value)}
 *   placeholder="입력해주세요"
 *   name="username"
 *   id="input-username"
 * />
 *
 * <Input
 *   type="checkbox"
 *   checked={true}
 *   onChange={(e) => 상태함수(e.target.checked)}
 *   label="약관에 동의합니다"
 *   name="agree"
 *   id="checkbox-agree"
 * />
 *
 * <Input
 *   onChange={(e) => 상태함수(e.target.value)}
 *   checked={상태변수 === "option1"}
 *   labelClassName="select-none"
 *   name="radioGroup"
 *   value="option1"
 *   type="radio"
 *   id="option1"
 *   label="옵션 1"
 *
 * ```
 */

const Input = ({
  labelClassName,
  className,
  label,
  type,
  id,
  ...props
}: InputProps) => {
  switch (type) {
    case "checkbox":
    case "radio":
      return (
        <div>
          <input
            className={cn(inputStyle({ inputType: type }), className)}
            type={type}
            id={id}
            {...props}
          />
          <label className={cn(labelClassName, "pl-2")} htmlFor={id}>
            {label}
          </label>
        </div>
      );
    default:
      return (
        <input
          className={cn(inputStyle({ inputType: type }), className)}
          type={type}
          id={id}
          {...props}
        />
      );
  }
};

Input.displayName = "Input";

export default Input;

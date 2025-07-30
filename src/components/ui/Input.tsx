import { cva } from "class-variance-authority";
import { cn } from "@utils/cn";
import React from "react";

export type InputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "checkbox" | "password" | "email" | "radio" | "text";
  labelClassName?: string;
  value: string | number;
  placeholder?: string;
  className?: string;
  checked?: boolean;
  label?: string;
  name: string;
  id: string;
};

/**
 * @typedef {object} InputProps
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} onChange - input 요소의 값이 변경될 때 호출되는 이벤트 핸들러입니다.
 * @property {'checkbox' | 'password' | 'email' | 'radio' | 'text'} type - input 요소의 타입을 지정합니다.
 * @property {string} [labelClassName] - label 요소에 적용될 추가 CSS 클래스입니다. (선택 사항)
 * @property {string | number} value - input 요소의 현재 값입니다.
 * @property {string} [placeholder] - input 요소에 표시될 플레이스홀더 텍스트입니다. (선택 사항)
 * @property {string} [className] - input 요소에 적용될 추가 CSS 클래스입니다. (선택 사항)
 * @property {boolean} [checked] - 'checkbox' 또는 'radio' 타입일 때, input 요소의 선택 상태를 나타냅니다. (선택 사항)
 * @property {string} [label] - input 요소와 관련된 레이블 텍스트입니다. (선택 사항)
 * @property {string} name - input 요소의 'name' 속성으로, 폼 제출 시 사용됩니다.
 * @property {string} id - input 요소의 고유 ID로, label의 'htmlFor'와 연결됩니다.
 * @property {boolean} [required] - input 필드가 필수 항목인지 여부를 지정합니다. (선택 사항, 추가됨)
 */

const inputStyle = cva("text-body-2 border rounded p-4", {
  variants: {
    inputType: {
      password:
        "border-[#CBCBCB] focus:border-[#4F555E] focus:outline-none focus:ring-0",
      email:
        "border-[#CBCBCB] focus:border-[#4F555E] focus:outline-none focus:ring-0",
      text: "border-[#CBCBCB] focus:border-[#4F555E] focus:outline-none focus:ring-0",
      checkbox: "text-blue-600 border-gray-300",
      radio: "text-blue-600 border-gray-300",
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
 */

const Input = ({
  labelClassName,
  placeholder,
  className,
  onChange,
  checked,
  value,
  label,
  type,
  name,
  id,
}: InputProps) => {
  switch (type) {
    // 체크박스
    case "checkbox":
      return (
        <div>
          <input
            className={cn(inputStyle({ inputType: "checkbox" }), className)}
            onChange={onChange}
            checked={checked}
            type="checkbox"
            value={value}
            name={name} // name 속성 추가
            id={id}
          />
          <label className={cn(labelClassName, "pl-2")} htmlFor={id}>
            {label}
          </label>
        </div>
      );
    case "password":
    case "email":
    case "text":
      return (
        // text, password, email 타입
        <input
          className={cn(inputStyle({ inputType: type }), className)}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          id={id}
        />
      );
    // 라디오 타입
    case "radio":
      return (
        <div>
          <input
            className={cn(inputStyle({ inputType: "radio" }), className)}
            onChange={onChange}
            checked={checked}
            value={value}
            type="radio"
            name={name} // name 속성 추가
            id={id}
          />
          <label className={cn(labelClassName, "pl-2")} htmlFor={id}>
            {label}
          </label>
        </div>
      );
  }
};

export default Input;

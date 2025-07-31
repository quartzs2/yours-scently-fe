import { cva } from "class-variance-authority";
import React, { useRef } from "react";
import { cn } from "@utils/cn";

export type InputProps = {
  type: "checkbox" | "password" | "search" | "email" | "radio" | "text" | "tel";
  onPhoneChange?: (index: number, value: string) => void;
  isValid?: boolean | null;
  phoneValues?: string[];
  validMessage?: string;
  errorMessage?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

const textInputStyles =
  "border-[1px] border-[#CBCBCB] focus:border-[#4F555E] focus:outline-none focus:ring-0";
const checkableInputStyles = "text-blue-600 border-gray-300";

const inputStyle = cva("text-[16px] border rounded p-4", {
  variants: {
    inputType: {
      tel: `${textInputStyles} w-[110px] h-[48px]`,
      search: `${textInputStyles} pl-10 `,
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
 * 다양한 타입(input type) 지원: `text`, `password`, `email`, `tel`, `search`.
 * `tel` 타입은 전화번호 입력을 위한 3분할 인풋 필드를 제공합니다.
 * 스타일 직접 지정 가능
 * 유효성검사 커스텀 가능
 *
 * @example
 * // 기본 텍스트 입력(아이디,비번,이메일 등 가능)
 * <Input
 *   type="text"
 *   value={text}
 *   onChange={(e) => setText(e.target.value)}
 *   placeholder="사용자명을 입력하세요"
 *   name="username"
 *   id="username"
 *   isValid={true}
 *   validMessage="사용자명 유효함"
 * />
 *
 * @example
 * // 비밀번호 입력
 * <Input
 *   type="password"
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 *   placeholder="비밀번호"
 *   name="password"
 *   id="password"
 * />
 *
 * @example
 * // 전화번호 입력 (3개의 input 필드를 나누어 사용)
 * const [phoneValues, setPhoneValues] = useState(["", "", ""]);
 *
 * const handlePhoneChange = (index: number, value: string) => {
 *   const updated = [...phoneValues];
 *   updated[index] = value;
 *   setPhoneValues(updated);
 *   const joined = updated.join("-"); // 전화번호 배열에서 한 변수로 형식변환 010-1234-5678
 * };
 *
 * <Input
 *   type="tel"
 *   phoneValues={phoneValues}
 *   onPhoneChange={handlePhoneChange}
 *   errorMessage="전화번호를 입력해주세요"
 *   isValid={phoneValues.every((v) => v.length > 0)}
 * />
 *
 * @example
 * // 검색창 입력
 * <div className="relative">
 *   <Input
 *     type="search"
 *     value={search}
 *     onChange={(e) => setSearch(e.target.value)}
 *     placeholder="검색어를 입력하세요"
 *     name="search"
 *     id="search"
 *     className="w-full"
 *   />
 *   <IconButton
 *     className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
 *     As={Search}
 *     aria-label="검색 아이콘"
 *   />
 * </div>
 */

const Input = ({
  onPhoneChange,
  validMessage,
  errorMessage,
  phoneValues,
  className,
  isValid,
  type,
  id,
  ...props
}: InputProps) => {
  const baseInputClass = cn(
    inputStyle({ inputType: type }),
    className,
    isValid === false && "border-[#E53935] focus:border-[#E53935]",
    isValid === true && "border-[#43A047] focus:border-[#43A047]",
  );

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  if (type === "tel" && phoneValues && onPhoneChange) {
    return (
      <div className="relative flex items-center">
        {phoneValues.map((val, index) => (
          <React.Fragment key={index}>
            <input
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "");
                onPhoneChange(index, newValue);
                if (
                  newValue.length === (index === 0 ? 3 : 4) &&
                  index < inputRefs.length - 1
                ) {
                  inputRefs[index + 1].current?.focus();
                }
              }}
              maxLength={index === 0 ? 3 : index === 1 ? 4 : 4}
              className={baseInputClass}
              ref={inputRefs[index]}
              type="text"
              value={val}
            />
            {index < 2 && <span className="px-0.5">-</span>}
          </React.Fragment>
        ))}
        {isValid
          ? validMessage && (
              <p className="absolute top-full left-0 text-[14px] text-[#43A047]">
                {validMessage}
              </p>
            )
          : errorMessage && (
              <p className="absolute top-full left-0 text-[14px] text-[#E53935]">
                {errorMessage}
              </p>
            )}
      </div>
    );
  } else if (type === "search") {
    <input className={baseInputClass} type={type} id={id} {...props} />;
  }
  return (
    <div className="relative">
      <input className={baseInputClass} type={type} id={id} {...props} />
      {isValid
        ? validMessage && (
            <p className="absolute top-full left-0 text-[14px] text-[#43A047]">
              {validMessage}
            </p>
          )
        : errorMessage && (
            <p className="absolute top-full left-0 text-[14px] text-[#E53935]">
              {errorMessage}
            </p>
          )}
    </div>
  );
};

Input.displayName = "Input";

export default Input;

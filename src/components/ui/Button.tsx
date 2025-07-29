import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils/cn";
import React from "react";

/**
 * 버튼 스타일을 정의하는 class-variance-authority(cva) 객체
 * - size: 버튼 크기 (sm ~ 3xl)
 * - shape: 버튼 모양 (rounded: 기본, pill: 둥근 풀 모서리)
 * - theme: 버튼 테마 (light, dark)
 */
const buttonStyles = cva(
  "inline-flex items-center justify-center font-semibold transition-colors",
  {
    variants: {
      size: {
        "2xl": "w-[328px] h-[48px] text-button-1",
        "3xl": "w-[420px] h-[48px] text-button-1",
        md: "w-[120px] h-[40px] text-button-1",
        lg: "w-[160px] h-[48px] text-button-1",
        xl: "w-[224px] h-[56px] text-button-1",
        sm: "w-[80px] h-[34px] text-button-2",
      },
      theme: {
        light:
          "bg-bg-default)] text-primary-main)] border border-primary-main)] hover:bg-bg-subtle)] hover:text-primary-dark)] hover:border-primary-dark)]",
        dark: "bg-primary-main)] text-bg-default)] hover:bg-primary-dark)] hover:text-bg-default)]",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      shape: "rounded",
      theme: "dark",
      size: "md",
    },
  },
);

/**
 * Button 컴포넌트 props 타입 정의
 * - children: 버튼 내부에 들어갈 React 노드 (텍스트, 아이콘 등)
 * - size: 버튼 크기 variant (sm, md, lg, xl, 2xl, 3xl)
 * - shape: 버튼 모양 variant (rounded, pill)
 * - theme: 버튼 테마 variant (light, dark)
 * - 기타 React 기본 button 요소 속성 (onClick, type, disabled 등) 포함
 */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
} & VariantProps<typeof buttonStyles>;

/**
 * 재사용 가능한 Button 컴포넌트
 *
 * @param {ButtonProps} props - 버튼 컴포넌트에 전달되는 props
 * @param {React.ReactNode} props.children - 버튼 내부에 렌더링할 내용
 * @param {"sm" | "md" | "lg" | "xl" | "2xl" | "3xl"} [props.size="md"] - 버튼 크기
 * @param {"rounded" | "pill"} [props.shape="rounded"] - 메인 홈 배너에 들어가는 버튼 모양
 * @param {"light" | "dark"} [props.theme="dark"] - 버튼 테마
 * @param {string} [props.className] - 추가 커스텀 클래스
 * @param {...React.ButtonHTMLAttributes<HTMLButtonElement>} [props.*] - 기타 button 기본 속성들
 *
 * @returns {JSX.Element} 스타일과 동작이 적용된 button 엘리먼트
 */
const Button: React.FC<ButtonProps> = ({
  className,
  children,
  theme,
  shape,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonStyles({ theme, shape, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

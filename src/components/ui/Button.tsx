import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils/cn";
import React from "react";

/**
 * 버튼 스타일을 정의하는 class-variance-authority(cva) 객체입니다.
 * 다양한 크기, 모양, 테마 변형을 제공합니다.
 *
 * @property  variants - 버튼의 시각적 변형을 정의합니다.
 * @property  variants.size - 버튼의 크기를 정의합니다.
 * - `sm`: 소형 버튼 (80px x 34px, text-button-2)
 * - `md`: 중간 버튼 (120px x 40px, text-button-1)
 * - `lg`: 대형 버튼 (160px x 48px, text-button-1)
 * - `xl`: 초대형 버튼 (160px x 56px, text-button-1)
 * - `2xl`: 더 큰 버튼 (328px x 48px, text-button-1)
 * - `3xl`: 가장 큰 버튼 (420px x 48px, text-button-1)
 * @property variants.theme - 버튼의 색상 테마를 정의합니다.
 * - `light`: 밝은 배경, 주 색상 텍스트/테두리. 호버 시 배경색 변경 및 텍스트/테두리 색상 진해짐.
 * - `dark`: 주 색상 배경, 흰색 텍스트. 호버 시 배경색 진해짐.
 * @property  variants.shape - 버튼의 모서리 모양을 정의합니다.
 * - `rounded`: 약간 둥근 모서리 (기본값).
 * - `pill`: 완전히 둥근 모서리 (캡슐 형태).
 * @property  defaultVariants - 각 변형의 기본값을 설정합니다.
 */
const buttonStyles = cva(
  // 기본 스타일: 인라인 플렉스, 중앙 정렬, 폰트 두께, 트랜지션, 비활성화 시 커서/투명도
  "inline-flex cursor-pointer items-center justify-center font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        "2xl": "w-[328px] h-[48px] text-button-1",
        "3xl": "w-[420px] h-[48px] text-button-1",
        md: "w-[120px] h-[40px] text-button-1",
        lg: "w-[160px] h-[48px] text-button-1",
        xl: "w-[160px] h-[56px] text-button-1",
        sm: "w-[80px] h-[34px] text-button-2",
      },
      theme: {
        light:
          "bg-bg-default text-primary-main border border-primary-main hover:bg-bg-subtle hover:text-primary-dark hover:border-primary-dark",
        dark: "bg-primary-main text-bg-default hover:bg-primary-dark hover:text-bg-default",
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

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React.Ref<HTMLButtonElement>;
} & VariantProps<typeof buttonStyles>;

/**
 * 재사용 가능한 Button 컴포넌트입니다.
 * `class-variance-authority`를 사용하여 다양한 테마, 크기 및 모양 변형을 지원하며,
 * 모든 표준 HTML `<button>` 속성을 상속받아 유연하게 사용할 수 있습니다.
 * ref prop을 직접 받아 버튼 DOM 요소에 전달합니다.
 *
 * @param 버튼 컴포넌트에 전달되는 props입니다.
 * @param `buttonStyles`에 의해 생성된 클래스 외에 추가적으로 적용될 CSS 클래스입니다.
 * @param 버튼 내부에 렌더링될 React 노드입니다.
 * @param 버튼의 시각적 테마입니다.
 * @param 버튼의 모서리 모양입니다.
 * @param 버튼의 크기입니다.
 * @param 나머지 모든 표준 HTML `<button>` 속성들이 포함됩니다 (예: `onClick`, `type`, `disabled` 등).
 * @param ref - 버튼 DOM 요소에 대한 ref입니다.
 *
 * @returns 스타일과 동작이 적용된 button 엘리먼트를 반환합니다.
 *
 * @example
 * 기본 다크 테마, 중간 크기, 둥근 모서리 버튼
 * <Button>기본 버튼</Button>
 *
 * @example
 * 라이트 테마, 큰 크기, 둥근 풀 모서리, 클릭 이벤트 핸들러가 있는 버튼
 * <Button theme="light" size="lg" shape="pill" onClick={() => console.log('버튼 클릭됨!')}>
 * 클릭하세요
 * </Button>
 *
 * @example
 * 비활성화된 소형 버튼
 * <Button size="sm" disabled>
 * 비활성화된 버튼
 * </Button>
 *
 * @example
 * ref를 사용하여 버튼 DOM 요소에 접근
 * const buttonRef = useRef(null);
 * <Button ref={buttonRef} onClick={() => buttonRef.current?.focus()}>
 * 포커스
 * </Button>
 */
const Button = ({
  className,
  children,
  theme,
  shape,
  size,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonStyles({ theme, shape, size }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";

export default Button;

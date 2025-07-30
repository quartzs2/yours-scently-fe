"use client";

import { Z_INDEX } from "@constants/zIndex";
import { cn } from "@utils/cn";

type DialogProps = {
  children: React.ReactNode;
  onClose?: () => void;
  isOverlay?: boolean;
  className?: string;
  zIndex?: number;
};

/**
 * Dialog 컴포넌트
 * @param isOverlay - 배경 오버레이 표시 여부
 * @param className - Dialog 컴포넌트의 클래스 이름
 * @param children - Dialog 컴포넌트의 자식 요소
 *
 * @returns Dialog 컴포넌트
 *
 * @example
 * <Dialog>
 *  <div>
 *    <h1>다이얼로그 컴포넌트</h1>
 *  </div>
 * </Dialog>
 */
const Dialog = ({
  zIndex = Z_INDEX.DIALOG,
  isOverlay = true,
  className,
  children,
  onClose,
}: DialogProps) => {
  const handleDismiss = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className={cn("flex-center fixed top-0 left-0 h-full w-full", {
        "bg-black/50": isOverlay,
      })}
      style={{
        zIndex,
      }}
      onClick={handleDismiss}
    >
      <div
        className={cn("rounded-lg bg-white p-4 select-none", className)}
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        role="dialog"
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;

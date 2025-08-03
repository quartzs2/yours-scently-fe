"use client";

import { Z_INDEX } from "@constants/zIndex";
import { useEffect, useRef } from "react";
import { cn } from "@utils/cn";

type DialogProps = {
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClose?: () => void;
  isOverlay?: boolean;
  className?: string;
  triggerId?: string;
  zIndex?: number;
};

/**
 * Dialog 컴포넌트
 * @param className - Dialog 컴포넌트의 클래스 이름
 * @param children - Dialog 컴포넌트의 자식 요소
 * @param zIndex - Dialog 컴포넌트의 z-index
 * @param onClose - Dialog 컴포넌트 닫기 함수
 * @param style - Dialog 컴포넌트의 style(동적으로 스타일 적용할 경우)
 * @param triggerId - Dialog 컴포넌트를 트리거하는 요소의 id
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
  className,
  triggerId,
  children,
  onClose,
  style,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eventCallback = (e: MouseEvent): void => {
      const triggerElement = triggerId
        ? document.getElementById(triggerId)
        : null;
      const isTriggerClicked =
        triggerElement && triggerElement.contains(e.target as Node);

      if (
        dialogRef.current &&
        !dialogRef.current.contains(e.target as Node) &&
        !isTriggerClicked
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", eventCallback);
    return () => document.removeEventListener("mousedown", eventCallback);
  }, [onClose, triggerId]);

  return (
    <div
      className={cn("rounded-lg bg-white p-4 select-none", className)}
      onClick={(e) => e.stopPropagation()}
      style={{ ...style, zIndex }}
      aria-modal="true"
      ref={dialogRef}
      role="dialog"
    >
      {children}
    </div>
  );
};

export default Dialog;

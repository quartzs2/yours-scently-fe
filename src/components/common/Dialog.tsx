"use client";

import { useRouter } from "next/navigation";
import { Z_INDEX } from "@constants/zIndex";
import { cn } from "@utils/cn";

type DialogProps = {
  children: React.ReactNode;
  isOverlay?: boolean;
  className?: string;
  zIndex?: number;
};

/**
 * 다이얼로그 컴포넌트
 * @param isOverlay - 배경 오버레이 표시 여부
 * @param className - 다이얼로그 컴포넌트의 클래스 이름
 * @param children - 다이얼로그 컴포넌트의 자식 요소
 *
 * @returns 다이얼로그 컴포넌트
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
}: DialogProps) => {
  const router = useRouter();

  const handleDismiss = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      router.back();
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
      <div className={cn("rounded-lg bg-white p-4", className)}>{children}</div>
    </div>
  );
};

export default Dialog;

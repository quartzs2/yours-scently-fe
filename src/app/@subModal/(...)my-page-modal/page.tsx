"use client";

import { TRIGGER_ID } from "@constants/triggers";
import Dialog from "@components/common/Dialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/ui/Button";
import { cn } from "@utils/cn";

const DISTANCE_FROM_ICON = 40;
const MODAL_WIDTH = 296;

export default function MyPageModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const [modalPosition, setModalPosition] = useState({
    opacity: 0,
    left: 0,
    top: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      const icon = document.getElementById(TRIGGER_ID.MY_PAGE_ICON_TRIGGER);

      if (icon) {
        const rect = icon.getBoundingClientRect();
        const isModalOutOfScreen =
          rect.right + MODAL_WIDTH / 2 > window.innerWidth;
        const MODAL_LEFT_OFFSET = isModalOutOfScreen
          ? window.innerWidth - MODAL_WIDTH - 10
          : rect.right - MODAL_WIDTH / 2;
        setModalPosition({
          top: rect.bottom + DISTANCE_FROM_ICON,
          left: MODAL_LEFT_OFFSET,
          opacity: 1,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <Dialog
      className={cn(
        `h-[134px] w-[${MODAL_WIDTH}px] rounded-2xl p-6`,
        "border border-primary-light bg-bg-default shadow-[5px_5px_10px_0px_rgba(0,0,0,0.25)]",
      )}
      style={{
        left: `${modalPosition.left}px`,
        opacity: modalPosition.opacity,
        top: `${modalPosition.top}px`,
        position: "absolute",
      }}
      triggerId={TRIGGER_ID.MY_PAGE_ICON_TRIGGER}
      onClose={handleClose}
      isOverlay={false}
    >
      <div className="flex flex-col gap-6">
        {/* TODO: 로그인 기능 추가 후 유저 이름 표시 */}
        <div className="text-button-1 flex justify-center">유어스 센틀리님</div>
        <div className="flex gap-2">
          {/* TODO: 로그아웃, 마이 페이지 기능 추가 후 링크 이동 추가 */}
          <Button>마이 페이지</Button>
          <Button theme="light">로그아웃</Button>
        </div>
      </div>
    </Dialog>
  );
}

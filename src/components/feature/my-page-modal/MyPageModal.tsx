"use client";

import { getNicknameFromCookies, logout } from "@actions/actions";
import { TRIGGER_ID } from "@constants/triggers";
import Dialog from "@components/common/Dialog";
import { useEffect, useState } from "react";
import Button from "@components/ui/Button";
import { URLS } from "@constants/urls";
import { cn } from "@utils/cn";

const DISTANCE_FROM_ICON = 40;
const MODAL_WIDTH = 296;

type MyPageModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

export default function MyPageModal({ onClose, isOpen }: MyPageModalProps) {
  const [nickname, setNickname] = useState<undefined | string>();
  const [modalPosition, setModalPosition] = useState({
    opacity: 0,
    left: 0,
    top: 0,
  });

  useEffect(() => {
    const fetchNickname = async () => {
      const nicknameCookie = await getNicknameFromCookies();
      if (nicknameCookie) {
        setNickname(nicknameCookie.value);
      }
    };
    fetchNickname();
  }, []);

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

  if (!isOpen) return null;

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
      onClose={onClose}
    >
      <div className="flex flex-col gap-6">
        <div className="text-button-1 flex justify-center">{nickname}님</div>
        <div className="flex gap-2">
          <Button aria-label="마이 페이지 이동" href={URLS.MY_PAGE}>
            마이 페이지
          </Button>
          <Button
            onClick={() => {
              onClose();
              logout();
            }}
            aria-label="로그아웃"
            theme="light"
          >
            로그아웃
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

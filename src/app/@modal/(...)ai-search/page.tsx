"use client";

import AISearchResult from "@components/feature/ai-search-modal/AISearchResult";
import { useDebounce } from "@hooks/useDebounce";
import { TRIGGER_ID } from "@constants/triggers";
import Dialog from "@components/common/Dialog";
import { Z_INDEX } from "@constants/zIndex";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@utils/cn";

const PLACEHOLDERS = [
  '"지금 필요한 향기 테마를 검색해보세요"',
  '"어떤 순간을 위한 향이 필요하신가요?"',
  '"상황이나 기분에 맞는 향을 찾아보세요"',
  '"당신의 하루, 어떤 향으로 채우고 싶나요?"',
  '"지친 하루의 끝에 어울리는 향기를 찾아드릴게요"',
  '"기분 따라, 분위기 따라, 향기를 골라보세요"',
];

export default function AISearchModal() {
  const PLACEHOLDER_INDEX = Math.floor(Math.random() * PLACEHOLDERS.length);
  const router = useRouter();
  const [placeholder] = useState(() => PLACEHOLDERS[PLACEHOLDER_INDEX]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce({ value: searchValue });
  const isTyping = searchValue !== debouncedSearchValue;
  const isEmptyDebouncedValue = debouncedSearchValue.trim() === "";
  const isResultOpen = !isEmptyDebouncedValue && !isTyping;

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    const originalStyle = {
      overflowY: document.body.style.overflowY,
      position: document.body.style.position,
      width: document.body.style.width,
    };

    Object.assign(document.body.style, {
      overflowY: "scroll",
      position: "fixed",
      width: "100%",
    });

    return () => {
      Object.assign(document.body.style, originalStyle);
    };
  }, []);

  return (
    <Dialog
      className={cn(
        "border border-border-default bg-bg-default",
        "absolute top-[120px] left-[50%] translate-x-[-50%] rounded-2xl p-0",
        "xl:min-w-[var(--width-container-xl)]",
        { "border-primary-main": isTyping },
      )}
      triggerId={TRIGGER_ID.AI_SEARCH_ICON_TRIGGER}
      zIndex={Z_INDEX.MODAL}
      onClose={handleClose}
    >
      <div className="flex flex-col items-center">
        <div className="flex h-[80px] w-full items-center">
          <input
            className="text-subtitle-2 w-full text-center text-text-primary outline-none placeholder:text-text-disabled"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={placeholder}
            value={searchValue}
            type="text"
          />
        </div>
        {/* 검색 결과 */}
        {/* TODO: AISearchResult의 prop은 나중에 연결할 때 추가 */}
        {isResultOpen && <AISearchResult text={debouncedSearchValue} />}
      </div>
    </Dialog>
  );
}

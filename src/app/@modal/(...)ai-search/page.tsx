"use client";

import AISearchResult from "@components/feature/ai-search-modal/AISearchResult";
import { useDebounce } from "@hooks/useDebounce";
import Dialog from "@components/common/Dialog";
import { Z_INDEX } from "@constants/zIndex";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const router = useRouter();
  const [placeholder] = useState(
    () => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)],
  );
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce({ value: searchValue });
  const isTyping = searchValue !== debouncedSearchValue;
  const isEmptyDebouncedValue = debouncedSearchValue.trim() === "";
  const isResultOpen = !isEmptyDebouncedValue && !isTyping;

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog
      className={cn(
        "border border-border-default bg-bg-default",
        "absolute top-[120px] rounded-2xl p-0",
        "xl:min-w-[var(--width-container-md)]",
        { "border-primary-main": isTyping },
      )}
      zIndex={Z_INDEX.MODAL}
      onClose={handleClose}
      isOverlay={false}
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
        {isResultOpen && <AISearchResult />}
      </div>
    </Dialog>
  );
}

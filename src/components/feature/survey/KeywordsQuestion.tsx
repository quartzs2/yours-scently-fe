"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import Checkbox from "@components/ui/input/Checkbox";
import IconButton from "@components/ui/IconButton";
import { useState } from "react";
import { cn } from "@utils/cn";

type KeywordsQuestionProps = {
  onBack: () => void;
  onNext: () => void;
};

const keywords = [
  "따뜻한",
  "부드러운",
  "시크한",
  "사랑스러운",
  "강렬한",
  "몽환적인",
];

export default function KeywordsQuestion({
  onBack,
  onNext,
}: KeywordsQuestionProps) {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const handleToggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword],
    );
  };

  return (
    <div className="bg-background-default flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-2xl flex-col items-center gap-10 px-4">
        <div className="flex items-center justify-center gap-2">
          <b className="text-subtitle-2 font-bold text-text-primary">
            Q. 당신을 가장 잘 표현하는 감성 키워드를 골라주세요.
          </b>
          <p className="text-body-1 text-text-secondary">(복수 선택)</p>
        </div>

        <div className="grid grid-cols-2 items-center justify-center gap-x-30 gap-y-6">
          {keywords.map((word, index) => {
            const isSelected = selectedKeywords.includes(word);
            return (
              <label
                className="flex cursor-pointer items-center gap-3"
                htmlFor={`keyword-${index}`}
                key={index}
              >
                <Checkbox
                  onChange={() => handleToggleKeyword(word)}
                  className="h-[24px] w-[24px]"
                  id={`keyword-${index}`}
                  checked={isSelected}
                  type="checkbox2"
                  name="keywords"
                />
                <span className="text-body-1 text-text-primary">{word}</span>
              </label>
            );
          })}
        </div>

        <div className="mt-8 flex w-full max-w-xs justify-between">
          <IconButton
            iconClassName="h-6 w-6 text-text-primary"
            As={ChevronLeft}
            onClick={onBack}
            aria-label="이전"
          />
          <IconButton
            className={cn({
              "cursor-not-allowed opacity-50": selectedKeywords.length === 0,
              "cursor-pointer": selectedKeywords.length > 0,
            })}
            onClick={() => selectedKeywords.length > 0 && onNext()}
            iconClassName="h-6 w-6 text-text-primary"
            disabled={selectedKeywords.length === 0}
            As={ChevronRight}
            aria-label="다음"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import Checkbox from "@components/ui/input/Checkbox";
import { useState } from "react";

interface KeywordsQuestionProps {
  onBack: () => void;
  onNext: () => void;
}

export default function KeywordsQuestion({
  onBack,
  onNext,
}: KeywordsQuestionProps) {
  const keywords = [
    "자유로운",
    "따뜻한",
    "부드러운",
    "이성적인",
    "몽환적인",
    "정돈된",
    "감성적인",
    "시크한",
    "사랑스러운",
    "강렬한",
  ];

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
        <div className="flex items-center justify-center">
          <b className="text-subtitle-2 font-bold text-text-primary">
            Q. 당신을 가장 잘 표현하는 감성 키워드를 골라주세요.
          </b>
          <p className="text-body-1 items-center text-text-secondary">
            (복수 선택)
          </p>
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
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedKeywords((prev) => [...prev, word]);
                    } else {
                      setSelectedKeywords((prev) =>
                        prev.filter((k) => k !== word),
                      );
                    }
                  }}
                  id={`keyword-${index}`}
                  checked={isSelected}
                  type="checkbox2"
                  name="keywords"
                  className=""
                />
                <span className="text-body-1 text-text-primary">{word}</span>
              </label>
            );
          })}
        </div>

        <div className="mt-8 flex w-full max-w-xs justify-between">
          <button onClick={onBack} aria-label="이전">
            <ChevronLeft className="h-6 w-6 text-text-primary" />
          </button>
          <button
            className={`${
              selectedKeywords.length === 0
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            onClick={() => selectedKeywords.length > 0 && onNext()}
            disabled={selectedKeywords.length === 0}
            aria-label="다음"
          >
            <ChevronRight className="h-6 w-6 text-text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
}

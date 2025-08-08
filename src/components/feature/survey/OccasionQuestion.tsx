"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import Checkbox from "@components/ui/input/Checkbox";
import { useState } from "react";

interface OccasionQuestionProps {
  onBack: () => void;
  onNext: () => void;
}

export default function OccasionQuestion({
  onBack,
  onNext,
}: OccasionQuestionProps) {
  const occasions = [
    { main: "매일 부담 없이 사용하는", sub: "데일리용" },
    { main: "업무나 공부에 몰입하고 싶은", sub: "집중할 때" },
    { main: "편안하게 휴식하고 싶은", sub: "잠들기 전" },
    { main: "땀을 씻어내고 상쾌해지고 싶은", sub: "운동 후" },
    { main: "인상 깊은 순간을 만들고 싶은", sub: "특별한 날" },
  ];

  const [selected, setSelected] = useState<number | null>(null);

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelected(index);
      } else {
        setSelected(null);
      }
    };

  return (
    <div className="bg-background-default flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-xl flex-col items-center gap-10 px-4">
        <b className="text-subtitle-2 text-center font-bold text-text-primary">
          Q. 어떤 상황에서 향을 사용하고 싶으신가요?
        </b>

        <div className="flex flex-col gap-4">
          {occasions.map((item, index) => {
            const isSelected = selected === index;
            return (
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-md p-1 ${
                  isSelected ? "bg-background-subtle" : ""
                }`}
                htmlFor={`occasion-option-${index}`}
                key={index}
              >
                <Checkbox
                  id={`occasion-option-${index}`}
                  onChange={handleChange(index)}
                  checked={isSelected}
                  type="checkbox2"
                  name="occasion"
                  className=""
                />
                <div className="flex">
                  <div className="text-body-1 text-text-secondary">
                    {item.main}
                  </div>
                  <div className="text-body-1 pl-2 text-text-primary">
                    {item.sub}
                  </div>
                </div>
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
              selected === null
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            onClick={() => selected !== null && onNext()}
            disabled={selected === null}
            aria-label="다음"
          >
            <ChevronRight className="h-6 w-6 text-text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
}

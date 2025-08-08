"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import Checkbox from "@components/ui/input/Checkbox";
import { useState } from "react";

interface ScentMoodProps {
  onBack: () => void;
  onNext: () => void;
}

export default function ScentMood({ onBack, onNext }: ScentMoodProps) {
  const moodOptions = [
    "상쾌한 느낌",
    "따뜻하고 포근한 느낌",
    "로맨틱하고 부드러운 느낌",
    "에너지 넘치고 활기찬 느낌",
    "신비롭고 매혹적인 느낌",
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
    <div className="flex w-full max-w-xl flex-col items-center gap-10 px-4">
      <b className="text-subtitle-2 text-center font-bold text-text-primary">
        Q. 어떤 분위기의 향을 선호하시나요?
      </b>

      <div className="flex flex-col gap-4">
        {moodOptions.map((text, index) => {
          const isSelected = selected === index;
          return (
            <label
              className="flex cursor-pointer items-center gap-3"
              htmlFor={`scent-mood-${index}`}
              key={index}
            >
              <Checkbox
                onChange={handleChange(index)}
                id={`scent-mood-${index}`}
                checked={isSelected}
                name="scentMood"
                type="checkbox2"
                className=""
              />
              <span className="text-body-1 text-text-primary">{text}</span>
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
  );
}

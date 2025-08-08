"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import Checkbox from "@components/ui/input/Checkbox";
import { useState } from "react";

interface IntensityQuestionProps {
  onBack: () => void;
  onNext: () => void;
}

// options 배열을 컴포넌트 바깥에 위치시켜 재생성 방지
const options = [
  "은은한 향을 좋아해요",
  "적당한 향이 좋아요",
  "존재감 있는 강한 향이 좋아요",
];

export default function IntensityQuestion({
  onBack,
  onNext,
}: IntensityQuestionProps) {
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
      <div className="flex flex-col items-center gap-10">
        <b className="text-subtitle-2 text-center font-bold text-text-primary">
          Q. 평소에 어떤 향의 강도를 선호하시나요?
        </b>

        <div className="flex flex-col gap-4">
          {options.map((text, index) => (
            <label
              className="flex cursor-pointer items-center gap-4"
              htmlFor={`intensity-option-${index}`}
              key={index}
            >
              <Checkbox
                id={`intensity-option-${index}`}
                onChange={handleChange(index)}
                checked={selected === index}
                name="intensity"
                type="checkbox2"
                className=""
              />
              <span className="text-body-1 text-text-primary">{text}</span>
            </label>
          ))}
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

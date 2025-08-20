"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import Checkbox from "@components/ui/input/Checkbox";
import IconButton from "@components/ui/IconButton";
import { SurveyData } from "@app/survey/page";
import { useEffect, useState } from "react";
import { cn } from "@utils/cn";

export type IntensityQuestionProps = {
  setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
  onBack: () => void;
  onNext: () => void;
};

const defaultQuestion = "Q. 평소에 어떤 향의 강도를 선호하시나요?";
const defaultOptions = [
  "은은한 향을 좋아해요",
  "적당한 향이 좋아요",
  "존재감 있는 강한 향이 좋아요",
];

export default function IntensityQuestion({
  setSurveyData,
  onBack,
  onNext,
}: IntensityQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleChange = (index: number) => () => {
    setSelected((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    if (selected === null) {
      return;
    }
    setSurveyData((prevData) => ({
      ...prevData,
      intensity: defaultOptions[selected],
    }));
  }, [selected, setSurveyData]);

  return (
    <div className="bg-background-default flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <b className="text-subtitle-2 text-center font-bold text-text-primary">
          {defaultQuestion}
        </b>
        <div className="flex flex-col gap-4">
          {defaultOptions.map((text, index) => (
            <label
              className="flex cursor-pointer items-center gap-3"
              htmlFor={`intensity-option-${index}`}
              key={index}
            >
              <Checkbox
                id={`intensity-option-${index}`}
                onChange={handleChange(index)}
                className="h-[24px] w-[24px]"
                checked={selected === index}
                name="intensity"
                type="checkbox2"
              />
              <span className="text-body-1 text-text-primary">{text}</span>
            </label>
          ))}
        </div>
        <div className="mt-8 flex w-full max-w-xs justify-between">
          <IconButton
            className="text-text-primary"
            onClick={onBack}
            As={ChevronLeft}
            aria-label="이전"
          />
          <IconButton
            className={cn({
              "cursor-not-allowed opacity-50": selected === null,
              "cursor-pointer": selected !== null,
            })}
            onClick={() => selected !== null && onNext()}
            disabled={selected === null}
            As={ChevronRight}
            aria-label="다음"
          />
        </div>
      </div>
    </div>
  );
}

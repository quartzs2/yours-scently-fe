"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import Checkbox from "@components/ui/input/Checkbox";
import IconButton from "@components/ui/IconButton";
import { SurveyData } from "@app/survey/page";
import { useEffect, useState } from "react";
import { cn } from "@utils/cn";

export type OccasionQuestionProps = {
  setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
  onBack: () => void;
  onNext: () => void;
};

const QUESTION_TEXT = "Q. 어떤 상황에서 향을 사용하고 싶으신가요?";
const occasions = [
  { main: "매일 부담 없이 사용하는", sub: "데일리용" },
  { main: "편안하게 휴식하고 싶은", sub: "잠들기 전" },
  { main: "땀을 씻어내고 상쾌해지고 싶은", sub: "운동 후" },
  { main: "인상 깊은 순간을 만들고 싶은", sub: "특별한 날" },
];

export default function OccasionQuestion({
  setSurveyData,
  onBack,
  onNext,
}: OccasionQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleChange = (index: number) => () => {
    setSelected((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    // setSurveyData가 변경될 때도 이 effect가 다시 실행되도록 의존성에 추가합니다.
    if (selected === null) {
      return;
    }
    setSurveyData((prevData) => ({
      ...prevData,
      usage: occasions[selected].sub,
    }));
  }, [selected, setSurveyData]); // setSurveyData 추가

  return (
    <div className="bg-background-default flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-xl flex-col items-center gap-10 px-4">
        <b className="text-subtitle-2 text-center font-bold text-text-primary">
          {QUESTION_TEXT}
        </b>
        <div className="flex flex-col gap-4">
          {occasions.map((item, index) => {
            const isSelected = selected === index;
            return (
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-md p-1",
                  { "bg-background-subtle": isSelected },
                )}
                htmlFor={`occasion-option-${index}`}
                key={index}
              >
                <Checkbox
                  id={`occasion-option-${index}`}
                  onChange={handleChange(index)}
                  className="h-[24px] w-[24px]"
                  checked={isSelected}
                  type="checkbox2"
                  name="occasion"
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
          <IconButton
            iconClassName="h-6 w-6 text-text-primary"
            As={ChevronLeft}
            onClick={onBack}
            aria-label="이전"
          />
          <IconButton
            className={cn({
              "cursor-not-allowed opacity-50": selected === null,
              "cursor-pointer": selected !== null,
            })}
            onClick={() => selected !== null && onNext()}
            iconClassName="h-6 w-6 text-text-primary"
            disabled={selected === null}
            As={ChevronRight}
            aria-label="다음"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import Checkbox from "@components/ui/input/Checkbox";
import IconButton from "@components/ui/IconButton";
import { SurveyData } from "@app/survey/page";
import { useEffect, useState } from "react";
import { cn } from "@utils/cn";

export type ScentMoodProps = {
  setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
  onBack: () => void;
  onNext: () => void;
};

const QUESTION_TEXT = "Q. 어떤 분위기의 향을 선호하시나요?";
const moodOptions = [
  "상쾌한 느낌",
  "따뜻하고 포근한 느낌",
  "로맨틱하고 부드러운 느낌",
  "에너지 넘치고 활기찬 느낌",
  "신비롭고 매혹적인 느낌",
];

export default function ScentMood({
  setSurveyData,
  onBack,
  onNext,
}: ScentMoodProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(event.target.checked ? index : null);
    };

  useEffect(() => {
    // setSurveyData가 변경될 때도 이 effect가 다시 실행되도록 의존성에 추가합니다.
    if (selected === null) {
      return;
    }
    setSurveyData((prevData) => ({
      ...prevData,
      mood: moodOptions[selected],
    }));
  }, [selected, setSurveyData]); // setSurveyData 추가

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-10 px-4">
      <b className="text-subtitle-2 text-center font-bold text-text-primary">
        {QUESTION_TEXT}
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
                className="h-[24px] w-[24px]"
                id={`scent-mood-${index}`}
                checked={isSelected}
                name="scentMood"
                type="checkbox2"
              />
              <span className="text-body-1 text-text-primary">{text}</span>
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
  );
}

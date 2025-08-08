"use client";

import Button from "@components/ui/Button";

export type IntroPageProps = {
  onNext: () => void;
};

const QUESTION_TEXT = "당신의 취향을 알려주세요";

export default function IntroPage({ onNext }: IntroPageProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-subtitle-2 font-bold text-text-primary">
        {QUESTION_TEXT}
      </h2>
      <Button onClick={onNext} shape="pill" size="xl">
        Start
      </Button>
    </div>
  );
}

// types/survey.ts

export interface SurveyAnswer {
  preferred_intensity: string;
  preferred_notes: string[];
  disliked_notes: string[];
  preferred_mood: string[];
  top_n: number;
}

export type SurveyStep =
  | "recommendations"
  | "scentMood"
  | "intensity"
  | "occasion"
  | "keywords"
  | "intro";

export interface SurveyNavigationProps {
  onBack?: () => void;
  onNext: () => void;
}

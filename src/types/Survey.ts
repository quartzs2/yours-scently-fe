// types/survey.ts

/**
 * 설문 답변 데이터 타입입니다.
 * 현재 사용되지 않으나, 향후 기능 확장 시 활용할 예정입니다.
 */
export interface SurveyAnswer {
  preferredIntensity: string;
  preferredNotes: string[];
  dislikedNotes: string[];
  preferredMood: string[];
  topN: number;
}

export type SurveyStep =
  | "recommendations"
  | "scentMood"
  | "intensity"
  | "occasion"
  | "keywords"
  | "intro";

/**
 * 설문 페이지 내 공통 네비게이션 프로퍼티 타입입니다.
 * 각 설문 단계 컴포넌트는 이 인터페이스를 상속받아 onBack, onNext 핸들러를 갖도록 권장됩니다.
 */
export interface SurveyNavigationProps {
  onBack?: () => void;
  onNext: () => void;
}

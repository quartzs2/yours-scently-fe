export type SurveyRecommendationResult = {
  survey_result: {
    suitable_notes: string[];
    analyzed_mood: string;
  };
  excluded_disliked_notes: string[];
  matched_notes: string[];
  perfume_name: string;
  main_moods: string[];
  intensity: string;
  reason: string;
  score: number;
};

export type RecommendationData = {
  [key: string]: unknown;
  intensity?: string;
  keyword?: string;
  usage?: string;
  mood?: string;
};

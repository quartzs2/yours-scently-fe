// mock/survey.ts

export const mockSurvey = [
  {
    condition: {
      description:
        "당신이 선택한 감정 키워드를 바탕으로, 잔잔한 우디 노트에 머스크의 포근함을 더한 이 향을 추천드려요.",
      preferred_notes: ["rose", "musk"],
      preferred_intensity: "moderate",
      preferred_mood: ["로맨틱한", "차분한"],
      disliked_notes: ["citrus"],
      gender: "unisex",
      season: "spring",
    },
    recommended_perfumes: [
      {
        perfume_name: "Romantic Musk",
        brand: "Fragrance House",
        perfume_id: 11,
      },
      {
        perfume_name: "Blush Bloom",
        brand: "Elegant Scent",
        perfume_id: 27,
      },
    ],
    recommended_at: "2025-07-21T10:00:00Z",
    history_id: 83,
  },
];

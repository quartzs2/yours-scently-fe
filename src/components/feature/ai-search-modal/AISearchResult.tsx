import type { MainCardProps } from "@custom-types/MainCard.type";

import CloseQuoteIcon from "@assets/icons/ai-search-modal/icon-close-quote.svg";
import OpenQuoteIcon from "@assets/icons/ai-search-modal/icon-open-quote.svg";
import { postAiRecommendation } from "@api/recommendations/aiRecommendation";
import CardSwiper from "@components/common/card-swiper/CardSwiper";
import MainCard from "@components/common/card-component/MainCard";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "@components/ui/tabs";
import Icon from "@components/ui/Icon";
import { useState } from "react";

type AISearchResultProps = {
  text: string;
};

const AISearchResult = ({ text }: AISearchResultProps) => {
  const { isLoading, isError, data } = useQuery({
    select: (data) => {
      if (!data) {
        return { description: "", items: [] };
      }

      const items: MainCardProps[] = data.recommendations.map((scentData) => {
        const { perfume, context } = scentData;
        const { image_url: image_url, price, name, id } = perfume;
        const tags = context.split(",").map((tag) => tag.trim());

        return {
          handleHeartChange: () => {},
          price: Number(price),
          isLiked: false,
          id: String(id),
          image_url,
          tags,
          name,
        };
      });

      return {
        description: data.description,
        items,
      };
    },
    queryFn: () => postAiRecommendation({ text }),
    queryKey: ["ai-search-result", text],
    enabled: Boolean(text),
  });
  const [isTagDeletable, setIsTagDeletable] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  //  TODO: 실제 내용으로 변경 필요
  const tags = ["포근한", "은은한", "부드러운", "파우더리한"];

  const { description, items } = data || { description: "", items: [] };

  return (
    <div className="mb-3 h-[550px] w-full max-w-[1280px] overflow-y-scroll border-t border-border-default">
      {/* 추천 이유 표시 */}
      <section className="mx-auto mt-[112px] flex w-full max-w-[1216px] items-center justify-center gap-2 text-text-primary">
        <Icon As={OpenQuoteIcon} />
        <div className="text-subtitle-2 w-[810px] text-center break-keep">
          {description}
        </div>
        <Icon As={CloseQuoteIcon} />
      </section>
      {/* 추천 향수 표시 */}
      <section className="mt-[80px] flex h-[508px] w-full max-w-[1216px] flex-col gap-4 pl-[48px]">
        <div className="text-subtitle-1 text-text-primary">추천 향수</div>
        <CardSwiper
          withNavigation={false}
          withPagination={false}
          spaceBetween={4}
          autoplay={true}
          items={items}
        >
          <MainCard />
        </CardSwiper>
      </section>
      {/* 최근 검색어 */}
      <section className="w-full max-w-[1216px] px-[48px]">
        {/* 수평선 */}
        <div className="mt-[64px] h-[1px] w-full bg-border-default" />
        {/* 최근 검색어 목록 */}
        <div className="mt-[64px]">
          <div className="flex items-center justify-between text-text-secondary">
            <div className="text-subtitle-2">최근 검색어</div>
            <button
              onClick={() => {
                setIsTagDeletable((prev) => !prev);
              }}
              className="text-body-1 cursor-pointer"
            >
              삭제
            </button>
          </div>
          <div className="mt-[23px] mb-[121px] h-[64px] w-full">
            <div className="overflow-x-auto">
              {tags.map((tag) => (
                <Tag
                  deletable={isTagDeletable}
                  onDelete={() => {}}
                  className="mr-4"
                  text={tag}
                  key={tag}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AISearchResult;

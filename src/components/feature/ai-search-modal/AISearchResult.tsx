import CloseQuoteIcon from "@assets/icons/ai-search-modal/icon-close-quote.svg";
import OpenQuoteIcon from "@assets/icons/ai-search-modal/icon-open-quote.svg";
import aiRecommendation from "@api/recommendations/aiRecommendation";
import { useQuery } from "@tanstack/react-query";
import Icon from "@components/ui/Icon";

type AISearchResultProps = {
  text: string;
};

const AISearchResult = ({ text }: AISearchResultProps) => {
  const { isLoading, isError, data } = useQuery({
    queryFn: () => aiRecommendation({ text }),
    queryKey: ["ai-search-result", text],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div className="mb-3 h-[550px] w-full overflow-y-scroll border-t border-border-default">
      {/* 추천 이유 표시 */}
      <section className="mx-auto mt-[112px] flex w-[876px] gap-2 text-text-primary">
        <Icon As={OpenQuoteIcon} />
        <div className="text-subtitle-2 w-[810px] text-center break-keep">
          {/* TODO: 실제 API 연결 */}
          당신이 선택한 ‘포근하고 은은한’ 분위기를 바탕으로, 부드러운 머스크와
          파우더리한 노트가 어우러진 이 향을 추천드려요.
        </div>
        <Icon As={CloseQuoteIcon} />
      </section>
      {/* 추천 향수 표시 */}
      <section className="mt-[80px] h-[508px]">
        {/* TODO: 내용 추가 필요 */}
        임시 내용
      </section>
      {/* 최근 검색어 */}
      <section className="px-[48px]">
        {/* 수평선 */}
        <div className="mt-[64px] h-[1px] w-full bg-border-default" />
        {/* 최근 검색어 목록 */}
        <div className="mt-[64px]">
          <div className="flex items-center justify-between text-text-secondary">
            <div className="text-subtitle-2">최근 검색어</div>
            {/* TODO: 삭제 버튼 추가 필요 */}
            <div className="text-body-1">삭제</div>
          </div>
          <div className="mt-[23px] mb-[121px] h-[64px]">
            {/* TODO: 태그 추가 필요 */}
            태그 추가 필요
          </div>
        </div>
      </section>
    </div>
  );
};
export default AISearchResult;

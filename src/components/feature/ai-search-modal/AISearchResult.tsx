import CloseQuoteIcon from "@assets/icons/ai-search-modal/icon-close-quote.svg";
import OpenQuoteIcon from "@assets/icons/ai-search-modal/icon-open-quote.svg";
import Icon from "@components/ui/Icon";

const AISearchResult = () => {
  return (
    <div className="mb-3 h-[550px] w-full overflow-y-scroll border-t border-border-default">
      {/* 추천 이유 표시 */}
      <section className="mx-auto mt-[112px] flex w-[876px] gap-2 text-text-primary">
        <Icon As={OpenQuoteIcon} />
        <div className="text-subtitle-1 w-[810px] text-center break-keep">
          {/* TODO: 실제 API 연결 */}
          당신이 선택한 ‘포근하고 은은한’ 분위기를 바탕으로, 부드러운 머스크와
          파우더리한 노트가 어우러진 이 향을 추천드려요.
        </div>
        <Icon As={CloseQuoteIcon} />
      </section>
      {/* 추천 향수 표시 */}
      <section className="mt-[120px] h-[508px]">
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
            <div className="text-subtitle-1">최근 검색어</div>
            {/* TODO: 삭제 버튼 추가 필요 */}
            <div className="text-subtitle-2">삭제</div>
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

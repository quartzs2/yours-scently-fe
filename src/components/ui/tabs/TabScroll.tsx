import { cn } from "@utils/cn";

type TabScrollProps = {
  setTab: (newTab: number) => void;
  tab: number;
};

const TabScroll = ({ setTab, tab }: TabScrollProps) => {
  const titles = ["상세정보", "리뷰", "교환 및 반품 안내"];

  return (
    <div className="text-subtitle-1 flex h-[64px] w-[780px]">
      {titles.map((title, i) => (
        <button
          className={cn(
            "w-[260px] transition-colors",
            tab === i
              ? "border-b-2 border-primary-main text-text-primary"
              : "border-b-2 border-border-default text-primary-light",
          )}
          onClick={() => setTab(i)}
          key={i}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default TabScroll;

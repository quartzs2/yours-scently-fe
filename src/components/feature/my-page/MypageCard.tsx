import IconButton from "@components/ui/IconButton";
import { Settings, List } from "lucide-react";
import { Tag } from "@components/ui/tabs";
import { useState } from "react";
import Image from "next/image";

type MypageCardProps = {
  type: "perfume" | "user";
  description?: string;
  nickname?: string;
  imageUrl?: string;
  title?: string;
  brand?: string;
  date?: string;
};

const FALLBACK_IMAGE = "/fallback-image.svg";

const MypageCard = ({
  description,
  nickname,
  imageUrl,
  title,
  brand,
  type,
  date,
}: MypageCardProps) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  return type === "user" ? (
    // 유저 카드
    <div className="xs:h-[320px] xs:p-4 flex h-[420px] w-full max-w-[420px] flex-col justify-between rounded-2xl bg-bg-subtle p-[24px] sm:h-[380px] sm:p-5">
      {/* 우측 상단 아이콘 */}
      <div className="flex justify-between text-primary-main">
        <span />
        <IconButton aria-label="프로필 수정 링크" As={Settings} href="/" />
      </div>

      <div>
        <p className="text-subtitle-1 sm:text-body-1 xs:text-body-2 mb-2">
          {nickname} 님
        </p>
        <p className="text-body-1 sm:text-body-2 xs:text-caption mb-4 text-text-primary">
          &quot;오늘 기분이 어떠세요?&quot;
        </p>
      </div>
    </div>
  ) : (
    // 향수 카드
    <div className="xs:h-[320px] relative h-[420px] w-full max-w-[420px] overflow-hidden rounded-2xl bg-bg-subtle sm:h-[380px]">
      {/* 배경 이미지 */}
      <Image
        onError={() => setImgSrc(FALLBACK_IMAGE)}
        src={imgSrc ?? FALLBACK_IMAGE}
        className="object-cover"
        alt={title ?? ""}
        fill
      />

      {/* 우측 상단 버튼 */}
      <div className="absolute top-4 right-4 z-10">
        <IconButton
          href="/recommendation-list"
          aria-label="추천 페이지 링크"
          As={List}
        />
      </div>

      {/* 설명 박스 */}
      <div className="xs:p-2 absolute right-4 bottom-4 left-4 z-10 rounded-2xl bg-primary-light/50 p-4 sm:p-3">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-body-1 sm:text-body-2 xs:text-caption flex items-center gap-2 font-medium text-white">
            {title}
            <Tag text={brand ?? ""} size="sm" />
          </p>
          <p className="text-body-2 sm:text-caption mt-1 text-bg-default">
            {date}
          </p>
        </div>
        <p className="text-button-2 sm:text-caption text-text-primary">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MypageCard;

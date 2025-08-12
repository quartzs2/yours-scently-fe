"use client";

import type { MainCardProps } from "@custom-types/MainCard.type";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@utils/cn";
import Link from "next/link";

const FALLBACK_IMAGE = "/fallback-image.svg";
// 디테일카드 컴포넌트
const DetailSwiper = ({
  item,
}: {
  item?: Omit<MainCardProps, "handleHeartChange">;
}) => {
  const [imgSrc, setImgSrc] = useState(item?.imageUrl);

  if (!item) {
    return null;
  }

  return (
    <Link className="flex h-[100px] w-[288px] items-center" href={"/cart"}>
      <div className="relative h-25 w-25">
        <Image
          className={cn(
            "rounded-2xl border border-border-default",
            item.imageUrl
              ? "h-[100px] w-[100px] object-contain"
              : "object-cover",
          )}
          src={`/mock/best-review/perfume${item.id}.png`}
          alt={item.name}
          sizes="100px"
          priority
          fill
        />
      </div>
      <div className="text-body-1 ml-4 flex min-w-0 flex-1 flex-col justify-center">
        <p className="truncate">{item.name}</p>
        <p className="truncate">{item.price.toLocaleString()}원</p>
      </div>
    </Link>
  );
};

export default DetailSwiper;

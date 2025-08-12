import Button from "@components/ui/Button";
import React, { RefObject } from "react";
import Image from "next/image";

type ProductDetailInfoProps = {
  contentRef: RefObject<HTMLDivElement | null>;
  toggleExpanded: () => void;
  isExpanded: boolean;
  maxHeight: string;
  imageSrc: string;
};

const ProductDetailInfo = ({
  toggleExpanded,
  isExpanded,
  contentRef,
  maxHeight,
  imageSrc,
}: ProductDetailInfoProps) => {
  return (
    <>
      <p className="text-subtitle-1 pt-12 pb-8 text-text-primary">상세정보</p>
      <div className="relative w-full">
        <div
          style={{
            transition: "max-height 0.5s ease-in-out",
            overflow: "hidden",
            maxHeight,
          }}
          ref={contentRef}
        >
          <div className="flex justify-center">
            <Button
              className="absolute -bottom-12.5 z-10 h-[56px] w-[800px]"
              onClick={toggleExpanded}
            >
              {isExpanded ? "접기" : "상세정보 더보기 "}
            </Button>
          </div>

          <Image
            className="mx-auto h-auto w-full object-contain"
            src={imageSrc}
            width={2560}
            height={720}
            alt="상세이미지"
          />
          {!isExpanded && (
            <div className="pointer-events-none absolute bottom-0 left-0 h-[200px] w-full bg-gradient-to-t from-bg-default to-transparent" />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailInfo;

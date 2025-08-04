import mainBannerImg from "@assets/images/main-banner-img.png";
import Button from "@components/ui/Button";
import Image from "next/image";

export default function MainBanner() {
  return (
    <section className="relative flex h-[720px] items-center justify-center select-none">
      <Image
        alt="Main banner background"
        className="object-cover"
        src={mainBannerImg}
        priority
        fill
      />

      <div className="absolute top-[400px] flex w-full max-w-[var(--width-container)] flex-col items-start justify-start gap-12 sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
        <div className="flex flex-col gap-6">
          <h2 className="text-subtitle-1">향 추천 받기</h2>
          <div className="text-body-1 text-color-text-secondary line-clamp-3 text-text-secondary">
            <p>당신의 감성, 취향, 일상 속 순간들을 담아</p>
            <p>가장 어울리는 향을 찾아드릴게요.</p>
            <p>향으로 나를 표현하는 경험, 지금 시작하세요.</p>
          </div>
        </div>
        <Button shape="pill" size="xl">
          START
        </Button>
      </div>
    </section>
  );
}

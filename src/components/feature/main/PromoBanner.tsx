import PromoBannerBgImg from "@assets/images/promo-banner-bg-img.png";
import Button from "@components/ui/Button";
// 기획전 배너 및 샘플
import Image from "next/image";

export default function PromoBanner() {
  return (
    <section className="relative flex h-[604px] items-center justify-center select-none">
      <Image
        alt="Promo banner background"
        className="object-cover"
        src={PromoBannerBgImg}
        priority
        fill
      />

      <div className="absolute flex w-full max-w-[var(--width-container)] flex-col items-start justify-start gap-12 sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
        <div className="flex w-[308px] flex-col gap-6">
          <h2 className="text-subtitle-2">운동 후 산뜻하게</h2>
          <div className="text-body-2 text-color-text-secondary line-clamp-3 text-text-secondary">
            <p>땀을 식히고, 기분까지 리프레시되는 향이 필요할 때.</p>
            <p>샤워 후 한 번의 분사만으로 상쾌함이 오래 지속되는</p>
            <p>운동 후에 딱 어울리는 향수를 소개합니다.</p>
          </div>
        </div>
        <Button shape="pill" size="xl">
          더 알아보기
        </Button>
      </div>

      <div className="inset-0 z-10 flex h-[444px] w-[308px] flex-col items-center justify-center bg-bg-default">
        카드
      </div>
    </section>
  );
}

// 추천 카드

export default function PersonalizedProducts() {
  return (
    <section className="relative flex h-[524px] items-center justify-center border-b border-border-default select-none">
      <div className="absolute top-[80px] flex w-full max-w-[var(--width-container)] flex-col items-start justify-start gap-12 sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
        <p className="text-subtitle-2">센틀리가 추천하는 향수</p>
      </div>
    </section>
  );
}

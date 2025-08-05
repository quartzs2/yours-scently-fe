import PersonalizedProducts from "@components/feature/main/PersonalizedProducts";
import PromoBanner from "@components/feature/main/PromoBanner";
import BestReviews from "@components/feature/main/BestReviews";
import MainBanner from "@components/feature/main/MainBanner";
import SubBanner from "@components/feature/main/SubBanner";

export default function Home() {
  return (
    <main className="w-full">
      <MainBanner />
      <PersonalizedProducts />
      <SubBanner />
      <PromoBanner />
      <BestReviews />
      {/* 다른 섹션도 여기에 추가 가능 */}
    </main>
  );
}

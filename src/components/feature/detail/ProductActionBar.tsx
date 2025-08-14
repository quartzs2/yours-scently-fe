import QuantitySelector from "@components/ui/input/QuantitySelector";
import Checkbox from "@components/ui/input/Checkbox";
import Button from "@components/ui/Button";

type ProductActionBarProps = {
  onQuantityChange: (newQty: number) => void;
  onLikeToggle: () => void;
  productQuantity: number;
  onAddToCart: () => void;
  onBuyNow?: () => void;
  isLiked: boolean;
  price: number;
};

const ProductActionBar = ({
  onQuantityChange,
  productQuantity,
  onLikeToggle,
  onAddToCart,
  onBuyNow,
  isLiked,
  price,
}: ProductActionBarProps) => {
  return (
    <div className="sticky bottom-0 left-0 z-150 mx-auto flex h-20 max-w-[1024px] items-center justify-center rounded-2xl border border-border-default bg-bg-default">
      <div className="flex w-[960px] items-center justify-between">
        <Checkbox
          className="mr-4 p-4 focus:ring-0 focus:outline-none"
          onChange={onLikeToggle}
          checked={isLiked}
          type="heart"
          name="heart"
          id="heart"
        />
        <QuantitySelector
          onQuantityChange={onQuantityChange}
          initialQuantity={productQuantity}
          inputClassName="w-28.5 h-12"
          buttonClassName="w-12 h-12"
        />
        <div className="flex w-full justify-end">
          <div className="relative flex items-center gap-5">
            <p className="text-subtitle-2 text-text-primary">
              {price.toLocaleString()}원
            </p>
            <Button onClick={onAddToCart} theme={"light"} size={"lg"}>
              장바구니 담기
            </Button>
            {onBuyNow && (
              <Button onClick={onBuyNow} size={"lg"}>
                구매하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductActionBar;

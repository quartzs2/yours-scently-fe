import Button from "@components/ui/Button";
import Link from "next/link";

type CartModalProps = {
  isAlreadyInCart?: boolean;
  isOpenCartModal: boolean;
  onClose: () => void;
};

/**
 * 장바구니 모달의 열림/닫힘 상태를 관리하고, 버튼을 통해 모달을 토글할 수 있게 하는 예제입니다.
 *
 * 이 컴포넌트는 사용자가 "장바구니" 버튼을 클릭하면 모달을 열고,
 * 모달 내에서 "쇼핑 계속하기" 버튼을 클릭하면 다시 닫힙니다.
 *
 *
 * @example
 * ```tsx
 * import { useState } from "react";
 * import CartModal from "@/components/CartModal";
 * import Button from "@/components/ui/Button";
 *
 * const CartExample = () => {
 *   // 모달 열림 상태 관리
 *   const [isOpenCartModal, setIsOpenCartModal] = useState(false);
 *
 *   // 모달 열기/닫기 토글 함수
 *   const handleToggleCartModal = () => {
 *     setIsOpenCartModal((prev) => !prev);
 *   };
 *
 *  // 장바구니에 같은 상품이 있는지 여부
 * const isAlreadyInCart = cartItems.some(item => item.id === productId);
 *
 *   return (
 *     <>
 *       <CartModal
 *         isOpenCartModal={isOpenCartModal}
 *         onClose={handleToggleCartModal}
 *         isAlreadyInCart={isAlreadyInCart}
 *       />
 *
 *       <Button onClick={handleToggleCartModal}>
 *         장바구니
 *       </Button>
 *     </>
 *   );
 * };
 * ```
 */
const CartModal = ({
  isOpenCartModal,
  isAlreadyInCart,
  onClose,
}: CartModalProps) => {
  return (
    <>
      {isOpenCartModal && (
        <div className="absolute z-20 max-w-[296px] rounded-2xl border border-primary-light bg-bg-default p-[24px] shadow-[5px_5px_10px_0px_#00000040]">
          <div>
            <p className="text-body-2 text-text-secondary">
              상품을 장바구니에 담았습니다.
              <br />
              {isAlreadyInCart && "이미 담으신 상품이 있습니다"}
            </p>
            <p className="text-button-1 mt-4 mb-5 text-text-primary">
              장바구니 이동하시겠습니까?
            </p>
            <div className="flex gap-2">
              <Button onClick={onClose} theme={"light"}>
                쇼핑 계속하기
              </Button>
              <Link href={"your-Scently/장바구니링크/${id}"}>
                <Button>장바구니 가기</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

CartModal.displayName = "CartModal";

export default CartModal;

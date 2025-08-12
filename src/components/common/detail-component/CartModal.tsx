import Dialog from "@components/common/Dialog";
import { cva } from "class-variance-authority";
import Button from "@components/ui/Button";
import { cn } from "@utils/cn";

type CartModalProps = {
  position: "actionBar" | "cart";
  isAlreadyInCart?: boolean;
  onClose: () => void;
  className?: string;
  isOpen: boolean;
};

const dialogClasses = cva(
  "max-w-[296px] -translate-x-1/2 transform rounded-2xl border border-primary-light bg-bg-default p-[24px] shadow-[5px_5px_10px_0px_#00000040]",
  {
    variants: {
      position: {
        actionBar: "absolute right-85 bottom-25",
        cart: "absolute top-[62%] right-[7.5%]",
      },
    },
    defaultVariants: {
      position: "cart",
    },
  },
);

/**
 * CartModal 컴포넌트는 장바구니에 상품이 추가되었음을 알리고,
 * 사용자가 장바구니 페이지로 이동하거나 쇼핑을 계속할 수 있도록 선택지를 제공합니다.
 *
 *
 * @example
 * ```tsx
 * const [isModalOpen, setIsModalOpen] = useState(false);
 * const handleClose = () => setIsModalOpen(false);
 *
 * return (
 *   <>
 *     <button onClick={() => setIsModalOpen(true)}>장바구니 열기</button>
 *     <CartModal
 *       isOpen={isModalOpen}
 *       onClose={handleClose}
 *       isAlreadyInCart={false}
 *       position="cart"
 *     />
 *   </>
 * );
 * ```
 *
 *
 * * @example
 * ```tsx
 * const [modalState, setModalState] = useState({ position: "cart", isOpen: false });
 * const handleCloseCartModal = () => setModalState(prev => ({ ...prev, isOpen: false }));
 *
 * return (
 *   <>
 *     <button onClick={() => setModalState({ position: "cart", isOpen: true })}>장바구니 열기</button>
 *     <CartModal
 *       isOpen={modalState.isOpen}
 *       onClose={handleCloseCartModal}
 *       position={modalState.position}
 *     />
 *   </>
 * );
 * ```
 */
const CartModal = ({
  isAlreadyInCart,
  className,
  position,
  onClose,
  isOpen,
}: CartModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <Dialog
        className={cn(dialogClasses({ position }), className)}
        onClose={onClose}
      >
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
          <Button onClick={onClose} href={"/cart"}>
            장바구니 가기
          </Button>
        </div>
      </Dialog>
    </>
  );
};

CartModal.displayName = "CartModal";

export default CartModal;

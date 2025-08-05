import { Z_INDEX } from "@constants/zIndex";
import React, { useEffect } from "react";

type ModalProps = {
  children: React.ReactNode;
  isModalOpen: boolean;
  onClose: () => void;
  zIndex?: number;
};

const Modal = ({
  zIndex = Z_INDEX.MODAL,
  isModalOpen,
  children,
  onClose,
}: ModalProps) => {
  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY;
      const originalBodyStyle = document.body.style.cssText;

      document.body.style.cssText = `
        position: fixed;
        top: -${scrollY}px;
        overflow-y: scroll; 
        width: 100%;
      `;

      return () => {
        document.body.style.cssText = originalBodyStyle;
        window.scrollTo(0, scrollY);
      };
    }
  }, [isModalOpen]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-bg-overlay"
      style={{ zIndex }}
      onClick={onClose}
    >
      <div>{children}</div>
    </div>
  );
};

export default Modal;

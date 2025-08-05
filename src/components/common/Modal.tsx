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
    const scrollY = window.scrollY;

    const originalStyle = {
      overflowY: document.body.style.overflowY,
      position: document.body.style.position,
      width: document.body.style.width,
      top: document.body.style.top,
    };

    Object.assign(document.body.style, {
      top: `-${scrollY}px`,
      overflowY: "scroll",
      position: "fixed",
      width: "100%",
    });

    return () => {
      const scrollYForRestore = document.body.style.top;
      Object.assign(document.body.style, originalStyle);
      window.scrollTo(0, parseInt(scrollYForRestore || "0", 10) * -1);
    };
  }, []);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-bg-overlay"
      style={{ zIndex }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;

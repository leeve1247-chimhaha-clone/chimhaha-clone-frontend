import { type HTMLAttributes, useEffect, useRef } from "react";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  modalOpen: boolean;
  handleModalClose: () => void;
}

export function Modal({ modalOpen, handleModalClose, children, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleModalClose();
      }
    };
    if (modalOpen) {
      window.addEventListener("mouseup", handleClickOutside);
    } else {
      window.removeEventListener("mouseup", handleClickOutside);
    }
    return () => window.removeEventListener("mouseup", handleClickOutside);
  }, [modalOpen, handleModalClose]);

  if (!modalOpen) return null;
  return (
    <div ref={modalRef} className={className}>
      {children}
    </div>
  );
}

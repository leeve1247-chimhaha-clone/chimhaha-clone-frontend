import { HTMLAttributes, useEffect, useRef } from "react";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("mouseup", handleClickOutside);
    } else {
      window.removeEventListener("mouseup", handleClickOutside);
    }
    return () => window.removeEventListener("mouseup", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div ref={modalRef} className={className}>
      {children}
    </div>
  );
}

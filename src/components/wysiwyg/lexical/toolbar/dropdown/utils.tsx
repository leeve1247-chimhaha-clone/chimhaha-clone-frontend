import { type RefObject, useEffect, useRef, useState } from "react";

export type Coords = { top: number; left: number };

function isNode(target: EventTarget | null) {
  return target !== null && target instanceof  Node;
}

function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent) => void,
  isOpen: boolean
) {
  useEffect(() => {
    if (!isOpen) return;
    const listener = (event: MouseEvent) => {
      if (!ref.current || !isNode(event.target) || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler, isOpen]);
}

export function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  function toggle () {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX,
      });
    }
    setIsOpen((prev) => !prev);
  }
  useOnClickOutside(dropDownRef, () => setIsOpen(false), isOpen);

  // UI 컴포넌트가 사용할 데이터 객체 반환
  return {
    isOpen,
    coords,
    triggerRef,
    dropDownRef,
    toggle,
  };
}
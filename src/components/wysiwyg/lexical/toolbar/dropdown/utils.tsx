import { useEffect, useRef, useState } from "react";

export type Coords = { top: number; left: number };

function isNode(target: EventTarget | null) {
  return target !== null && target instanceof Node;
}

export function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  function toggle() {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX
      });
      setIsOpen(true);
    }
    if (isOpen) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        dropDownRef.current && triggerRef.current &&
        isNode(event.target) &&
        !dropDownRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      )
      setIsOpen(false);
    }
    function handleScrollOrResize() {
      if (isOpen) setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside); // click -> mousedown 권장
    window.addEventListener("scroll", handleScrollOrResize, { capture: true }); // capture: true로 내부 스크롤도 감지
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollOrResize, { capture: true });
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen]); // 의존성 배열 유지

  // UI 컴포넌트가 사용할 데이터 객체 반환
  return {
    isOpen,
    coords,
    triggerRef,
    dropDownRef,
    toggle
  };
}
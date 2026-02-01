"use client";

import { useEffect, useRef } from "react";

export default function WatchCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const animate = () => {
      // หนืด/lag
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;

      cursor.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      data-watch-cursor
      className="
        fixed top-0 left-0 z-[9999]
        pointer-events-none
        opacity-0
        transition-opacity duration-200
      "
    >
      <div
        className="
          -translate-x-1/2 -translate-y-1/2
          bg-white text-black
          px-15 py-4
          rounded-full
          font-bold text-2xl
          shadow-2xl
          select-none
        "
      >
        Watch
      </div>
    </div>
  );
}

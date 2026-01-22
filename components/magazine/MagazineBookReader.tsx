"use client";

import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  title: string;
  author: string;
  coverImage: string;
  pages: string[];
};

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setSize({ width: Math.floor(cr.width), height: Math.floor(cr.height) });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, size };
}

export default function MagazineBookReader({
  title,
  author,
  coverImage,
  pages,
}: Props) {
  const bookRef = useRef<any>(null);

  const [pageIndex, setPageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Desktop = เปิด 2 หน้า / Mobile = 1 หน้า
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { ref: bookAreaRef, size: bookAreaSize } =
    useElementSize<HTMLDivElement>();

  // ✅ FIX: normalize pages ให้ท้ายเล่มมี "คู่" เสมอ (แก้หน้าสุดท้าย/หน้าแรก flip ไม่ smooth)
  const normalizedPages = useMemo(() => {
    const p = [...pages];

    // 1) ให้จำนวนหน้าเป็นเลขคู่เสมอ
    if (p.length % 2 === 1) p.push("");

    // 2) (optional) บางเคส showCover จะลื่นขึ้นอีกถ้ามี blank เผื่อท้ายเพิ่ม
    // ถ้าอยากลองเปิด ให้ uncomment บรรทัดนี้
    // p.push("");

    return p;
  }, [pages]);

  const totalPages = normalizedPages.length;

  const displayPageText = useMemo(() => {
    const human = Math.min(totalPages, pageIndex + 1);
    return `${human}/${totalPages}`;
  }, [pageIndex, totalPages]);

  const maxStageWidth = Math.min(760, bookAreaSize.width || 760);

  const pageWidth = isMobile
    ? Math.max(280, Math.min(360, maxStageWidth - 24))
    : Math.max(300, Math.min(380, Math.floor((maxStageWidth - 24) / 2)));

  const pageHeight = isMobile
    ? Math.round(pageWidth * 1.45)
    : Math.round(pageWidth * 1.42);

  const onPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const onNext = () => bookRef.current?.pageFlip()?.flipNext();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* LEFT META */}
        <aside className="lg:pt-2">
          <h2 className="text-lg font-bold mb-4">LATEST</h2>

          <div className="flex lg:flex-col gap-4">
            <div className="relative w-16 h-16 lg:w-24 lg:h-24 bg-gray-100 overflow-hidden">
              <Image src={coverImage} alt={title} fill className="object-cover" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-400 mb-2">Magazine</p>
              <p className="font-bold leading-snug text-base">{title}</p>
              <p className="text-xs text-gray-500 mt-1">เรื่อง : {author}</p>
            </div>
          </div>
        </aside>

        {/* RIGHT VIEWER */}
        <div className="bg-[#f3f3f3] p-4 sm:p-6 lg:p-8 overflow-hidden">
          {/* BOOK AREA */}
          <div className="flex justify-center">
            <div ref={bookAreaRef} className="relative w-full max-w-[760px]">
              <div className="book-frame">
                <HTMLFlipBook
                  ref={bookRef}
                  {...({
                    className: "flipbook",
                    style: {},
                    startPage: 0,
                    flippingTime: 780, // ✅ นิ่มขึ้นนิด (เดิม 900)
                    usePortrait: isMobile,
                    drawShadow: true,
                    maxShadowOpacity: 0.6, // ✅ ลดเงาหนัก ๆ ที่ทำให้หน้าเดี่ยวกระตุก
                    showCover: true,
                    mobileScrollSupport: true,
                    clickEventForward: true,
                    useMouseEvents: true,
                    swipeDistance: 25,
                    showPageCorners: true,
                    disableFlipByClick: false,

                    width: pageWidth,
                    height: pageHeight,
                    size: "stretch",
                    minWidth: 260,
                    maxWidth: 900,
                    minHeight: 360,
                    maxHeight: 980,

                    onFlip: (e: any) => setPageIndex(e?.data ?? 0),
                  } as any)}
                >
                  {normalizedPages.map((src, i) => (
                    <div key={i} className="page">
                      <div className="page-inner">
                        <div className="paper">
                          {src ? (
                            <Image
                              src={src}
                              alt={`Page ${i + 1}`}
                              fill
                              className="object-contain"
                              priority={i <= 2}
                            />
                          ) : (
                            // ✅ blank page (ช่วยให้หน้าสุดท้าย/หน้าแรก flip smooth)
                            <div className="w-full h-full bg-[#fbfaf5]" />
                          )}
                        </div>

                        <div className="page-edge" />
                      </div>
                    </div>
                  ))}
                </HTMLFlipBook>

                {!isMobile && <div className="gutter" aria-hidden />}
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="mt-6 flex items-center">
            <button
              type="button"
              onClick={onPrev}
              className="nav-btn"
              aria-label="Previous"
              title="Previous"
            >
              ↩︎
            </button>

            <div className="flex-1 text-center text-sm text-gray-600 select-none">
              {displayPageText}
            </div>

            <button
              type="button"
              onClick={onNext}
              className="nav-btn"
              aria-label="Next"
              title="Next"
            >
              ↪︎
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .book-frame {
          position: relative;
          display: flex;
          justify-content: center;
          padding: 28px 18px;
          background: #efefef;
          perspective: 1600px;
        }

        .flipbook {
          overflow: visible !important;
          transform-style: preserve-3d;
        }

        .page {
          background: transparent;
        }

        .page-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
          transform: translateZ(0);
          transition: transform 220ms ease, box-shadow 220ms ease;
          background: #fbfaf5;
        }

        .page-inner::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.55),
            rgba(255, 255, 255, 0) 12%,
            rgba(0, 0, 0, 0) 88%,
            rgba(0, 0, 0, 0.1)
          );
          opacity: 0.45;
          mix-blend-mode: multiply;
        }

        .paper {
          position: absolute;
          inset: 0;
          background: #fbfaf5;
          background-image: radial-gradient(
            rgba(0, 0, 0, 0.035) 1px,
            transparent 1px
          );
          background-size: 3px 3px;
          filter: saturate(0.98) contrast(0.98);
        }

        .page-edge {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.08),
            rgba(0, 0, 0, 0) 10%,
            rgba(0, 0, 0, 0) 90%,
            rgba(0, 0, 0, 0.06)
          );
          mix-blend-mode: multiply;
          opacity: 0.55;
        }

        .gutter {
          position: absolute;
          top: 28px;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          width: 34px;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.18),
            rgba(0, 0, 0, 0.05) 25%,
            rgba(255, 255, 255, 0.55) 50%,
            rgba(0, 0, 0, 0.05) 75%,
            rgba(0, 0, 0, 0.16)
          );
          opacity: 0.35;
          filter: blur(0.2px);
        }

        .page .paper > span,
        .page .paper img {
          width: 100% !important;
          height: 100% !important;
        }

        .nav-btn {
          width: 46px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          color: rgba(0, 0, 0, 0.4);
          transition: background 160ms ease, color 160ms ease,
            transform 160ms ease;
          user-select: none;
        }

        .nav-btn:hover {
          background: rgba(0, 0, 0, 0.06);
          color: rgba(0, 0, 0, 0.65);
          transform: translateY(-1px);
        }

        .nav-btn:active {
          transform: translateY(0px);
        }

        @media (hover: hover) and (pointer: fine) {
          .book-frame:hover .page-inner {
            box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
            transform: rotateX(0.6deg) rotateY(-0.6deg);
          }

          .paper::after {
            content: "";
            position: absolute;
            inset: -20%;
            background: linear-gradient(
              110deg,
              rgba(255, 255, 255, 0) 35%,
              rgba(255, 255, 255, 0.25) 50%,
              rgba(255, 255, 255, 0) 65%
            );
            transform: translateX(-30%) rotate(6deg);
            opacity: 0;
            pointer-events: none;
            transition: opacity 220ms ease;
          }

          .book-frame:hover .paper::after {
            opacity: 0.22;
            animation: paperShine 1.4s ease-in-out infinite;
          }

          .book-frame:hover .paper::before {
            content: "";
            position: absolute;
            right: 0;
            bottom: 0;
            width: 120px;
            height: 120px;
            background: radial-gradient(
              circle at bottom right,
              rgba(0, 0, 0, 0.18),
              rgba(0, 0, 0, 0) 60%
            );
            opacity: 0.18;
            pointer-events: none;
            transform: translate(10px, 10px);
          }

          @keyframes paperShine {
            0% {
              transform: translateX(-35%) rotate(6deg);
            }
            100% {
              transform: translateX(35%) rotate(6deg);
            }
          }
        }
      `}</style>
    </section>
  );
}

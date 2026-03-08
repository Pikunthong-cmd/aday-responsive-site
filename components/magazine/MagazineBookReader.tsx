"use client";

import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  title: string;
  author: string;
  coverImage: string;
  backCoverImage?: string;
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

function PageImage({
  src,
  alt,
  priority,
}: {
  src?: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="page-inner">
      <div className="paper">
        {src ? (
          <Image src={src} alt={alt} fill className="object-contain" priority={priority} />
        ) : (
          <div className="w-full h-full bg-[#fbfaf5]" />
        )}
      </div>
    </div>
  );
}

export default function MagazineBookReader({
  title,
  author,
  coverImage,
  backCoverImage,
  pages,
}: Props) {
  const bookRef = useRef<any>(null);

  const [pageIndex, setPageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { ref: bookAreaRef, size: bookAreaSize } = useElementSize<HTMLDivElement>();

  const contentPages = useMemo(() => pages.filter(Boolean), [pages]);

  const bookPages = useMemo(() => {
    const back = backCoverImage || coverImage;
    const out: string[] = [coverImage, ...contentPages, back];

    if (out.length % 2 === 1) out.push(back);

    return out;
  }, [coverImage, backCoverImage, contentPages]);

  const totalPages = bookPages.length;

  const displayPageText = useMemo(() => {
    const human = Math.min(totalPages, pageIndex + 1);
    return `${human}/${totalPages}`;
  }, [pageIndex, totalPages]);

  const maxStageWidth = Math.min(860, bookAreaSize.width || 860);

  const pageWidth = isMobile
    ? Math.max(280, Math.min(420, maxStageWidth - 16))
    : Math.max(300, Math.min(420, Math.floor((maxStageWidth - 16) / 2)));

  const pageHeight = isMobile ? Math.round(pageWidth * 1.45) : Math.round(pageWidth * 1.38);

  const onPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const onNext = () => bookRef.current?.pageFlip()?.flipNext();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
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

        <div className="bg-[#f3f3f3] p-4 sm:p-6 lg:p-8 overflow-hidden">
          <div className="flex justify-center">
            <div ref={bookAreaRef} className="relative w-full max-w-[860px]">
              <div className="book-frame">
                <HTMLFlipBook
                  key={isMobile ? "mobile" : "desktop"}
                  ref={bookRef}
                  {...({
                    className: "flipbook",
                    startPage: 0,
                    flippingTime: 650,
                    showCover: true,
                    usePortrait: isMobile,
                    drawShadow: false,
                    maxShadowOpacity: 0,
                    useMouseEvents: true,
                    clickEventForward: true,
                    swipeDistance: 20,
                    mobileScrollSupport: true,
                    width: pageWidth,
                    height: pageHeight,
                    size: "fixed",
                    minWidth: 260,
                    minHeight: 360,
                    onFlip: (e: any) => setPageIndex(e?.data ?? 0),
                  } as any)}
                >
                  {bookPages.map((src, i) => {
                    const isCover = i === 0;
                    const isBackCover = i === bookPages.length - 1 || i === bookPages.length - 2;

                    return (
                      <div
                        key={`${src}-${i}`}
                        className={`page ${isCover || isBackCover ? "page-hard" : ""}`}
                      >
                        <PageImage src={src || undefined} alt={`Page ${i + 1}`} priority={i <= 2} />
                      </div>
                    );
                  })}
                </HTMLFlipBook>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center">
            <button type="button" onClick={onPrev} className="nav-btn">
              ↩︎
            </button>

            <div className="flex-1 text-center text-sm text-gray-600 select-none">
              {displayPageText}
            </div>

            <button type="button" onClick={onNext} className="nav-btn">
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
          padding: 18px 12px;
          background: #efefef;
        }

        .flipbook {
          overflow: visible !important;
        }

        .stf__shadow,
        .stf__hardShadow,
        .stf__innerShadow,
        .stf__outerShadow {
          display: none !important;
          opacity: 0 !important;
        }

        .page {
          background: transparent;
        }

        .page-inner {
          position: relative;
          width: 100%;
          height: 100%;
          background: #fbfaf5;
          overflow: hidden;
          border-radius: 2px;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
        }

        .paper {
          position: absolute;
          inset: 0;
          background: #fbfaf5;
        }

        .page-hard .page-inner {
          border-radius: 4px;
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
        }

        .nav-btn {
          width: 46px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          color: rgba(0, 0, 0, 0.4);
          transition: background 160ms ease, color 160ms ease, transform 160ms ease;
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
      `}</style>
    </section>
  );
}
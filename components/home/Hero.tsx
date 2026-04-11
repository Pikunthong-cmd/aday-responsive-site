"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type HeroSlide = {
  image: string;
  category: string;
  title: string;
  description?: string;
  tag?: string;
  link?: string;
};

type HeroProps = {
  slides: HeroSlide[];
  initialIndex?: number;
};

export default function Hero({ slides, initialIndex = 0 }: HeroProps) {
  const safeSlides = useMemo(() => slides ?? [], [slides]);

  const [activeIndex, setActiveIndex] = useState(() => {
    const max = Math.max(safeSlides.length - 1, 0);
    return Math.min(Math.max(initialIndex, 0), max);
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const thumbsContainerRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const startAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (safeSlides.length <= 1) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSlides.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [safeSlides.length]);

  useEffect(() => {
    const container = thumbsContainerRef.current;
    const activeThumb = thumbRefs.current[activeIndex];

    if (!container || !activeThumb) return;

    const containerRect = container.getBoundingClientRect();
    const thumbRect = activeThumb.getBoundingClientRect();

    const currentScroll = container.scrollLeft;
    const thumbLeft = activeThumb.offsetLeft;
    const thumbWidth = activeThumb.offsetWidth;
    const containerWidth = container.clientWidth;

    const isFullyVisible =
      thumbRect.left >= containerRect.left &&
      thumbRect.right <= containerRect.right;

    if (!isFullyVisible) {
      container.scrollTo({
        left: thumbLeft - (containerWidth - thumbWidth) / 2,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const handleSelectSlide = (index: number) => {
    setActiveIndex(index);
    startAutoSlide();
  };

  const active = safeSlides[activeIndex];
  if (!active) return null;

  const activeLink =
    typeof active.link === "string" && active.link.trim() ? active.link : "";

  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden aspect-[16/9]">
        {safeSlides.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={`${item.image}-${index}`}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={index === activeIndex}
                className="object-cover"
              />
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 z-10 w-full">
          <div className="max-w-2xl px-6 py-8 md:px-12 md:py-12">
            <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#FE552C] md:text-sm">
              {active.category}
            </div>

            {active.description ? (
              <h1 className="mb-2 text-[24px] font-bold leading-[1.15] text-white md:text-[38px]">
                {active.description}
              </h1>
            ) : (
              <h1 className="mb-2 text-[24px] font-bold leading-[1.15] text-white md:text-[38px]">
                -
              </h1>
            )}

            {activeLink ? (
              <Link
                href={activeLink}
                className="inline-flex cursor-pointer items-center rounded-full border border-[#097B55] bg-[#097B55]/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#097B55] transition-colors duration-300 hover:bg-[#097B55] hover:text-white md:px-5 md:py-2"
              >
                {active.title}
              </Link>
            ) : (
              <div className="inline-flex items-center rounded-full border border-[#097B55] bg-[#097B55]/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#097B55] md:px-5 md:py-2">
                {active.title}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full bg-[#EFEEE7] py-0">
        <div className="w-full px-0">
          <div
            ref={thumbsContainerRef}
            className="no-scrollbar mb-5 flex w-full snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth"
          >
            {safeSlides.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${item.image}-${index}-thumb`}
                  ref={(el) => {
                    thumbRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => handleSelectSlide(index)}
                  className="group relative block w-[85%] shrink-0 cursor-pointer snap-start overflow-hidden p-0 text-left sm:w-[60%] md:w-[45%] lg:w-1/3"
                >
                  <div className="relative aspect-[16/7] w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, 33vw"
                    />

                    <div
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        isActive
                          ? "bg-black/45 opacity-100"
                          : "bg-black/0 opacity-0 group-hover:bg-black/20 group-hover:opacity-100"
                      }`}
                    />

                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center md:p-6">
                      <div
                        className={`w-full transition-all duration-700 ease-in-out ${
                          isActive
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                        }`}
                      >
                        <div className="mx-auto flex min-h-full w-full items-center justify-center">
                          <div>
                            <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#FE552C] md:text-[14px]">
                              {item.category}
                            </div>

                            <div className="mt-2 text-[16px] font-semibold uppercase leading-[1.2] tracking-[0.06em] text-white md:text-[22px]">
                              {item.tag || item.title}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isActive ? (
                      <div className="pointer-events-none absolute inset-0 ring-2 ring-black/70" />
                    ) : (
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10 transition-colors duration-500 group-hover:ring-black/20" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
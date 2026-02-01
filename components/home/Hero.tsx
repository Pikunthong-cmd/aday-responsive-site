"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ArtistTag from "./ArtistTag";

export type HeroSlide = {
  image: string;
  category: string;
  title: string;
  tag: string;
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

  const active = safeSlides[activeIndex];
  if (!active) return null;

  return (
    <section className="w-full">
      <div className="relative h-[100svh] w-full overflow-hidden">
        <Image
          src={active.image}
          alt={active.title}
          fill
          priority
          className="object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full z-10">
          <div className="px-6 py-8 md:px-12 md:py-12 max-w-2xl">
            <h2 className="uppercase tracking-widest h2 text-[#FE552C] font-bold mb-2">
              {active.category}
            </h2>

            <h1 className="leading-snug mb-4 h1 font-bold text-white">
              {active.title}
            </h1>

            <ArtistTag label={active.tag} />
          </div>
        </div>
      </div>

      <div className="w-full bg-[#EFEEE7] py-5">
        <div
          className="
      flex gap-4
      overflow-x-auto
      scroll-smooth
      snap-x snap-mandatory
      px-4
      no-scrollbar
    "
        >
          {safeSlides.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${item.image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`
            cursor-pointer
            group
            snap-start
            flex-shrink-0
            overflow-hidden
            outline-none
            transition
            w-[85%] sm:w-[60%] md:w-[45%] lg:w-[20%]
            ${isActive ? "ring-2 ring-black/70" : "ring-1 ring-black/10"}
          `}
              >
                <div className="aspect-[16/9] w-full relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, 20vw"
                  />

                  <div
                    className={`
                pointer-events-none
                absolute inset-0
                flex items-center
                bg-gradient-to-t from-black/80 via-black/30 to-transparent
                p-3
                transition-opacity duration-200
                opacity-0
                group-hover:opacity-100
                ${isActive ? "opacity-100" : ""}
              `}
                  >
                    <div className="text-center w-full">
                      {/* category */}
                      <div className="uppercase tracking-widest text-[#FE552C] font-bold h3">
                        {item.category}
                      </div>

                      {/* tag */}
                      <div className="text-white font-medium mt-0.5 h4">
                        {item.tag}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

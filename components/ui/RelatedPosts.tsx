"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SectionContainer from "../layout/SectionContainer";
import { IconArrowNext, IconArrowPrev, IconTextRelated } from "../Icon";

type Item = {
  id: number;
  title: string;
  image: string;
  postHref: string;
  placeText: string;
  placeHref: string;
  subjectText: string;
  subjectHref: string;
};

type Props = {
  items: Item[];
};

export default function RelatedPosts({ items }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const scrollByCards = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  if (!items?.length) return null;

  return (
    <SectionContainer padded className="bg-[#EFEEE7]" fullWidth>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className={[
          "px-6 py-16 sm:py-20 lg:py-28 xl:py-40 xl:px-40",
          mounted ? "[animation:fadeUp_520ms_ease-out_both]" : "opacity-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <IconTextRelated />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollByCards("prev")}
              className="h-10 w-10 grid place-items-center cursor-pointer hover:opacity-70 transition"
              aria-label="Previous"
            >
              <IconArrowPrev />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards("next")}
              className="h-10 w-10 grid place-items-center cursor-pointer hover:opacity-70 transition"
              aria-label="Next"
            >
              <IconArrowNext />
            </button>
          </div>
        </div>

        <div className="mt-10 sm:mt-14">
          <div className="overflow-hidden">
            <div
              ref={scrollerRef}
              className="
                flex flex-col
                sm:flex-row
                gap-6
                sm:overflow-x-auto
                sm:scroll-smooth
                sm:[-ms-overflow-style:none]
                sm:[scrollbar-width:none]
                sm:[&::-webkit-scrollbar]:hidden
              "
            >
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={[
                    "group shrink-0",
                    "w-full",
                    "sm:w-[calc(50%-12px)]",
                    "lg:w-[calc(33.333%-16px)]",
                    mounted
                      ? `[animation:fadeUp_520ms_ease-out_both] [animation-delay:${index * 90}ms]`
                      : "opacity-0",
                  ].join(" ")}
                >
                  <Link href={item.postHref} className="block">
                    <div className="relative overflow-hidden aspect-[3/4] bg-black/5">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-black/5" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>
                  </Link>

                  <div className="mt-4 space-y-2 transition-all duration-300 group-hover:translate-y-[-2px]">
                    {item.placeHref ? (
                      <Link
                        href={item.placeHref}
                        className="inline-block text-xs tracking-widest uppercase transition-colors duration-300 hover:text-orange-500"
                      >
                        {item.placeText}
                      </Link>
                    ) : (
                      <p className="text-xs tracking-widest uppercase">
                        {item.placeText}
                      </p>
                    )}

                    <Link
                      href={item.postHref}
                      className="block text-base font-bold leading-snug text-black line-clamp-2 hover:opacity-50 transition"
                    >
                      {item.title}
                    </Link>

                    {item.subjectHref ? (
                      <Link
                        href={item.subjectHref}
                        className="inline-block text-xs tracking-widest text-gray-500 hover:text-orange-500 transition-colors"
                      >
                        เรื่อง {item.subjectText}
                      </Link>
                    ) : (
                      <p className="text-xs tracking-widest text-gray-500">
                        เรื่อง {item.subjectText}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

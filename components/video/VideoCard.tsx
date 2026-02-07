"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { VideoItem } from "./types";
import { cn } from "@/src/utils/utils";

type Props = {
  item: VideoItem;
  variant?: "featured" | "highlight";
};

const FALLBACK_IMAGE_SRC = "/images/no-image.png";

export default function VideoCard({ item, variant = "highlight" }: Props) {
  const isFeatured = variant === "featured";

  const [imgSrc, setImgSrc] = useState<string>(item.image || FALLBACK_IMAGE_SRC);

  useEffect(() => {
    setImgSrc(item.image || FALLBACK_IMAGE_SRC);
  }, [item.image]);

  return (
    <article
      className={cn(
        "group relative overflow-hidden bg-black/5",
        isFeatured ? "aspect-[16/9]" : "aspect-[4/3] sm:aspect-[16/10]"
      )}
    >
      <img
        src={imgSrc}
        alt={item.title}
        onError={() => {
          if (imgSrc !== FALLBACK_IMAGE_SRC) setImgSrc(FALLBACK_IMAGE_SRC);
        }}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={cn(
                "line-clamp-2 font-semibold text-white",
                isFeatured ? "text-base sm:text-lg" : "text-sm sm:text-base"
              )}
            >
              {item.title}
            </h3>

            {item.description ? (
              <h3 className="mt-1 line-clamp-2 font-semibold text-[#FE552C]">
                View All
              </h3>
            ) : null}

            {item.dateLabel ? (
              <p className="mt-2 text-[11px] text-white/70">{item.dateLabel}</p>
            ) : null}
          </div>
        </div>
      </div>

      <Link
        href={item.href ?? "#"}
        aria-label={item.title}
        className="absolute inset-0"
      />
    </article>
  );
}

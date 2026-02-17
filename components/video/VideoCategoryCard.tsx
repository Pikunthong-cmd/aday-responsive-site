"use client";

import Link from "next/link";
import type { VideoCategoryItem } from "./VideoCategoryGrid";

export function VideoCategoryCardSkeleton({ delayMs }: { delayMs: number }) {
  return (
    <div
      className={[
        "relative overflow-hidden aspect-[16/9] bg-black/10",
        "[animation:fadeUp_520ms_ease-out_both]",
        `[animation-delay:${delayMs}ms]`,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-black/5 animate-pulse" />
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="h-8 w-48 bg-white/25 animate-pulse" />
        <div className="h-6 w-24 bg-orange-500/25 animate-pulse" />
      </div>
    </div>
  );
}

export default function VideoCategoryCard({
  item,
  delayMs,
}: {
  item: VideoCategoryItem;
  delayMs: number;
}) {
  const href = `/video/${item.slug}`;

  return (
    <Link
      href={href}
      className={[
        "group relative block overflow-hidden aspect-[16/9] bg-black/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60",
        "[animation:fadeUp_520ms_ease-out_both]",
        `[animation-delay:${delayMs}ms]`,
      ].join(" ")}
      aria-label={`View all ${item.name}`}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-black/10" />
      )}

      <div className="absolute inset-0 bg-black/45 opacity-75 transition-opacity duration-500 group-hover:opacity-60" />

      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div
          className={[
            "text-white font-semibold tracking-tight uppercase",
            "text-2xl sm:text-3xl",
            "drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)]",
            "transition-transform duration-500 ease-out",
            "group-hover:translate-y-[-1px]",
          ].join(" ")}
        >
          {item.name}
        </div>

        <div
          className={[
            "inline-flex items-center gap-2",
            "text-orange-500 font-semibold",
            "transition-all duration-500 ease-out",
            "group-hover:text-orange-400",
            "group-hover:translate-y-[-1px]",
          ].join(" ")}
        >
          <span className="uppercase tracking-wide">View All</span>
          <span className="opacity-90 transition-transform duration-500 group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

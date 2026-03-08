"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type UIResult = {
  id: string | number;
  title: string;
  category?: string;
  author?: string;
  cover?: string;
  url?: string;
};

export default function SearchResultsList({
  items,
  slug,
}: {
  items: UIResult[];
  slug: string;
}) {
  const [count, setCount] = useState(6);

  const visible = useMemo(() => items.slice(0, count), [items, count]);

  const left = useMemo(() => visible.filter((_, i) => i % 2 === 0), [visible]);
  const right = useMemo(() => visible.filter((_, i) => i % 2 === 1), [visible]);

  const Card = ({ it }: { it: UIResult }) => {
    const href = it.url || "#";
    return (
      <Link href={href} className="block">
        <div className="overflow-hidden rounded-2xl bg-white">
          <div className="relative w-full overflow-hidden bg-black/5 aspect-[16/10]">
            {it.cover ? <Image src={it.cover} alt={it.title} fill className="object-cover" /> : null}
          </div>

          <div className="px-0 pt-4">
            {it.category ? <div className="text-xs text-black/60">{it.category}</div> : null}
            <div className="mt-1 text-base font-semibold leading-snug text-black">{it.title}</div>
            {it.author ? <div className="mt-2 text-xs text-black/50">เรื่อง {it.author}</div> : null}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 md:px-6">
        <div className="text-lg text-black/80">
          Search Results for: <span className="font-semibold text-black">{slug}</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-10">
            {left.map((it) => (
              <Card key={String(it.id)} it={it} />
            ))}
          </div>

          <div className="space-y-10">
            {right.map((it) => (
              <Card key={String(it.id)} it={it} />
            ))}
          </div>
        </div>

        {items.length > count ? (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setCount((c) => c + 6)}
              className="flex items-center gap-3 rounded-full border border-black/30 bg-white px-8 py-3 text-sm font-medium text-black hover:bg-black/5"
            >
              View more
              <span className="translate-y-[1px]">⌄</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
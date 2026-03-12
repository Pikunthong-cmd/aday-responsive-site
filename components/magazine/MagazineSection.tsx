"use client";

import Image from "next/image";
import Link from "next/link";

type MagazineSectionItem = {
  image: string;
  title: string;
  author: string;
  href?: string;
  onClick?: () => void;
};

type Props = {
  title: string;
  items: MagazineSectionItem[];
};

export default function MagazineSection({ title, items }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`} className="group text-left">
            <button
              type="button"
              onClick={item.onClick}
              className="block w-full text-left"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#eee]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </button>

            <div className="mt-3">
              {item.href ? (
                <Link
                  href={item.href}
                  className="line-clamp-2 text-sm font-bold leading-snug transition-colors hover:text-[#FE552C]"
                >
                  {item.title}
                </Link>
              ) : (
                <p className="line-clamp-2 text-sm font-bold leading-snug">
                  {item.title}
                </p>
              )}

              {item.href ? (
                <Link
                  href={item.href}
                  className="mt-1 inline-block text-xs text-black/50 transition-colors hover:text-[#FE552C]"
                >
                  {item.author}
                </Link>
              ) : (
                <p className="mt-1 text-xs text-black/50">{item.author}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
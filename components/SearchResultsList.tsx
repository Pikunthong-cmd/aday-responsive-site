import Image from "next/image";
import Link from "next/link";
import type { SearchUIResult } from "@/app/search/[slug]/page";

export default function SearchResultsList({
  items,
  slug,
}: {
  items: SearchUIResult[];
  slug: string;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <div className="mb-10">
        <h2 className="text-center text-sm text-black/60 md:text-base">
          Results for <span className="font-semibold text-black">{slug}</span>
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-black/10 bg-white px-6 py-14 text-center">
          <p className="text-base text-black/60">No results found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="group">
              <Link href={item.url} className="block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#d9d9d9]">
                  {item.cover ? (
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      unoptimized
                    />
                  ) : null}
                </div>
              </Link>

              <div className="pt-3">
                <div className="mb-2 flex flex-wrap gap-2">
                  {item.categories.map((cat, idx) => (
                    <Link
                      key={`${item.id}-${idx}-${cat.name}`}
                      href={cat.url || "#"}
                      className="text-[11px] leading-none text-black transition hover:text-[#FE552C]"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <Link href={item.url}>
                  <h3 className="max-w-[90%] text-[18px] font-semibold leading-[1.35] text-black transition hover:text-[#FE552C] md:text-[22px]">
                    {item.title}
                  </h3>
                </Link>

                {item.author ? (
                  <p className="mt-2 text-sm text-black/70">{item.author}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
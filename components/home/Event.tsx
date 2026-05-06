import Link from "next/link";
import type { EventCard } from "@/src/lib/eventHomeHelpers";

type Props = {
  items: EventCard[];
};

function getPostHref(href: string) {
  if (!href || href === "#") return "#";

  if (href.startsWith("http")) {
    return href;
  }

  const cleanHref = href.replace(/^\/+/, "");

  if (cleanHref.startsWith("post/")) {
    return `/${cleanHref}`;
  }

  return `/post/${cleanHref}`;
}

export default function Event({ items }: Props) {
  if (!items.length) return null;

  return (
    <section className="w-full">
      <div className="p-6 xl:p-40">
        <div
          className="
            mb-10 flex w-full justify-center
            text-center
            text-5xl
            font-extrabold
            tracking-wide
            sm:text-5xl
            md:text-5xl
            lg:text-5xl
            xl:text-7xl
          "
        >
          ACTIVITY
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => {
            const postHref = getPostHref(item.href);
            const category = item.category?.[0];
            const categoryName = category?.name;
            const categoryHref = category?.nuxtlink || "#";

            return (
              <article key={item.id} className="cursor-pointer">
                <Link href={postHref} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-black/10">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-black/10" />
                    )}

                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                  </div>
                </Link>

                <div className="mt-4 space-y-2">
                  {categoryName ? (
                    <Link
                      href={categoryHref}
                      className="block text-xs tracking-widest text-black transition-colors duration-300 hover:text-[#FE552C]"
                    >
                      {categoryName}
                    </Link>
                  ) : null}

                  <Link href={postHref} className="block">
                    <p className="line-clamp-2 text-base font-bold leading-snug text-black transition-colors duration-300 hover:text-[#FE552C]">
                      {item.title}
                    </p>
                  </Link>

                  {item.subject ? (
                    <Link
                      href={item.subjectHref || "#"}
                      className="block text-xs tracking-widest text-gray-500 transition-colors duration-300 hover:text-[#FE552C]"
                    >
                      เรื่อง {item.subject}
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
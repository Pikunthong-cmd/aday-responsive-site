import Link from "next/link";
import type { EventCard } from "@/src/lib/eventHomeHelpers";

type Props = {
  items: EventCard[];
};

export default function Event({ items }: Props) {
  return (
    <section className="w-full">
      <div className="p-6 xl:p-40">
        <div className="mb-10 flex w-full justify-center">
          <svg
            width="205"
            height="47"
            viewBox="0 0 205 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.402 9.13517V18.6035H26.6714V27.4051H11.402V37.6736H28.6718V46.8086H-1.91826e-05V0.000196123H28.6718V9.13517H11.402ZM49.5432 0.000196123L54.9442 35.3399L72.7474 0.000196123H84.8829L60.0118 46.8086H45.7425L37.4077 0.000196123H49.5432ZM96.1828 9.13517V18.6035H111.452V27.4051H96.1828V37.6736H113.453V46.8086H84.7808V0.000196123H113.453V9.13517H96.1828ZM162.729 46.8086H151.327L132.257 17.9367V46.8086H120.855V0.000196123H132.257L151.327 29.0054V0.000196123H162.729V46.8086ZM204.667 0.000196123V9.13517H192.265V46.8086H180.863V9.13517H168.46V0.000196123H204.667Z"
              fill="black"
            />
          </svg>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="cursor-pointer">
              <Link href={item.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-black/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </div>
              </Link>

              <div className="mt-4 space-y-2">
                {item.place ? (
                  <Link
                    href={item.placeHref || "#"}
                    className="block text-xs tracking-widest text-black transition-colors duration-300 hover:text-[#FE552C]"
                  >
                    {item.place}
                  </Link>
                ) : null}

                <Link href={'post/'+item.href} className="block">
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
          ))}
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";
import AppImage from "@/components/common/AppImage";

type Props = {
  item: {
    title: string;
    image: string | null;
    href?: string;
  };
};

export default function SeriesCard({ item }: Props) {
  const rawHref = item.href?.trim() || "#";

  const href =
    rawHref === "#"
      ? "#"
      : rawHref.startsWith("/series/")
      ? rawHref
      : rawHref.startsWith("/")
      ? `/series${rawHref}`
      : `/series/${rawHref}`;

  return (
    <Link
      href={href}
      aria-label={item.title}
      className="
        group relative block w-full overflow-hidden
        bg-black/5
        focus:outline-none focus:ring-2 focus:ring-[#FE552C]/60
      "
    >
      <div className="relative aspect-[3/4] w-full">
        <AppImage
          src={item.image}
          alt={item.title}
          fill
          className="
            object-cover
            transition-transform duration-300
            group-hover:scale-[1.03]
          "
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={false}
        />

        <div
          className="
            pointer-events-none
            absolute inset-0
            opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
          "
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div
            className="
              absolute bottom-0 left-0 right-0
              p-4
              translate-y-2
              transition-transform duration-300
              group-hover:translate-y-0
            "
          >
            <div className="text-base font-semibold leading-snug text-white sm:text-lg">
              {item.title}
            </div>
            <div className="mt-1 text-xs text-white/80 sm:text-sm">
              คลิกเพื่อดูรายละเอียด
            </div>
          </div>
        </div>

        <div
          className="
            absolute left-0 right-0 top-0 h-1
            bg-[#FE552C]
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100
          "
        />
      </div>
    </Link>
  );
}
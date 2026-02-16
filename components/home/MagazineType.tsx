import Image from "next/image";
import Link from "next/link";

type Item = {
  title: string;
  image: string;
  href?: string;
};

const items: Item[] = [
  {
    title: "main course",
    image: "/images/magazine-type-01.png",
    href: "/category/maincourse",
  },
  {
    title: "wake up",
    image: "/images/magazine-type-02.png",
    href: "/category/wake-up",
  },
];

export default function MagazineType() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href ?? "#"}
            className="group relative block overflow-hidden"
          >
            {/* Square image */}
            <div className="relative aspect-square w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="
                  object-cover
                  transition-transform duration-700
                  group-hover:scale-105
                "
                priority={index === 0}
              />

              {/* Dark overlay on hover */}
              <div
                className="
                  absolute inset-0
                  bg-black/0
                  group-hover:bg-black/30
                  transition-colors duration-500
                "
              />

              {/* Gradient overlay (always visible) */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/30
                  to-transparent
                "
              />

              {/* Text content */}
              <div className="absolute bottom-20 left-0 right-0 p-5 md:p-7 text-white">
                <h3 className="text-xl md:text-2xl font-bold leading-snug text-center display-2">
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

export type CategoryCard = {
  category: "shop" | "podcast" | "series";
  title: string;
  image: string;
  href: string;
};

type Props = {
  items: CategoryCard[];
};

export default function Category({ items }: Props) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-1 py-20 md:grid-cols-3">
        {items.map((item, index) => {
          const isShop = item.category === "shop";

          const content = (
            <>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={`object-cover transition-transform duration-500 ${
                  isShop ? "grayscale" : "group-hover:scale-105"
                }`}
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent
                           transition-opacity duration-500 group-hover:opacity-0"
              />

              <div
                className="absolute bottom-0 left-0 right-0 p-5 text-center text-white
                           transition-transform duration-500 group-hover:translate-y-2"
              >
                <p className="h1 font-bold uppercase tracking-widest">
                  {item.category}
                </p>

                <h3 className="text-lg font-light leading-snug">
                  {isShop ? "Coming soon" : "See more"}
                </h3>
              </div>
            </>
          );

          return isShop ? (
            <div
              key={`${item.category}-${index}`}
              className="group relative aspect-[239/262] cursor-not-allowed overflow-hidden"
              aria-disabled="true"
            >
              {content}
            </div>
          ) : (
            <Link
              key={`${item.category}-${index}`}
              href={item.href}
              className="group relative aspect-[239/262] overflow-hidden"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
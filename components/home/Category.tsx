import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    category: "idea",
    title: "See More",
    image: "/images/category-shop.png",
    href: "/category/idea",
  },
  {
    category: "somebody",
    title: "See More",
    image: "/images/category-podcast.png",
    href: "/category/somebody",
  },
  {
    category: "nostalgia",
    title: "See More",
    image: "/images/category-series.png",
    href: "/category/nostalgia",
  },
];

export default function Category() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {categories.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group relative aspect-[239/262] overflow-hidden"
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent 
                            transition-opacity duration-500 group-hover:opacity-0" />

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white text-center 
                            transition-transform duration-500 group-hover:translate-y-2">
              <p className="h1 uppercase tracking-widest font-bold">
                {item.category}
              </p>
              <h3 className="text-lg md:text-xl font-light leading-snug">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

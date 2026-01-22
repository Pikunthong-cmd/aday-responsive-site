// app/konsanpok/components/KonsanpokFeatureSection.tsx
import Image from "next/image";
import Link from "next/link";

type FeatureBlock = {
  title: string;
  paragraphs: string[];
};

type FeatureTileBase = {
  href: string; 
};

type FeatureTile =
  | (FeatureTileBase & { type: "color"; label: string; bgClass: string })
  | (FeatureTileBase & { type: "image"; src: string; alt: string });

interface KonsanpokFeatureSectionProps {
  heading: string;
  blocks: FeatureBlock[];
  tiles: FeatureTile[]; 
}

export default function KonsanpokFeatureSection({
  heading,
  blocks,
  tiles,
}: KonsanpokFeatureSectionProps) {
  const t = tiles.slice(0, 8);

  const renderTile = (tile: FeatureTile, key: string) => {
    if (tile.type === "color") {
      return (
        <Link
          key={key}
          href={tile.href}
          className={`
            group relative block overflow-hidden
            min-h-[220px] sm:min-h-[280px] lg:min-h-[300px]
            ${tile.bgClass}
            transition-transform duration-300 ease-out
            hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.18)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50
          `}
        >
          <div className="absolute left-6 top-6 text-2xl font-black text-black">
            {tile.label}
          </div>

          {/* subtle overlay on hover */}
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
        </Link>
      );
    }

    return (
      <Link
        key={key}
        href={tile.href}
        className="
          group relative block overflow-hidden
          min-h-[220px] sm:min-h-[280px] lg:min-h-[300px]
          transition-transform duration-300 ease-out
          hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.18)]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50
        "
      >
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </Link>
    );
  };

  return (
    <section className="mt-14 sm:mt-16">
      {/* heading */}
      <h2 className="pb-30 mx-auto max-w-4xl whitespace-pre-line text-center text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
        {heading}
      </h2>

      <div
        className="
          mx-auto mt-8 max-w-5xl
          grid grid-cols-1 gap-10
          md:grid-cols-2
        "
      >
        {blocks.map((b, idx) => (
          <article key={idx} className="space-y-4">
            <h2 className="text-sm font-blod sm:text-base h2">{b.title}</h2>
            <div className="text-xs leading-5 sm:text-sm sm:leading-6 ">
              {b.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* tiles */}
      <div className="mx-auto mt-12 w-full ">
        
        <div className="grid grid-cols-1 gap-0 lg:hidden">
          {t.map((tile, idx) => renderTile(tile, `m-${idx}`))}
        </div>

        
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-0">
          
          {renderTile(t[0], "r1-0")}
          {renderTile(t[1], "r1-1")}
          {renderTile(t[2], "r1-2")}
          {renderTile(t[3], "r1-3")}

          {renderTile(t[5], "r2-0")} 
          {renderTile(t[4], "r2-1")} 
          {renderTile(t[7], "r2-2")} 
          {renderTile(t[6], "r2-3")} 
        </div>
      </div>
    </section>
  );
}

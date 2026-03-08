import Image from "next/image";

type AuthorHeroProps = {
  title: string;
  desktopSrc: string;
  tabletSrc: string;
  mobileSrc: string;
};

export default function AuthorHero({
  title,
  desktopSrc,
  tabletSrc,
  mobileSrc,
}: AuthorHeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="
          relative w-full
          h-[30vh]
          sm:h-[30vh]
          md:h-[45vh]
          lg:h-[45vh]
          xl:h-[40vh]
          max-h-[520px]
        "
      >
        {/* Mobile */}
        <Image
          src={mobileSrc}
          alt={title}
          fill
          priority
          className="object-cover md:hidden"
        />
        {/* Tablet */}
        <Image
          src={tabletSrc}
          alt={title}
          fill
          priority
          className="hidden object-cover md:block lg:hidden"
        />
        {/* Desktop */}
        <Image
          src={desktopSrc}
          alt={title}
          fill
          priority
          className="hidden object-cover lg:block"
        />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <h1
            className="
              text-white font-extrabold text-center tracking-wide
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            "
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}